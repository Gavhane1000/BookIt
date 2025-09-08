import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { getBookById } from "../service/BooksService";
import { loadProfile } from "../service/AuthService";
import EditBook from "../components/EditBook";
import paymentQR from "../assets/qr.png";
import { checkBookOwnership } from "../service/BooksService";
import { postPurchase } from "../service/OrdersService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isBookOpen, setBookOpen] = useState(false);
  const [ownsBook, setOwnsBook] = useState(false);
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const profile = loadProfile();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);
        const data = await getBookById(id);
        setBook(data);

        if (profile && !profile.is_superuser) {
          const res = await checkBookOwnership(id);
          console.log("Owns", res);
          setOwnsBook(res);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  const handleSave = (updatedBook) => {
    setBook((prev) => ({ ...prev, ...updatedBook }));
  };

  const handleBuy = async () => {
    const profileStr = localStorage.getItem("profile");
    const profile = JSON.parse(profileStr);

    try {
      await postPurchase({
        book: Number(id),
        user: profile.id,
      });

      toast.success("Purchase successful!");
      setIsBuyOpen(false);
      setOwnsBook(true);
    } catch (err) {
      toast.error("Failed to store purchase.");
    }
  };

  const renderActionButton = () => {
    if (profile?.is_superuser) {
      return (
        <>
          <button
            onClick={() => setIsEditOpen(true)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => navigate(`/bookIt/books/${book.id}/read`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Read
          </button>
        </>
      );
    } else {
      return ownsBook ? (
        <button
          onClick={() => navigate(`/bookIt/books/${book.id}/read`)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Read
        </button>
      ) : (
        <button
          onClick={() => setIsBuyOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Buy
        </button>
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        )}
        {book && (
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-full md:w-1/3 h-140 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              {book.cover_image_url ? (
                <img
                  src={`http://localhost:8000${book.cover_image_url}`}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <h1 className="text-2xl font-bold text-gray-800">{book.title}</h1>
              <p className="text-gray-600 text-lg">by {book.author}</p>
              <p className="text-gray-700">{book.description}</p>
              <div className="flex justify-end items-center mt-4 gap-4">
                <span className="text-blue-600 font-bold text-xl mr-auto">
                  ${book.price}
                </span>
                {renderActionButton()}
              </div>
            </div>
          </div>
        )}
      </div>

      {isBuyOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[350px] text-center border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Scan to Pay</h2>
            <img
              src={paymentQR}
              alt="QR Code"
              className="mx-auto w-48 h-48 mb-4 rounded-lg shadow"
            />
            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={() => setIsBuyOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleBuy}
                className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <EditBook
        bookId={id}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
      />

      <Footer />
    </>
  );
}
