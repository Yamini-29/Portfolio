"use client";

import { motion } from "framer-motion";

export default function AgentCommunication() {
  return (
    <div className="relative w-[420px] h-[250px]">

      {/* AGENT A */}
      <div className="absolute left-10 top-20 text-center">
        <div className="w-16 h-16 border border-sky-400 rounded-full flex items-center justify-center">
          A
        </div>
        <p className="text-xs text-gray-400 mt-2">Speaker / Listener</p>
      </div>

      {/* AGENT B */}
      <div className="absolute right-10 top-20 text-center">
        <div className="w-16 h-16 border border-sky-400 rounded-full flex items-center justify-center">
          B
        </div>
        <p className="text-xs text-gray-400 mt-2">Speaker / Listener</p>
      </div>

      {/* CONNECTION LINE */}
      <svg className="absolute inset-0">
        <line
          x1="90"
          y1="110"
          x2="330"
          y2="110"
          stroke="#38bdf8"
          strokeOpacity="0.3"
        />
      </svg>

      {/* MESSAGE FLOW (A → B) */}
      <motion.div
        className="absolute w-2 h-2 bg-sky-400 rounded-full"
        initial={{ x: 90, y: 110 }}
        animate={{ x: 330, y: 110 }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* FEEDBACK FLOW (B → A) */}
      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full"
        initial={{ x: 330, y: 120 }}
        animate={{ x: 90, y: 120 }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />

      {/* OPTIONAL: REWARD SIGNAL */}
      <motion.div
        className="absolute text-[10px] text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ left: "45%", top: "140px" }}
      >
        reward
      </motion.div>

    </div>
  );
}