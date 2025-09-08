import React from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function ReadBook() {
  const pdfUrl = "http://localhost:8000/media/books/pdfs/emilyinparis.pdf"; // your backend URL

  return (
    <>
    <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Emily in Paris</h1>
        <div className="border rounded-lg overflow-auto h-[80vh]">
          <a
            href="http://localhost:8000/media/books/pdfs/emilyinparis.pdf"
            target="_blank"
          >
            Open PDF
          </a>
        </div>
      </div>
      <Footer/>
    </>
  );
}
