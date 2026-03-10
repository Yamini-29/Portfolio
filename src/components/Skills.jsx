"use client";

const skills = [
  {
    category: "Languages",
    items: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL", "Dart", "Bash"]
  },
  {
    category: "Backend & Frameworks",
    items: ["Spring Boot", "FastAPI", "Express.js", "Flask", "REST APIs", "Microservices"]
  },
  {
    category: "AI / ML",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "HuggingFace", "LangChain", "RAG Pipelines"]
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD", "Jenkins"]
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB"]
  },
  {
    category: "Systems",
    items: ["Distributed Systems", "Observability", "Monitoring", "Debugging", "Multi-Agent Systems"]
  },
  {
    category: "Other",
    items: ["Git", "Agile", "System Design", "Data Structures & Algorithms"]
  }
];

 

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 bg-neutral-950 text-white">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-12">
          Skills & Technologies
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl"
            >

              <h3 className="text-xl font-semibold mb-4">
                {skill.category}
              </h3>

              <div className="flex flex-wrap gap-2">

                {skill.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-neutral-800 text-sm rounded-md"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}