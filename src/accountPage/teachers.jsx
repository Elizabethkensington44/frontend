import { useEffect, ueeState, useState } from "react";
import { getTeachers } from ".../api/teachers";
import { useAuth } from "../auth/AuthContext";

export default function TeachersPage() {
  const { token } = useAuth();

  const [teachers, setTeachers] = useState([]);

  const syncTeachers = async () => {
    const data = await getTeachers();
    setTeachers(data);
  };

  useEffect(() => {
    syncTeachers();
  }, []);

  return (
    <>
      <h1>Teachers</h1>
      <TeachersPage teachers={teachers} />
      {token && <TeachersPage syncTeachers={syncTeachers} />}
    </>
  );
}
