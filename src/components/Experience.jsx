"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const experiences = [
  {
    company: "Wipro",
    logo: "/company/wipro.png",
    role: "Software Engineer",
    duration: "Sept 2025 – Present",
    highlight: "Enterprise QA Automation Platform",
    points: [
      "Developed Genesis automation platform supporting web, mobile, desktop and APIs",
      "Designed backend services using Python + FastAPI within distributed systems",
      "Built browser automation and Appium mobile testing pipelines",
      "Worked with cross-functional teams to refine system architecture"
    ]
  },
  {
    company: "Amazon",
    logo: "/company/amazon.png",
    role: "Software Engineer Intern",
    duration: "Jan 2025 – Jun 2025",
    highlight: "AWS Infrastructure Migration",
    points: [
      "Migrated backend systems JDK8/11 → JDK17 improving CI/CD stability by 15%",
      "Transitioned data lineage platform (Datanet → Cradle) reducing latency by 30%",
      "Automated AWS multi-region migration (SFN, SNS, S3)",
      "Enabled Graviton ARM adoption across 20+ services reducing compute cost by 20%"
    ]
  },
  {
    company: "Amazon",
    logo: "/company/amazon.png",
    role: "Software Engineer Intern",
    duration: "May 2023 – Jun 2023",
    highlight: "Financial Dashboard Platform",
    points: [
      "Re-architected dashboards for multi-ledger financial analysis",
      "Integrated REST APIs with React UI improving performance by 25%",
      "Resolved production data pipeline failures improving reliability"
    ]
  },
  {
    company: "TestAIng Solutions",
    logo: "/company/testaing.png",
    role: "AI/ML Intern",
    duration: "Jun 2024 – Aug 2024",
    highlight: "AI Model Bias Detection",
    points: [
      "Built pipelines to detect bias in machine learning models",
      "Applied metamorphic testing to improve fairness and robustness"
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 bg-neutral-950 text-white">

      <div className="max-w-5xl mx-auto">

        <h2 className="text-4xl font-bold mb-16">
          Experience
        </h2>

        <div className="relative border-l border-neutral-800">

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="ml-10 mb-16 relative"
            >

              {/* timeline dot */}
              <div className="absolute -left-[26px] top-2 w-5 h-5 bg-purple-500 rounded-full border border-neutral-950"></div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-purple-500 transition">

                {/* header */}
                <div className="flex items-center gap-4 mb-3">

                  <Image
                    src={exp.logo}
                    width={40}
                    height={40}
                    alt={exp.company}
                    className="rounded-md bg-white p-1"
                  />

                  <div>

                    <h3 className="text-lg font-semibold">
                      {exp.role} • <span className="text-purple-400">{exp.company}</span>
                    </h3>

                    <p className="text-sm text-gray-400">
                      {exp.duration}
                    </p>

                  </div>

                </div>

                {/* highlight */}
                <p className="text-purple-400 text-sm mb-3">
                  {exp.highlight}
                </p>

                {/* bullets */}
                <ul className="list-disc list-inside text-gray-400 space-y-1">

                  {exp.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}

                </ul>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}