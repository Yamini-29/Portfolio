export default function NeuralGraphic() {
  return (
    <div className="relative w-[420px] h-[420px] opacity-70">

      <div className="absolute w-3 h-3 bg-sky-400 rounded-full top-10 left-10" />
      <div className="absolute w-3 h-3 bg-sky-400 rounded-full top-40 left-40" />
      <div className="absolute w-3 h-3 bg-sky-400 rounded-full top-80 left-100" />

      <svg className="absolute inset-0">

        <line x1="40" y1="40" x2="160" y2="160"
          stroke="#38bdf8" strokeOpacity="0.3" />

        <line x1="160" y1="160" x2="300" y2="300"
          stroke="#38bdf8" strokeOpacity="0.3" />

      </svg>

    </div>
  );
}