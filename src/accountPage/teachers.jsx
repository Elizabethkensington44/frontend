import { useEffect, useState } from "react";

import { getTeachers } from "../api/teachers";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getTeachers().then(setTeachers);
  }, []);

  return (
    <>
      <h1>Teachers</h1>
      <TeacherList teachers={teachers} />
    </>
  );
}

function TeacherList({ teachers }) {
  if (teachers.length === 0) return <p>No teachers available.</p>;

  return (
    <ul>
      {teachers.map((teacher) => (
        <li key={teacher.id}>
          <h2>{teacher.teacher_name}</h2>
          <p>{teacher.dance_style}</p>
          <p>{teacher.bio}</p>
        </li>
      ))}
    </ul>
  );
}
