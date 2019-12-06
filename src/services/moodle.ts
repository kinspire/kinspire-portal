const host = "https://kinspire.org/portal/";
const SERVICE = "desktop_portal";

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

export const login = async (username: string, password: string) => {
  const endpoint = "login/token.php";
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);
  params.append("service", SERVICE);

  const response = await api(endpoint + "?" + params);

  return response;
};
