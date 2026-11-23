import { API, handleResponse } from "./client";

export async function getCurrentUser(token) {
  if (!token) return null;

  try {
    return await handleResponse(
      await fetch(`${API}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
  } catch (e) {
    console.error(e);
    return null;
  }
}
