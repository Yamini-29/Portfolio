"use client";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-neutral-900 max-w-3xl w-full p-8 rounded-xl">

        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">{project.title}</h2>

          <button onClick={onClose} className="text-gray-400">
            ✕
          </button>
        </div>

        <p className="text-gray-400 mb-6">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {project.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              className="rounded-lg border border-neutral-700"
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-neutral-800 rounded-md text-sm"
            >
              {t}
            </span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          className="text-purple-400 hover:underline"
        >
          View GitHub →
        </a>

      </div>

    </div>
  );
}