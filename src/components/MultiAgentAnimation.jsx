"use client";

export default function MultiAgentAnimation() {
  return (
    <div className="relative w-[420px] h-[320px]">

      {/* AGENTS */}

      <div className="absolute left-10 top-20 flex flex-col items-center">
        <div className="w-10 h-10 bg-sky-400/20 border border-sky-400 rounded-full animate-pulse-soft" />
        <p className="text-xs mt-2 text-gray-400">Agent A</p>
      </div>

      <div className="absolute right-10 top-20 flex flex-col items-center">
        <div className="w-10 h-10 bg-sky-400/20 border border-sky-400 rounded-full animate-pulse-soft" />
        <p className="text-xs mt-2 text-gray-400">Agent B</p>
      </div>

      <div className="absolute left-[45%] bottom-10 flex flex-col items-center">
        <div className="w-10 h-10 bg-sky-400/20 border border-sky-400 rounded-full animate-pulse-soft" />
        <p className="text-xs mt-2 text-gray-400">Environment</p>
      </div>

      {/* CONNECTION LINES */}

      <svg className="absolute inset-0">

        <line x1="80" y1="120" x2="340" y2="120"
          stroke="#38bdf8" strokeOpacity="0.3" />

        <line x1="80" y1="120" x2="210" y2="250"
          stroke="#38bdf8" strokeOpacity="0.3" />

        <line x1="340" y1="120" x2="210" y2="250"
          stroke="#38bdf8" strokeOpacity="0.3" />

      </svg>

      {/* MESSAGE FLOW (LEFT → RIGHT) */}

      <div className="absolute w-2 h-2 bg-sky-400 rounded-full animate-flow-right" />

      {/* MESSAGE FLOW (RIGHT → LEFT) */}

      <div className="absolute w-2 h-2 bg-white rounded-full animate-flow-left" />

    </div>
  );
}