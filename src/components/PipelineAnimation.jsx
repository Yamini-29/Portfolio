"use client";

export default function PipelineAnimation() {
  return (
    <div className="relative w-[420px] h-[320px]">

      {/* boxes */}

      <div className="absolute left-0 top-10 w-24 h-12 border border-neutral-700 rounded-md text-xs flex items-center justify-center">
        Data
      </div>

      <div className="absolute left-40 top-10 w-24 h-12 border border-neutral-700 rounded-md text-xs flex items-center justify-center">
        Processing
      </div>

      <div className="absolute left-80 top-10 w-24 h-12 border border-neutral-700 rounded-md text-xs flex items-center justify-center">
        Model
      </div>

      {/* lines */}

      <svg className="absolute inset-0">

        <line x1="100" y1="30" x2="160" y2="30"
          stroke="#38bdf8" strokeOpacity="0.3" />

        <line x1="260" y1="30" x2="320" y2="30"
          stroke="#38bdf8" strokeOpacity="0.3" />

      </svg>

      {/* flowing dots */}

      <div className="absolute w-2 h-2 bg-sky-400 rounded-full animate-flow1" />
      <div className="absolute w-2 h-2 bg-white rounded-full animate-flow2" />

    </div>
  );
}