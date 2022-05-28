import { Constants } from "../constants/Constants";
import { getStoredData } from "./fnAsyncStorage";

type Props = {
  url: string;
  method: string;
  payload?: object | undefined;
  signal?: AbortSignal | null | undefined;
};

export const fetchJSON = async ({ url, method, payload, signal }: Props) => {
  const apiUrl = Constants.API_URL;
  const token = await getStoredData("token");
  // const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmOGUxY2IxNTY0MTQ2M2M2ZGYwZjMzMzk0YjAzYzkyZmNjODg5YWMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSm9obiIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tZXNzZW5nZXJzZXJ2ZXJsZXNzIiwiYXVkIjoibWVzc2VuZ2Vyc2VydmVybGVzcyIsImF1dGhfdGltZSI6MTY1MzU5OTc0MSwidXNlcl9pZCI6IjRxYVdydFh6WmxkS2dJczYyTWhUS25LSWZvMzMiLCJzdWIiOiI0cWFXcnRYelpsZEtnSXM2Mk1oVEtuS0lmbzMzIiwiaWF0IjoxNjUzNTk5NzQxLCJleHAiOjE2NTM2MDMzNDEsImVtYWlsIjoiam9obi5kb2VAZW1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiam9obi5kb2VAZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZifAaYBhhnCPw5iyVeFli0hWa29WIgi2-pok0WBJmlps4HuKmkmLUhm_a3agXK16EtCQJoESB5RAQMk_a9o73pC8gGbVGH19R9AtkEb72BOGPPAqXXTKkSasT_1rkacF8hfhWeM4vJ7f6n3OTLTs2GyPkG_Eu5sPqx3M94gk806rWk1R3jXlcpbYixeVoJ7W-5u59ktGME5g_1WlMuESXDyY6nzFNL0HdUyWJ15ymPox_gT8Ie8WOuM1W8XPNil-JelOOCy73t2i-Sjr2zsXZnAj1-nbMot31y2Ri74Ab3LYZ5jNHHOU9XvkZlrQlLjsTb3EKzmnbVLxqiNK5RmoUw"

  const headers = new Headers();
  const baseUrl = `${apiUrl}/${url}`;

  headers.append("Content-Type", "application/json");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(baseUrl, {
    method,
    headers,
    signal,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = await res.text();

    try {
      message = JSON.parse(message).message;
    } catch (e) {
      return null;
    }
    console.log("oh le throw");
    throw new Error(message);
  }

  if (method !== "DELETE") return res.json();
};

export default fetchJSON;
