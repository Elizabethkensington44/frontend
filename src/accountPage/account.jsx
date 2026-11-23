import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";

import { deleteReservation, getReservations } from "../api/reservations";
import { getCurrentUser } from "../api/users";
import { useAuth } from "../auth/AuthContext";

export default function AccountPage() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState(null);

  const loadAccount = useCallback(async () => {
    if (!token) return;

    const [userData, reservationData] = await Promise.all([
      getCurrentUser(token),
      getReservations(token),
    ]);
    setUser(userData);
    setReservations(reservationData);
  }, [token]);

  useEffect(() => {
    loadAccount();
  }, [loadAccount]);

  const remove = async (id) => {
    setBusyId(id);
    setError(null);

    try {
      await deleteReservation(token, id);
      await loadAccount();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusyId(null);
    }
  };

  if (!token) {
    return (
      <>
        <h1>Account</h1>
        <p>You are not logged in.</p>
        <Link to="/login">Log in</Link>
      </>
    );
  }

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <h1>Account</h1>

      <section>
        <h2>Your details</h2>
        {user ? (
          <dl>
            <dt>Name</dt>
            <dd>{user.full_name}</dd>
            <dt>Username</dt>
            <dd>{user.username}</dd>
            <dt>Email</dt>
            <dd>{user.email}</dd>
            <dt>Member since</dt>
            <dd>{memberSince}</dd>
            <dt>Reservations</dt>
            <dd>{reservations.length}</dd>
          </dl>
        ) : (
          <p>Unable to load account details.</p>
        )}
      </section>

      <section>
        <h2>Your reservations</h2>
        {error && <output>{error}</output>}
        {reservations.length === 0 ? (
          <p>You have no reservations yet.</p>
        ) : (
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id}>
                {reservation.class_name} — {reservation.class_date}
                <button
                  onClick={() => remove(reservation.id)}
                  disabled={busyId === reservation.id}
                >
                  {busyId === reservation.id ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button onClick={logout}>Log out</button>
    </>
  );
}
