"use client";

import { useState } from "react";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur border-b border-neutral-800">

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <h1 className="text-lg font-semibold tracking-wide text-purple-400">
  Yamini
</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm text-gray-300">

        <a href="#about" className="hover:text-purple-400 transition">
            About
          </a>

          <a href="#research" className="hover:text-purple-400 transition">
            Research
          </a>

          <a href="#projects" className="hover:text-purple-400 transition">
            Projects
          </a>

          <a href="#skills" className="hover:text-purple-400 transition">
            Skills
          </a>

          <a href="#contact" className="hover:text-purple-400 transition">
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
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-gray-300">

          <a href="#about">About</a>
          <a href="#research">Research</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>

        </div>
      )}

    </nav>
  );
}