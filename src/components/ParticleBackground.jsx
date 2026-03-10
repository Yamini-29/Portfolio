"use client";

import Particles from "react-tsparticles";

export default function ParticleBackground() {
  return (
    <Particles
      className="absolute inset-0 -z-10"
      options={{
        particles: {
          number: { value: 60 },
          size: { value: 2 },
          color: { value: "#a855f7" },
          move: { enable: true, speed: 0.3 },
          links: {
            enable: true,
            distance: 120,
            color: "#a855f7",
            opacity: 0.15
          }
        },
        background: { color: "transparent" }
      }}
    />
  );
}