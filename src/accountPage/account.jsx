import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";

import { deleteReservation, getReservations } from "../api/reservations";
import { useAuth } from "../auth/AuthContext";

export default function AccountPage() {
  const { token, logout } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState(null);

  const loadReservations = useCallback(async () => {
    if (!token) return;
    setReservations(await getReservations(token));
  }, [token]);

  useEffect(() => {
    loadReservations();
  }, [loadReservations]);

  const remove = async (id) => {
    setBusyId(id);
    setError(null);

    try {
      await deleteReservation(token, id);
      await loadReservations();
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

  return (
    <>
      <h1>Your reservations</h1>
      {error && <output>{error}</output>}
      {reservations.length === 0 ? (
        <p>You have no reservations yet.</p>
      ) : (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              {reservation.class_name} — {reservation.class_date}
              <button onClick={() => remove(reservation.id)} disabled={busyId === reservation.id}>
                {busyId === reservation.id ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={logout}>Log out</button>
    </>
  );
}
