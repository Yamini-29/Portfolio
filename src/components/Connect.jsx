"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Connect() {
  const [messages, setMessages] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [hoveredTask, setHoveredTask] = useState(null);

  const handleSend = (text) => {
    setMessages((prev) => [...prev, { type: "user", text }]);
    setLoading(true);

    setTimeout(() => {
      let newTask;

      if (text.toLowerCase().includes("interview")) {
        newTask = {
          id: Date.now(),
          title: "Interview scheduled",
          detail: "Company XYZ • 3:00 PM Today",
        };
      } else {
        newTask = {
          id: Date.now(),
          title: "Collaboration discussion",
          detail: "Project Dynamo",
        };
      }

      setTasks((prev) => [...prev, newTask]);
      setMessages((prev) => [
        ...prev,
        { type: "system", text: "Task created successfully." },
      ]);

      setLoading(false);
      setToast(newTask);

      setTimeout(() => setToast(null), 2500);
    }, 900);
  };

  return (
    <section id="contact" className="py-6 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl font-bold mb-4 text-center">
          Let's Connect
        </h2>

        <p className="text-gray-400 mb-12 text-center">
          Interactive system demo — simulate real recruiter workflows
        </p>

        {/* LINKS */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <a href="https://github.com/Yamini-29" target="_blank"
            className="card">
            <FaGithub size={28} />
            <p className="label">GitHub</p>
          </a>

          <a href="https://linkedin.com/in/yamini-shree-baskar-b04644241" target="_blank"
            className="card">
            <FaLinkedin size={28} />
            <p className="label">LinkedIn</p>
          </a>

          <a href="mailto:yaminishreebaskar@gmail.com"
            className="card">
            <FaEnvelope size={28} />
            <p className="label">Email</p>
          </a>
        </div>

        {/* MAIN INTERACTION */}
        <div className="grid lg:grid-cols-2 gap-10">

         <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">

  {/* CHAT */}
  <div className="glass-panel">

    <div className="space-y-4">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`flex ${
            m.type === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div className="chat-bubble">
            {m.text}
            <span className="timestamp">now</span>
          </div>
        </div>
      ))}

      {loading && (
        <div className="typing">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>

    {/* INPUT BAR (fake but important) */}
    <div className="mt-6 flex gap-2">
      <input
        className="input"
        placeholder="Type a message..."
        disabled
      />
      <button className="send-btn">Send</button>
    </div>

    {/* QUICK ACTIONS */}
    <div className="flex gap-2 mt-4">
      {["Interview", "Opportunity", "Collaborate"].map((msg) => (
        <button
          key={msg}
          onClick={() => handleSend(msg)}
          className="pill"
        >
          {msg}
        </button>
      ))}
    </div>

  </div>

  {/* TASKS */}
  <div className="glass-panel">

    <h3 className="section-label">System Updates</h3>

    <div className="space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="task-card"
        >
          <p className="task-title">{task.title}</p>
          <p className="task-sub">{task.detail}</p>
        </motion.div>
      ))}
    </div>

  </div>

</div>

          {/* TASK PANEL */}
          <div className="panel">

            <h3 className="text-sm text-gray-500 mb-3">
              System Updates
            </h3>

            <div className="space-y-3">
              {tasks.map((task, i) => (
                <div
                  key={task.id}
                  className={`task ${
                    hoveredTask === i ? "highlight" : ""
                  }`}
                >
                  <p className="text-white text-sm">{task.title}</p>
                  <p className="text-gray-400 text-xs">
                    {task.detail}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* TOAST */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="toast"
            >
              ✔ {toast.title}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resume */}
        <div className="mt-16 text-center">
          <a
            href="/resume.pdf"
            download
            className="px-6 py-3 border border-neutral-700 rounded-xl hover:border-sky-400 transition"
          >
            Download Resume
          </a>
        </div>

      </div>
    </section>
  );
}