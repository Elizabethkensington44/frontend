export const API = import.meta.env.VITE_API;

export async function handleResponse(response) {
  if (!response.ok) throw Error(await response.text());
  return response.json();
}
