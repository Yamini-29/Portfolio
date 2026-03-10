"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 px-8 max-w-5xl mx-auto">

      <motion.h2
        initial={{opacity:0, y:20}}
        whileInView={{opacity:1, y:0}}
        transition={{duration:0.5}}
        className="text-3xl font-bold mb-6"
      >
        About Me
      </motion.h2>

      <p className="text-lg text-gray-400 leading-relaxed">
        I'm Yamini, a Computer Science Engineering student passionate about
        building intelligent systems and scalable applications.
        My work spans across Machine Learning, Full Stack Development,
        and mobile applications.
      </p>

      <p className="text-lg text-gray-400 mt-4 leading-relaxed">
        I have worked on projects including AI-powered form field detection,
        MERN stack e-commerce platforms, Flutter mobile applications,
        and research on emergent spatial language among agents.
      </p>

    </section>
  );
}