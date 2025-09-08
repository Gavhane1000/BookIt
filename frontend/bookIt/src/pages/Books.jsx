import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { getAllBooks, getOwnedBooks } from "../service/BooksService";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("myBooks"); 
  const navigate = useNavigate();

  const fetchBooks = async (tab) => {
    setLoading(true);
    try {
      let fetchedBooks = [];
      if (tab === "myBooks") {
        fetchedBooks = await getOwnedBooks(); // only books user owns
      } else if (tab === "buyBooks") {
        fetchedBooks = await getAllBooks(); // available to buy
      }
      setBooks(Array.isArray(fetchedBooks) ? fetchedBooks : []);
    } catch (error) {
      if (error.message === "Unauthorized") {
        navigate("/bookIt/", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch books when tab changes
    fetchBooks(activeTab);
  }, [activeTab, navigate]);

  const renderBooks = (books) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Tabs Header */}
        <div className="flex justify-start ml-10 space-x-4">
          <button
            onClick={() => setActiveTab("myBooks")}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
              activeTab === "myBooks"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            My Books
          </button>
          <button
            onClick={() => setActiveTab("buyBooks")}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
              activeTab === "buyBooks"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Buy New
          </button>
        </div>

        {/* Tab Content */}
        <section className="mb-8 ml-10">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-lg font-medium">Loading books...</p>
            </div>
          ) : books.length > 0 ? (
            renderBooks(books)
          ) : (
            <p className="ml-10 text-gray-600">No books to display.</p>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Books;
