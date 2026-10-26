
const API_BASE_URL = (
  import.meta.env.VITE_PRODUCTION_BACKEND_URL || ""
).replace(/\/+$/, "");

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  return `${API_BASE_URL}${normalizedPath}`;
};
