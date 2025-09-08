import "./App.css";
import Loggin from "./pages/Loggin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Books from "./pages/Books";
import Profile from "./pages/Profile";
import BookDetails from "./pages/BookDetails";
import { Toaster } from "react-hot-toast";
import ReadBook from "./pages/ReadBook";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/bookIt" element={<Loggin />} />
          <Route
            path="/bookIt/landing"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookIt/books"
            element={
              <ProtectedRoute>
                <Books />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookIt/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookIt/books/:id"
            element={
              <ProtectedRoute>
                <BookDetails />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/bookIt/books/:id/read" 
              element={
                <ProtectedRoute>
                  <ReadBook />
                </ProtectedRoute>
              }
          />
        </Routes>
      </Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 10000,
          success: {
            iconTheme: {
              primary: "#155dfc",
              secondary: "#fff5fe",
            },
          },
        }}
      />
    </>
  );
}

export default App;
