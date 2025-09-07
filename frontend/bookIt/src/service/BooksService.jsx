// BooksService.js
const API_BASE = "http://localhost:8000/api/books";

const getAuthHeader = () => {
  const token = localStorage.getItem("access");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}/`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });

    if (response.status === 401) {
      window.location.href = "/";
      return;
    }

    if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const getRecommendedBooks = () => fetchData("recommended");
export const getFastSellingBooks = () => fetchData("selling-rapidly");
export const getTrendingBooks = () => fetchData("trending");
export const getBookById = (id) => fetchData(id);

export const updateBook = async (id, bookData) => {
  try {
    const formData = new FormData();

    // Append all fields
    for (const key in bookData) {
      if (bookData[key] !== null && bookData[key] !== "") {
        formData.append(key, bookData[key]);
      }
    }

    const response = await fetch(`${API_BASE}/${id}/`, {
      method: "PUT",
      headers: {
        ...getAuthHeader(),
        // ❌ Do NOT set "Content-Type": "application/json"
        // browser will set correct boundary for multipart
      },
      body: formData,
    });

    if (response.status === 401) {
      window.location.href = "/";
      return;
    }

    if (!response.ok) throw new Error("Failed to update book");

    return await response.json();
  } catch (error) {
    console.error("Update Book Error:", error);
    throw error;
  }
};

// Check if logged-in user owns this book
export const checkBookOwnership = async (bookId) => {
  try {
    const token = localStorage.getItem("access");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(
      `http://localhost:8000/api/books/${bookId}/ownership/`,
      {
        headers,
      }
    );

    if (response.status === 401) {
      window.location.href = "/";
      return false;
    }

    if (!response.ok) throw new Error("Failed to check ownership");

    const data = await response.json(); // { owns: true/false }
    console.log("Owner: service", data);
    
    return data.owns_book;
  } catch (error) {
    console.error("Ownership check error:", error);
    return false;
  }
};
