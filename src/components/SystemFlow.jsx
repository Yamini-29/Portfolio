"use client";

export default function SystemFlow() {
  return (
    <div className="relative w-[300px] h-[300px]">

      {/* nodes */}

      <div className="absolute w-3 h-3 bg-sky-400 rounded-full top-10 left-10" />
      <div className="absolute w-3 h-3 bg-sky-400 rounded-full top-40 left-150" />
      <div className="absolute w-3 h-3 bg-sky-400 rounded-full top-250 left-50" />

      {/* lines */}

      <svg className="absolute inset-0">

        <line x1="20" y1="20" x2="150" y2="150"
          stroke="#38bdf8" strokeOpacity="0.3" />

        <line x1="150" y1="150" x2="80" y2="250"
          stroke="#38bdf8" strokeOpacity="0.3" />

      </svg>

      {/* moving dot (animation) */}

      <div className="absolute w-2 h-2 bg-white rounded-full animate-flow" />

    </div>
  );
}