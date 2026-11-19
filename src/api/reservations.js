import { API, handleResponse } from "./client";

export async function getReservations(token) {
  if (!token) return [];

  try {
    return await handleResponse(
      await fetch(`${API}/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function deleteReservation(token, id) {
  if (!token) throw Error("You must be logged in to delete a reservation.");

  const response = await fetch(`${API}/reservations/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw Error(await response.text());
}
