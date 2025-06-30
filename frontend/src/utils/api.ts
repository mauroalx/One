export function getApiUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_BACKEND_API;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export const api = {
  get: (path: string, token: any) =>
    fetch(getApiUrl(path), {
      headers: { Authorization: `Bearer ${token}` },
    }),

  post: (path: string, data: any, token: any) =>
    fetch(getApiUrl(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),

  delete: (path: string, token: any) =>
    fetch(getApiUrl(path), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
  
  put: (path: string, data: any, token: any) =>
    fetch(getApiUrl(path), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }),
};