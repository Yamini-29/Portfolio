"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const containerVars = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 text-white overflow-hidden bg-black">
      
      {/* Background with subtle zoom effect */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      {/* Content Container */}
      <motion.div 
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="relative z-10 max-w-4xl"
      >
        {/* Name with tighter tracking */}
        <motion.h1 
          variants={itemVars}
          className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
        >
          Yamini Shree
        </motion.h1>

        {/* Credentials */}
        <motion.div variants={itemVars} className="flex items-center justify-center gap-2 mb-8 text-lg font-light tracking-wide text-gray-400">
          <span>Computer Science Engineer</span>
          <span className="w-1 h-1 bg-sky-500 rounded-full" />
          <span className="text-sky-400 font-medium">IIT Tirupati</span>
        </motion.div>

        {/* Bio - improved line height */}
        <motion.p variants={itemVars} className="text-xl md:text-1xl text-gray-300 mb-10 leading-snug max-w-2xl mx-auto">
          Building <span className="text-white italic">intelligent systems</span>, scalable backend platforms, and AI-powered developer tools.
        </motion.p>

        {/* Focus tags with subtle glass effect */}
        <motion.div variants={itemVars} className="flex flex-wrap justify-center gap-3 mb-12">
          {["Machine Learning", "Distributed Systems", "Backend Platforms", "LLM Systems"].map((item) => (
            <span
              key={item}
              className="px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-xs font-medium text-gray-400 hover:border-sky-500/50 hover:text-sky-400 transition-colors duration-300"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Refined Buttons */}
        <motion.div variants={itemVars} className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 text-black font-semibold rounded-full transition-all active:scale-95"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            className="px-8 py-3.5 border border-white/20 hover:bg-white/10 rounded-full transition-all active:scale-95"
          >
            Resume
          </a>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 text-xs uppercase tracking-widest"
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}