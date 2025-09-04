import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react"; // install: npm i lucide-react

export default function Header() {
  const { token, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-lg font-bold">Todo App</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {!token ? (
            <>
              <Link to="/" className="hover:underline">Sign In</Link>
              <Link to="/signup" className="hover:underline">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/tasks" className="hover:underline">My Tasks</Link>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-blue-700 p-4 flex flex-col gap-3">
          {!token ? (
            <>
              <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>Sign In</Link>
              <Link to="/signup" className="hover:underline" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/tasks" className="hover:underline" onClick={() => setIsOpen(false)}>My Tasks</Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
