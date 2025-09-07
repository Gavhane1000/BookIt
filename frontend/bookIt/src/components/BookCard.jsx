// components/BookCard.jsx
import { useNavigate } from "react-router-dom";
import { loadProfile } from "../service/AuthService";

export default function BookCard({ book }) {
  const profile = loadProfile();
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-72 hover:shadow-lg transition-all">
      {/* Cover Image */}
      <div className="h-65 w-full bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
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

      {/* Book Info */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
        <p className="text-sm text-gray-600">by {book.author}</p>

        {/* Price & Location */}
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">${book.price}</span>
          <div className="flex gap-2">
            {" "}
            {/* buttons grouped together */}
            <button
              className="recipe-btn bg-gray-700 text-white px-3 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-600 transition"
              onClick={() => navigate(`/books/${book.id}`)}
            >
              Buy
            </button>
            {profile?.is_superuser && (
              <button className="recipe-btn bg-gray-700 text-white px-3 py-2 rounded-lg shadow-md cursor-pointer hover:bg-gray-600 transition" onClick={() => navigate(`/books/${book.id}`)}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
