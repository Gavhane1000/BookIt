const API_BASE = "http://localhost:8000/api/orders";

const getAuthHeader = () => {
  const token = localStorage.getItem("access");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const postPurchase = async ( data ) => {
  try {
    const headers = {
      ...getAuthHeader(),
      "Content-Type": "application/json",
    }

    const response = await fetch(`${API_BASE}/`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to store purchase");
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
