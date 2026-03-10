"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Connect() {
  return (
    <section id="contact" className="py-28 px-6 bg-neutral-950 text-white">

      <div className="max-w-4xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold mb-6"
        >
          Let's Connect
        </motion.h2>

        <p className="text-gray-400 mb-12">
          Interested in collaborating, building intelligent systems,
          or discussing opportunities? Feel free to reach out.
        </p>

        <div className="grid md:grid-cols-3 gap-6">

          {/* GitHub */}
          <a
            href="https://github.com/Yamini-29"
            target="_blank"
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6
            hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10
            transition flex flex-col items-center gap-3"
          >
            <FaGithub size={28} />
            <p className="text-sm text-gray-400">GitHub</p>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/yamini-shree-baskar-b04644241"
            target="_blank"
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6
            hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10
            transition flex flex-col items-center gap-3"
          >
            <FaLinkedin size={28} />
            <p className="text-sm text-gray-400">LinkedIn</p>
          </a>

          {/* Email */}
          <a
            href="mailto:yaminishreebaskar@gmail.com"
            className="bg-neutral-900 border border-neutral-800 rounded-xl p-6
            hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10
            transition flex flex-col items-center gap-3"
          >
            <FaEnvelope size={28} />
            <p className="text-sm text-gray-400">Email</p>
          </a>

        </div>

        {/* Resume button */}

        <div className="mt-12">

          <a
  href="/resume.pdf"
  download
  className="px-6 py-3 border border-neutral-700 rounded-xl hover:border-purple-400 transition"
>
  Download Resume
</a>

        </div>

      </div>

    </section>
  );
}