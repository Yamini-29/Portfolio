"use client";

import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-gray-800">

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-wide text-sky-400">
          Yamini
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm text-gray-300">

          <a href="#about" className="hover:text-sky-400 transition">
            About
          </a>

          <a href="#experience" className="hover:text-sky-400 transition">
            Experience
          </a>

          <a href="#research" className="hover:text-sky-400 transition">
            Research
          </a>

          <a href="#projects" className="hover:text-sky-400 transition">
            Projects
          </a>

          <a href="#skills" className="hover:text-sky-400 transition">
            Skills
          </a>

          <a href="#contact" className="hover:text-sky-400 transition">
            Contact
          </a>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-gray-300 bg-black/90">

          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#research" onClick={() => setMenuOpen(false)}>Research</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

        </div>
      )}

    </nav>
  );
}