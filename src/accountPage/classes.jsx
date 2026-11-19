import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";

import { createReservation, getClasses } from "../api/classes";
import { getReservations } from "../api/reservations";
import { useAuth } from "../auth/AuthContext";

export default function ClassesPage() {
  const { token } = useAuth();
  const [classes, setClasses] = useState([]);
  const [reservedIds, setReservedIds] = useState(new Set());
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState(null);

  const syncClasses = useCallback(async () => {
    const [classData, reservationData] = await Promise.all([
      getClasses(),
      token ? getReservations(token) : [],
    ]);
    setClasses(classData);
    setReservedIds(new Set(reservationData.map((reservation) => reservation.class_id)));
  }, [token]);

  useEffect(() => {
    syncClasses();
  }, [syncClasses]);

  const reserve = async (classId) => {
    setBusyId(classId);
    setError(null);

    try {
      await createReservation(token, classId);
      await syncClasses();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <h1>Classes</h1>
      {!token && (
        <p>
          <Link to="/login">Log in</Link> to reserve a class.
        </p>
      )}
      {error && <output>{error}</output>}
      <ClassList
        classes={classes}
        reservedIds={reservedIds}
        busyId={busyId}
        onReserve={reserve}
        canReserve={Boolean(token)}
      />
    </>
  );
}

function ClassList({ classes, reservedIds, busyId, onReserve, canReserve }) {
  if (classes.length === 0) return <p>No classes available.</p>;

  return (
    <ul>
      {classes.map((danceClass) => {
        const isReserved = reservedIds.has(danceClass.id);
        const isBusy = busyId === danceClass.id;

        return (
          <li key={danceClass.id}>
            <h2>{danceClass.class_name}</h2>
            <p>{danceClass.class_description}</p>
            <p>Teacher: {danceClass.class_teacher}</p>
            <p>Date: {danceClass.class_date}</p>
            <p>Price: ${danceClass.class_price}</p>
            <button
              onClick={() => onReserve(danceClass.id)}
              disabled={!canReserve || isReserved || isBusy}
            >
              {isReserved
                ? "Reserved"
                : isBusy
                  ? "Reserving..."
                  : canReserve
                    ? "Reserve"
                    : "Log in to reserve"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
