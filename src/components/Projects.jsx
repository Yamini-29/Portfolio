"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    title: "Consensure",
    subtitle: "Hackathon Winner – Aravind Eye Hospital",
    description:
      "Computer vision system for handwritten medical form validation using OCR and document processing, reducing document verification time by 60%.",
    tech: ["Python", "OpenCV", "Tesseract", "Computer Vision"],
    badge: "🏆 Winner",
    github: "YOUR_GITHUB_LINK",
    images: [
      "/projects/consensure/1.png",
      "/projects/consensure/2.png"
    ]
  },
  {
    title: "PPT Inconsistency Checker",
    description:
      "CLI pipeline that detects factual and logical inconsistencies across PowerPoint slides using rule-based checks and Gemini 2.5 Flash semantic comparison.",
    tech: ["Python", "Gemini API", "OCR", "LLMs"],
    github: "YOUR_GITHUB_LINK",
    images: [
      "/projects/ppt_checker/1.png",
      "/projects/ppt_checker/2.png"
    ]
  },
  {
    title: "Weather & Air Quality Analysis Dashboard",
    description:
      "Data analysis dashboard visualizing weather patterns and air quality metrics for environmental monitoring and insights.",
    tech: ["Python", "Data Visualization", "Analytics"],
    github: "YOUR_GITHUB_LINK",
    images: [
      "/projects/weather_dashboard/1.png"
    ]
  },
  {
    title: "Airavat – Real-time 3D Customization Platform",
    description:
      "Scalable platform allowing users to customize traditional crafts in real time with live synchronization via WebSockets.",
    tech: ["MERN", "WebSockets", "Docker"],
    github: "YOUR_GITHUB_LINK",
    images: [
      "/projects/airavat/1.png",
      "/projects/airavat/2.png"
    ]
  },
  {
    title: "Retrieval-Augmented Generation Q/A System",
    description:
      "Document retrieval pipeline integrating databases and generation models to answer queries over large datasets.",
    tech: ["Python", "LLMs", "Vector Databases"],
    github: "YOUR_GITHUB_LINK",
    images: [
      "/projects/rag_system/1.png"
    ]
  },
  {
    title: "IIT Tirupati Integrated Campus App",
    description:
      "Campus ecosystem mobile app integrating mess menu, bus schedules, and club updates with 50+ beta users.",
    tech: ["Flutter", "Dart", "Firebase"],
    github: "YOUR_GITHUB_LINK",
    images: [
      "/projects/campus_app/1.png",
      "/projects/campus_app/2.png"
    ]
  }
];

export default function Projects() {

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-28 px-6 bg-neutral-950 text-white">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold mb-12">
          Selected Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 cursor-pointer hover:border-purple-500 transition"
            >

              {project.badge && (
                <span className="text-xs text-purple-400">
                  {project.badge}
                </span>
              )}

              <h3 className="text-xl font-semibold mt-2">
                {project.title}
              </h3>

              {project.subtitle && (
                <p className="text-sm text-gray-400 mb-2">
                  {project.subtitle}
                </p>
              )}

              <p className="text-gray-400 mt-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">

                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-neutral-800 rounded-md"
                  >
                    {t}
                  </span>
                ))}

              </div>

            </motion.div>
          ))}

        </div>

      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </section>
  );
}