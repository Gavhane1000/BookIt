import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import {
  getRecommendedBooks,
  getFastSellingBooks,
  getTrendingBooks,
} from "../service/BooksService";

export default function LandingComponent() {
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState([]);
  const [fastSelling, setFastSelling] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const [rec, fast, trend] = await Promise.all([
          getRecommendedBooks(),
          getFastSellingBooks(),
          getTrendingBooks(),
        ]);
        setRecommended(rec);
        setFastSelling(fast);
        setTrending(trend);
        setLoading(false);
      } catch (error) {
        if (error.message === "Unauthorized") {
          navigate("/bookIt/", { replace: true });
        }
      }
    };

    fetchBooks();
  }, [navigate]);

  const renderBooks = (books) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <section className="mb-8">
        <h2 className="ml-10 text-3xl font-semibold mb-4 text-gray-700">
          Top Recommendations
        </h2>
        <div className="ml-10">{renderBooks(recommended)}</div>
      </section>

      <section className="mb-8">
        <h2 className="ml-10 text-3xl font-semibold mb-4 text-gray-700">
          Fast Selling
        </h2>
        <div className="ml-10">{renderBooks(fastSelling)}</div>
      </section>

      <section className="mb-8">
        <h2 className="ml-10 text-3xl font-semibold mb-4 text-gray-700">
          Now Trending
        </h2>
        <div className="ml-10">{renderBooks(trending)}</div>
      </section>
    </div>
  );
}
