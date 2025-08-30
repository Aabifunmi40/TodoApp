import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-sky-300 py-4 shadow-md">
      <section className="max-w-[1280px] px-6 mx-auto flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-bold text-white">
          ToDo App
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className="px-4 py-2 bg-white rounded-xl shadow hover:bg-sky-100 transition font-semibold"
          >
            TaskForm
          </Link>
          <Link
            to="/tasklist"
            className="px-4 py-2 bg-white rounded-xl shadow hover:bg-sky-100 transition font-semibold"
          >
            TaskList
          </Link>
          <Link
            to="/signin"
            className="bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100 font-semibold"
          >
            Sign In
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </section>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-sky-200">
          <Link to="/" onClick={() => setIsOpen(false)}>
            TaskForm
          </Link>
          <Link to="/tasklist" onClick={() => setIsOpen(false)}>
            TaskList
          </Link>
          <Link to="/signin" onClick={() => setIsOpen(false)}>
            Sign In
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
