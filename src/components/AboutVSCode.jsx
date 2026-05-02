"use client";

import { useEffect, useState } from "react";

const FULL_CODE = [
  'const me = {',
  '  name: "Yamini",',
  '  education: "IIT Tirupati",',
  '  focus: ["Backend Systems", "ML", "Distributed Systems"],',
  '  experience: [',
  '    "Amazon - scalable infrastructure",',
  '    "Wipro - enterprise automation platforms"',
  '  ],',
  '  interests: ["ML Systems", "Multi-agent Systems", "Dev Tooling"]',
  '};'
];

export default function AboutInteractive() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  // typing effect ONLY for first 3 lines
  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      if (i < 3) {
        setDisplayedLines(prev => [...prev, FULL_CODE[i]]);
        i++;
      } else {
        clearInterval(interval);
        // instantly show rest (no slow typing)
        setDisplayedLines(FULL_CODE);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // blinking cursor
  useEffect(() => {
    const cursor = setInterval(() => {
      setCursorVisible(v => !v);
    }, 600);
    return () => clearInterval(cursor);
  }, []);

  return (
    <section className="pb-3 bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto">


        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-md overflow-hidden">

          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-950 border-b border-neutral-800">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="ml-4 text-sm text-gray-400">About.jsx</span>
          </div>

          {/* Code */}
          <div className="grid grid-cols-[50px_1fr] font-mono text-sm leading-7">

            {/* line numbers */}
            <div className="text-right pr-3 text-gray-500 border-r border-neutral-800 select-none">
              {FULL_CODE.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* content */}
            <div className="p-4">

              {displayedLines.map((line, i) => (
                <div key={i} className="whitespace-pre">

                  {/* syntax highlighting */}
                  {line.includes("const") ? (
                    <>
                      <span className="text-purple-400">const</span>{" "}
                      <span>me</span> = {"{"}
                    </>
                  ) : (
                    highlightLine(line)
                  )}

                  {/* cursor only on last typed line */}
                  {i === displayedLines.length - 1 && (
                    <span
                      className={`inline-block w-[8px] h-[16px] ml-1 ${
                        cursorVisible ? "bg-sky-400" : "bg-transparent"
                      }`}
                    />
                  )}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Simple Syntax Highlighter
========================= */

function highlightLine(line) {
  return line
    .replace(/"(.*?)"/g, `<span class="text-green-400">"$1"</span>`)
    .replace(/\b(const)\b/g, `<span class="text-purple-400">$1</span>`)
    .split(/(<span.*?>.*?<\/span>)/g)
    .map((part, i) =>
      part.startsWith("<span") ? (
        <span
          key={i}
          dangerouslySetInnerHTML={{ __html: part }}
        />
      ) : (
        <span key={i}>{part}</span>
      )
    );
}