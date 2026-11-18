const API = import.meta.env.VITE_API;

export async function getTeachers() {
  try {
    const response = await fetch(API + "/teachers");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getTeachers(id) {
  try {
    const response = await fetch(API + "/teachers/" + id);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
