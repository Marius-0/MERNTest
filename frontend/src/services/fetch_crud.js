import axios from 'axios'

export async function get(url = "") {
  // return await fetch(url)
  //   .then((res) => res.json())
  //   .catch((error) => {
  //     console.log("Error occured when fetching posts:", error);
  //   });
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    console.log("promise?:", data, typeof data);
    return data;
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function post(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => console.log("Err:" + err));

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const resObj = await response.json();
  return resObj;
}

export async function postFunc(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => console.log(err));

  const resObj = response.json();
  return resObj;
}
