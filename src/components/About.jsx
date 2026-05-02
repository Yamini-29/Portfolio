"use client";

import { motion } from "framer-motion";
import AboutInteractive from "@/components/AboutVSCode";


export default function About() {

  const highlights = [
    {
      icon: "🧠",
      title: "AI / Machine Learning",
      desc: "Building intelligent systems including RAG pipelines, multi-agent communication models, and ML tooling."
    },
    {
      icon: "⚙️",
      title: "Backend & Systems",
      desc: "Experience building scalable backend systems using FastAPI, Spring Boot, distributed architectures and cloud platforms."
    },
    {
      icon: "🌐",
      title: "Full Stack Development",
      desc: "Developed production web platforms using React, Node.js, and modern API-driven architectures."
    },
    {
      icon: "🔬",
      title: "Research & Experimentation",
      desc: "Research work on emergent language among decentralized agents and applied ML experimentation."
    }
  ];

  return (
    <section id="about" className="pt-10 pb-28 py-4 px-6 bg-black text-white">

      <div className="max-w-5xl mx-auto">

        {/* Section title */}

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8"
        >
          About
        </motion.h2>
         <AboutInteractive />
        

        {/* Description */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 mb-12"
        >

          <p className="text-lg text-gray-300 leading-relaxed">
            I'm <span className="text-sky-400 font-medium">Yamini</span>, a Computer Science engineer from
            <span className="text-sky-400 font-medium"> IIT Tirupati</span>.
            I focus on building reliable software systems and intelligent applications
            that combine backend engineering with machine learning.
          </p>

          <p className="text-gray-400 leading-relaxed">
            My experience spans backend platforms, distributed systems,
            and applied AI. I have worked on large scale infrastructure
            during my internships at Amazon and currently work on
            enterprise automation platforms at Wipro.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Outside production systems, I enjoy experimenting with
            machine learning models, multi-agent communication systems,
            and developer tooling.
          </p>

        </motion.div>

        {/* Highlights grid */}

        <div className="grid md:grid-cols-2 gap-6">

          {highlights.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-5 border border-neutral-800 rounded-xl bg-neutral-900 hover:border-sky-500 transition"
            >

              <div className="text-2xl mb-2">
                {item.icon}
              </div>

              <h3 className="font-semibold mb-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-400">
                {item.desc}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}