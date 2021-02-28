export async function apiRequest(url: string, method = "GET", body?: any) {
  // TODO attach token
  try {
    const res = await fetch(url, {
      body: body
        ? new Blob([JSON.stringify(body, null, 2)], {
            type: "application/json",
          })
        : body,
      method,
    });
    const response = await res.json();
    if (!res.ok) {
      throw response;
    }
    return response;
  } catch (err) {
    console.error("API error. Endpoint:", url, "Error:", err);
    return Promise.reject(err);
  }
}
