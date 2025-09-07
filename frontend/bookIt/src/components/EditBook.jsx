import React, { useEffect, useState } from "react";
import { getBookById, updateBook } from "../service/BooksService";

export default function EditBook({ bookId, isOpen, onClose, onSave }) {
  const [book, setBook] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    stored_at: "",
    cover_image: null,
  });

  const checkIfChanged = (updatedForm) => {
    if (!book) return false;

    return (
      updatedForm.title !== book.title ||
      updatedForm.author !== book.author ||
      updatedForm.description !== book.description ||
      String(updatedForm.price) !== String(book.price) ||
      updatedForm.stored_at !== book.stored_at ||
      updatedForm.cover_image !== null
    );
  };

  useEffect(() => {
    if (isOpen) {
      const fetchBook = async () => {
        const data = await getBookById(bookId);
        setBook(data);
        setFormData({
          title: data.title || "",
          author: data.author || "",
          description: data.description || "",
          price: data.price || "",
          stored_at: data.stored_at || "",
          cover_image: null,
        });
      };
      fetchBook();
    }
  }, [isOpen, bookId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let updatedForm;

    if (name === "cover_image") {
      const file = files[0];
      updatedForm = { ...formData, cover_image: file };
      setFormData(updatedForm);

      if (file) setPreview(URL.createObjectURL(file));
    } else {
      updatedForm = { ...formData, [name]: value };
      setFormData(updatedForm);
    }

    // 🔹 Check for changes
    setIsChanged(checkIfChanged(updatedForm));
  };


  const resetForm = () => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        description: book.description || "",
        price: book.price || "",
        stored_at: book.stored_at || "",
        cover_image: null,
      });
      setPreview(null); // agar new file preview select kiya tha to hata do
      setIsChanged(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = await updateBook(bookId, formData);
      if (onSave) onSave(updatedBook);
      onClose();
    } catch (error) {
      console.error("Failed to update book:", error);
      alert("Failed to update book. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter book description"
              rows={4}
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            {preview ? (
              <div className="mt-1 mb-2">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-20 w-15  rounded-sm border"
                />
              </div>
            ) : book?.cover_image_url ? (
              <div className="mt-1 mb-2">
                <img
                  src={`http://localhost:8000${book.cover_image_url}`}
                  alt={book.title}
                  className="h-20 w-15 rounded-sm border"
                />
              </div>
            ) : null}
            <label className="flex items-center justify-center w-full p-3 border rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
              <span className="text-gray-700">Choose File</span>
              <input
                type="file"
                name="cover_image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isChanged}
              className={`px-4 py-2 rounded-lg text-white ${
                isChanged
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
