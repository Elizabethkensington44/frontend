const API = import.meta.env.VITE_API;

export async function getClasses() {
  try {
    const response = await fetch(API + "/classes");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getClasses(id) {
    try {
        const response = await fetch(API + "/classes/" + id);
        const result = await response.json();
        return result;

    } catch (e) {
        console.error(e);
        return null;
    }
}

const async function createReservation(token, classes) {
    if (!token) {
        throw Error("you must be authorized to reserve a class");
    }

    const response = await fetch(API + "/classes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: " Bearer " + token,
        },
        body: JSON.stringify(classes),
    });

    if (!response.ok) {
        const result = await response.json
        throw Error(result.message);
    }
}
