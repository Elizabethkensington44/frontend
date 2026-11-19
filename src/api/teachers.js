import { API, handleResponse } from "./client";

export async function getTeachers() {
  try {
    return await handleResponse(await fetch(`${API}/teachers`));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getTeacherById(id) {
  try {
    return await handleResponse(await fetch(`${API}/teachers/${id}`));
  } catch (e) {
    console.error(e);
    return null;
  }
}
