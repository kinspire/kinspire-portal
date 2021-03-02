import { store } from "../store";
import { setLoading } from "../store/ui/actions";

export async function apiRequest(url: string, method = "GET", body?: any) {
  try {
    store.dispatch(setLoading(true));
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
  } finally {
    store.dispatch(setLoading(false));
  }
}
