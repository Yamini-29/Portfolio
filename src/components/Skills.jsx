"use client";

import { useState } from "react";
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiFastapi,
  SiSpringboot
} from "react-icons/si";

import { FaAws } from "react-icons/fa";

import { DiJava, DiMysql } from "react-icons/di";

const techStack = {
  Languages: [
    { name: "Python", icon: <SiPython /> },
    { name: "Java", icon: <DiJava /> },
    { name: "C++" },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "JavaScript", icon: <SiJavascript /> }
  ],

  Backend: [
    { name: "FastAPI", icon: <SiFastapi /> },
    { name: "Spring Boot", icon: <SiSpringboot /> }
  ],

  "AI / ML": [
    { name: "PyTorch" },
    { name: "TensorFlow" },
    { name: "HuggingFace" },
    { name: "LangChain" },
    { name: "RAG" }
  ],

  "Cloud & DevOps": [
    { name: "AWS", icon: <FaAws /> },
    { name: "Docker", icon: <SiDocker /> },
    { name: "Kubernetes", icon: <SiKubernetes /> }
  ],

  Databases: [
    { name: "PostgreSQL", icon: <SiPostgresql /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "MongoDB", icon: <SiMongodb /> }
  ],

  Systems: [
    { name: "Distributed Systems" },
    { name: "Observability" },
    { name: "Monitoring" }
  ],

  Tools: [
    { name: "Git" },
    { name: "Jenkins" },
    { name: "System Design" }
  ]
};

export default function Skills() {

  const categories = Object.keys(techStack);
  const [active, setActive] = useState(categories[0]);

  return (
    <section id="skills" className="py-28 px-6 bg-black text-white">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-12">
          Technology
        </h2>

        {/* CATEGORY BAR (CENTERED) */}

        <div className="flex justify-center mb-14">

          <div className="flex flex-wrap gap-2 bg-neutral-900 p-2 rounded-xl border border-neutral-800">

            {categories.map((cat) => (

              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-lg text-sm transition 
                ${
                  active === cat
                    ? "bg-neutral-800 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>

            ))}

          </div>

        </div>

        {/* TECHNOLOGY GRID */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">

          {techStack[active].map((tech, i) => (

            <div
              key={i}
              className="flex flex-col items-center gap-3 text-gray-300 hover:text-white transition"
            >

              <div className="text-3xl">
                {tech.icon || (
                  <div className="w-10 h-10 bg-neutral-800 rounded-md" />
                )}
              </div>

              <p className="text-sm">{tech.name}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}