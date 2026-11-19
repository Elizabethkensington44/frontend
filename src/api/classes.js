import { API, handleResponse } from "./client";

export async function getClasses() {
  try {
    return await handleResponse(await fetch(`${API}/classes`));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getClassById(id) {
  try {
    return await handleResponse(await fetch(`${API}/classes/${id}`));
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function createReservation(token, classId) {
  if (!token) throw Error("You must be logged in to reserve a class.");

  const response = await fetch(`${API}/classes/${classId}/reservations`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 400) {
    const detail = await response.text();
    throw Error(
      detail.includes("already exists")
        ? "You have already reserved this class."
        : detail,
    );
  }

  return handleResponse(response);
}
