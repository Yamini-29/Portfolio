"use client";

import { motion } from "framer-motion";

export default function FeaturedResearch() {
  return (
    <section id="research" className="py-28 px-6 bg-neutral-950 text-white">

      <div className="max-w-6xl mx-auto">

        {/* Section Label */}
        <p className="text-sm text-purple-400 mb-2">
          FEATURED RESEARCH
        </p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          Emergence of Grounded Language among Homogeneous Agents in a Decentralised Environment
        </motion.h2>

        {/* Short Description */}
        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-3xl">
          Built a decentralized multi-agent communication system where agents
          learn a shared language to describe objects in an environment.
          The project studies how structured communication protocols can
          emerge purely through interaction — inspired by the evolution
          of human language.
        </p>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Problem */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Problem
            </h3>

            <p className="text-gray-400">
              Human language evolved through decentralized communication
              among individuals. This project investigates whether AI
              agents can independently develop a shared language to
              describe environmental concepts without centralized control.
            </p>
          </div>

          {/* Environment */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Environment Setup
            </h3>

            <p className="text-gray-400">
              Agents interact in a simulated environment containing objects
              represented by points. Each point has three attributes:
              sector, segment, and color. These attributes form the
              concepts agents must communicate using words from a shared
              vocabulary.
            </p>
          </div>

          {/* Approach */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Approach
            </h3>

            <p className="text-gray-400">
              Each agent alternates between speaker and listener roles.
              The speaker encodes object concepts into vocabulary tokens,
              while the listener decodes them to identify the correct
              object. Successful communication occurs when both agents
              agree on the intended object.
            </p>
          </div>

          {/* Model Architecture */}
          <div>
            <h3 className="text-xl font-semibold mb-3">
              Model Architecture
            </h3>

            <p className="text-gray-400">
              Each agent contains two LSTM networks: a speaker LSTM that
              maps concepts to vocabulary distributions, and a listener
              LSTM that maps vocabulary tokens back to concept
              distributions. Learning is driven by structured reward
              functions and mirror loss updates.
            </p>
          </div>

        </div>

        {/* Tech Stack */}
        <div className="mt-12">

          <h3 className="text-xl font-semibold mb-4">
            Technologies
          </h3>

          <div className="flex flex-wrap gap-3">

            <span className="px-4 py-2 bg-neutral-800 rounded-lg">
              Python
            </span>

            <span className="px-4 py-2 bg-neutral-800 rounded-lg">
              PyTorch
            </span>

            <span className="px-4 py-2 bg-neutral-800 rounded-lg">
              LSTM Networks
            </span>

            <span className="px-4 py-2 bg-neutral-800 rounded-lg">
              Multi-Agent Systems
            </span>

            <span className="px-4 py-2 bg-neutral-800 rounded-lg">
              Reinforcement Learning
            </span>

          </div>

        </div>

      </div>
    {/* Results / Graphs */}

<div className="mt-16">

  <h3 className="text-xl font-semibold mb-6">
    Experimental Results
  </h3>

  <div className="grid md:grid-cols-2 gap-6">
    <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">

  <img
     src="/graphs/speaker_agent.png"
    className="rounded-lg brightness-90"
  />

</div>

    
    <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">

  <img
     src="/graphs/listener.png"
    className="rounded-lg brightness-90"
  />

</div>

    <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">

  <img
     src="/graphs/results.png"
    className="rounded-lg brightness-90"
  />
</div>


  </div>

</div>
    </section>

    
  );
}