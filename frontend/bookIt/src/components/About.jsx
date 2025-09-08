import bookImage from "../assets/book.png";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

  return (
    <div className="about h-130 flex flex-col md:flex-row items-center justify-between px-10 bg-blue-600">
      <div className="info max-w-lg">
        <div className="info-heading text-4xl md:text-5xl font-bold text-gray-100 leading-snug">
          <span>A Book for Every</span>
          <br />
          <span>Curious Mind 📖</span>
        </div>

        <div className="info-sub-heading mt-4 text-lg text-gray-300">
          <span>
            Discover stories, explore knowledge, and find your next favorite read with <b>BookIt</b>.
          </span>
        </div>

        <div className="button mt-6">
          <button
            className="recipe-btn bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600 transition"
            onClick={() => navigate("/bookIt/books")}
          >
            Explore Books
          </button>
        </div>
      </div>

      <div className="image mt-10 md:mt-0">
        <img
          className="pan-image w-80 md:w-[28rem] drop-shadow-lg"
          src={bookImage}
          alt="Books"
        />
      </div>
    </div>
  );
}
