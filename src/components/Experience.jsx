"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const experiences = [
  {
    company: "Wipro",
    logo: "/company/wipro.png",
    role: "Software Engineer",
    duration: "Sept 2025 – Present",
    year: "2025",
    impact: [
      "Built enterprise QA automation platform",
      "Backend services using FastAPI",
      "Cross-platform automation (web, mobile, APIs)"
    ],
    tech: ["Python", "FastAPI", "Automation"],
  },
  {
    company: "Amazon",
    logo: "/company/amazon.png",
    role: "Software Engineer Intern",
    duration: "Jan 2025 – Jun 2025",
    year: "2025",
    impact: [
      "30% latency reduction in data systems",
      "20% compute cost reduction via Graviton",
      "Migrated infrastructure to JDK17"
    ],
    tech: ["Java", "AWS", "Distributed Systems"],
  },
  {
    company: "TestAIng Solutions",
    logo: "/company/testaing.png",
    role: "AI/ML Intern",
    duration: "Jun 2024 – Aug 2024",
    year: "2024",
    impact: [
      "Built ML bias detection pipelines",
      "Applied metamorphic testing for robustness",
      "Improved ML fairness validation"
    ],
    tech: ["Python", "Machine Learning", "Testing"],
  },
  {
    company: "Amazon",
    logo: "/company/amazon.png",
    role: "Software Engineer Intern",
    duration: "May 2023 – Jun 2023",
    year: "2023",
    impact: [
      "25% dashboard performance improvement",
      "Improved financial data workflows",
      "Resolved production pipeline failures"
    ],
    tech: ["React", "Java", "REST APIs"],
  }
];

export default function Experience() {
  

  const [open, setOpen] = useState(null);

  return (
    
    <section id="experience" className="py-28 px-6 bg-black text-white">
      

      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold mb-16">
          Experience
        </h2>
        <div className="mb-20">

  <div className="flex items-center justify-between text-sm text-gray-400">

    <div className="text-center">
      <p className="text-sky-400 font-medium">2023</p>
      <p>Amazon</p>
    </div>

    <div className="flex-1 h-px bg-neutral-800 mx-4"></div>

    <div className="text-center">
      <p className="text-sky-400 font-medium">2024</p>
      <p>TestAIng Solutions</p>
    </div>

    <div className="flex-1 h-px bg-neutral-800 mx-4"></div>

    <div className="text-center">
      <p className="text-sky-400 font-medium">2025</p>
      <p>Amazon</p>
    </div>

    <div className="flex-1 h-px bg-neutral-800 mx-4"></div>

    <div className="text-center">
      <p className="text-sky-400 font-medium">Now</p>
      <p>Wipro</p>
    </div>

  </div>

</div>

        <div className="space-y-10">

          {experiences.map((exp, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-neutral-800 rounded-xl p-6 bg-neutral-900 hover:border-sky-500 transition"
            >

              {/* header */}

              <div className="flex items-center gap-4 mb-4">

                <Image
                  src={exp.logo}
                  width={40}
                  height={40}
                  alt={exp.company}
                  className="rounded-md bg-white p-1"
                />

                <div>

                  <h3 className="font-semibold text-lg">
                    {exp.role} • <span className="text-sky-400">{exp.company}</span>
                  </h3>

                  <p className="text-sm text-gray-400">
                    {exp.duration}
                  </p>

                </div>

              </div>

              {/* impact */}

              <div className="mb-4">

                {exp.impact.map((i, idx) => (

                  <p key={idx} className="text-gray-300 text-sm">
                    • {i}
                  </p>

                ))}

              </div>

              {/* tech stack */}

              <div className="flex flex-wrap gap-2 mb-4">

                {exp.tech.map((t, idx) => (

                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-neutral-800 rounded-md text-gray-300"
                  >
                    {t}
                  </span>

                ))}

              </div>

              {/* toggle */}

              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="text-sm text-sky-400"
              >
                {open === index ? "Hide details" : "View details"}
              </button>

              {open === index && (

                <ul className="mt-4 text-sm text-gray-400 space-y-1">

                  {exp.impact.map((d, i) => (
                    <li key={i}>• {d}</li>
                  ))}

                </ul>

              )}

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}