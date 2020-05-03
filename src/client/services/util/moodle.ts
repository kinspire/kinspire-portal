const host = "https://kinspire.org/portal/";

export const api = async (endpoint: string, method = "GET", body?: any) => {
  const res = await fetch(`${host}${endpoint}`, {
    body: body
      ? new Blob([JSON.stringify(body, null, 2)], {
          type: "application/json",
        })
      : body,
    method,
  });
  return await res.json();
};
