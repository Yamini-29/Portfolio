"use client";

import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden pt-20">
        <ParticleBackground />

      {/* gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-neutral-950 to-neutral-950"></div>

      {/* grid background */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* glow */}
      <div className="absolute w-[600px] h-[600px] bg-purple-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold mb-4"
        >
          <h1 className="text-6xl font-bold mb-4">
  <span className="gradient-text">Yamini Shree</span>
</h1>
        </motion.h1>
        <p className="text-lg text-gray-400 mb-4">
  Computer Science Engineer • 
  <span className="text-purple-400"> IIT Tirupati</span>
</p>

        <p className="text-xl text-gray-400 mb-8 max-w-xl mx-auto">
  Building intelligent systems, scalable backend platforms,
  and AI-powered automation tools.
</p>

        {/* badges */}
        
        <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm">

          <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full">
            Machine Learning
          </span>

          <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full">
            Distributed Systems
          </span>

          <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full">
            Full Stack
          </span>

          <span className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full">
            LLM Systems
          </span>

        </div>

        {/* buttons */}

        <div className="flex justify-center gap-4">

          <a
            href="#projects"
            className="px-6 py-3 bg-white text-black rounded-xl font-medium hover:opacity-90"
          >
            View Projects
          </a>

          <a
            href="/resume.pdf"
            className="px-6 py-3 border border-neutral-700 rounded-xl hover:border-purple-400 transition"
          >
            Resume
          </a>

        </div>

      </div>

      {/* scroll indicator */}

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-10 text-gray-500"
      >
        ↓
      </motion.div>

    </section>
  );
}