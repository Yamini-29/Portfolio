"use client";

import { motion } from "framer-motion";
import DevPipeline from "./DevJourney";

export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center px-10">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center w-full">

        {/* LEFT */}

        <div>

          {/* NAME (MOST IMPORTANT) */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
          >
            Yamini  <span className="text-sky-400"> Shree</span>
          </motion.h1>

          {/* COLLEGE */}

          <p className="text-gray-400 mb-6">
            Computer Science Engineer •{" "}
            <span className="text-sky-400">IIT Tirupati</span>
          </p>

          {/* TAGLINE */}

           <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight"
          >
            Building intelligent systems for
            <span className="text-sky-400"> scalable platforms</span>
             and <span className="text-sky-400">AI applications</span>.
          </motion.h1>

         

      

 
        </div>

        {/* RIGHT SIDE */}

        <div className="hidden md:flex justify-center items-center">

    
  <DevPipeline />


        </div>

      </div>

    </section>
  );
}