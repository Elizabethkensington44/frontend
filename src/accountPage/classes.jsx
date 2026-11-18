import { useEffect, useState } from "react";
import { getClasses } from "../api/classes";
import { useAuth } from "../auth/AuthContext";

import Reservations from "../reservartions";

export default function ClassesPage() {
  const { token } = useAuth();

  const [classes, setClasses] = useState([]);

  const syncClasses = async () => {
    const data = await getClasses();
    setClasses(data);
  };

  useEffect(() => {
    syncClasses();
  }, []);

  return (
    <>
      <h1>Classes</h1>
      <ClassList classes={classes} />
      {token && <ReservationForm syncClasses={syncClasses} />}
    </>
  );
}
