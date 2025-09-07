const API_URL = "http://localhost:8000/api/auth/";

export const login = async (username, password) => {
  try {
    const res = await fetch(`${API_URL}login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await res.json();
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    const profile = await getProfile(data.access);
    localStorage.setItem("profile", JSON.stringify(profile));

    return data;
  } catch (err) {
    throw err;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) throw new Error("No refresh token found");

    const res = await fetch(`${API_URL}refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      throw new Error("Session expired. Please login again.");
    }

    const data = await res.json();
    localStorage.setItem("access", data.access);
    return data.access;
  } catch (err) {
    throw err;
  }
};

export const getProfile = async (token) => {
  const access = token || localStorage.getItem("access");

  const res = await fetch(`${API_URL}me/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await res.json();
};

export const loadProfile = () => {
  const data = localStorage.getItem("profile");
  return data ? JSON.parse(data) : null;
};