"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

// ─── Preset recruiter messages ─────────────────────────────────────────────────
const PRESET_MESSAGES = [
  {
    id: "interview",
    sender: "Sarah K.",
    avatar: "SK",
    avatarColor: "#6366f1",
    text: "Interested in your profile! Can we connect to discuss joining our company for a senior SDE role?",
    task: {
      id: "t1",
      label: "Interview",
      title: "Interview call with Company XYZ",
      detail: "3:00 PM · Today",
      tag: "Recruiting",
      tagColor: "#6366f1",
      priority: "urgent",
      status: "todo",
    },
  },
  {
    id: "collab",
    sender: "Rahul M.",
    avatar: "RM",
    avatarColor: "#f472b6",
    text: "Hey! I have a startup idea in the AI space. Would love to collaborate and build something together.",
    task: {
      id: "t2",
      label: "Collab",
      title: "Collaboration · Project Dynamo",
      detail: "AI startup · Early stage",
      tag: "Partnership",
      tagColor: "#f472b6",
      priority: "medium",
      status: "todo",
    },
  },
  {
    id: "research",
    sender: "Dr. Priya N.",
    avatar: "PN",
    avatarColor: "#34d399",
    text: "I came across your research work. Interested in co-authoring a paper on scalable ML systems?",
    task: {
      id: "t3",
      label: "Research",
      title: "Co-author · ML Systems Paper",
      detail: "NeurIPS submission · Q3",
      tag: "Research",
      tagColor: "#34d399",
      priority: "medium",
      status: "todo",
    },
  },
  {
    id: "freelance",
    sender: "Alex T.",
    avatar: "AT",
    avatarColor: "#fb923c",
    text: "We need a backend architect for a 3-month contract. Your distributed systems experience is a great fit!",
    task: {
      id: "t4",
      label: "Contract",
      title: "Backend contract · 3 months",
      detail: "Distributed systems · Remote",
      tag: "Freelance",
      tagColor: "#fb923c",
      priority: "high",
      status: "todo",
    },
  },
];

const PRIORITY_COLORS = {
  urgent: "#f87171",
  high:   "#fb923c",
  medium: "#facc15",
  low:    "#4ade80",
};

const PRIORITY_ICONS = {
  urgent: "!!!",
  high:   "!!",
  medium: "!",
  low:    "·",
};

// ─── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ initials, color, size = 32 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `${color}22`, border: `1.5px solid ${color}55`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.3, fontWeight: 700, color, flexShrink: 0,
      fontFamily: "monospace", letterSpacing: "0.04em",
    }}>
      {initials}
    </div>
  );
}

// ─── Task Card (kanban) ────────────────────────────────────────────────────────
function TaskCard({ task, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 280, damping: 22 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 10, padding: "12px 14px",
        cursor: "default", transition: "all 0.18s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 8, bottom: 8, width: 3,
        borderRadius: "0 3px 3px 0",
        background: task.tagColor, opacity: 0.8,
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, paddingLeft: 8 }}>
        {/* priority icon */}
        <span style={{
          fontSize: 9, fontWeight: 800, color: PRIORITY_COLORS[task.priority],
          fontFamily: "monospace", marginTop: 2, minWidth: 14,
        }}>
          {PRIORITY_ICONS[task.priority]}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* title */}
          <p style={{
            margin: 0, fontSize: 12.5, fontWeight: 600, color: "#fff",
            fontFamily: "'JetBrains Mono', monospace",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {task.title}
          </p>
          {/* detail */}
          <p style={{
            margin: "4px 0 0", fontSize: 11, color: "rgba(255,255,255,0.45)",
            fontFamily: "monospace",
          }}>
            {task.detail}
          </p>
        </div>

        {/* tag */}
        <span style={{
          fontSize: 9.5, fontWeight: 600, letterSpacing: "0.07em",
          color: task.tagColor, background: `${task.tagColor}18`,
          border: `1px solid ${task.tagColor}40`,
          borderRadius: 5, padding: "2px 7px", whiteSpace: "nowrap",
          fontFamily: "monospace",
        }}>
          {task.tag}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Chat Message ──────────────────────────────────────────────────────────────
function ChatMessage({ msg, onSend, sent }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <Avatar initials={msg.avatar} color={msg.avatarColor} size={34} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 5 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", fontFamily: "monospace" }}>
            {msg.sender}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
            just now
          </span>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "4px 12px 12px 12px",
          padding: "10px 14px",
          fontSize: 13, color: "rgba(255,255,255,0.85)",
          lineHeight: 1.6, fontFamily: "monospace",
          marginBottom: 8,
        }}>
          {msg.text}
        </div>

        {/* send reply button */}
        {!sent ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSend(msg)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "rgba(34,211,238,0.1)",
              border: "1px solid rgba(34,211,238,0.3)",
              borderRadius: 8, padding: "6px 14px",
              color: "#22d3ee", fontSize: 11.5, fontWeight: 600,
              fontFamily: "monospace", letterSpacing: "0.05em",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 13 }}>↩</span> Reply & Add to Board
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11, color: "#4ade80", fontFamily: "monospace",
            }}
          >
            <span>✓</span> Added to board
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Main Connect Component ────────────────────────────────────────────────────
export default function Connect() {
  const [activeThread, setActiveThread] = useState(0);
  const [sentIds, setSentIds]     = useState(new Set());
  const [tasks, setTasks]         = useState([]);
  const [toast, setToast]         = useState(null);
  const [toastKey, setToastKey]   = useState(0);
  const scrollRef = useRef(null);

  // auto-scroll chat on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [sentIds, activeThread]);

  const handleSend = (msg) => {
    if (sentIds.has(msg.id)) return;
    setSentIds(prev => new Set([...prev, msg.id]));
    setTasks(prev => {
      // avoid duplicate task ids
      if (prev.find(t => t.id === msg.task.id)) return prev;
      return [...prev, msg.task];
    });
    setToast(msg.task);
    setToastKey(k => k + 1);
    setTimeout(() => setToast(null), 3000);
  };

  const currentMsg = PRESET_MESSAGES[activeThread];

  return (
    <section id="contact" style={{
      padding: "80px 24px",
      background: "#000",
      color: "#fff",
      minHeight: "100vh",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Title ── */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{
            fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 800,
            margin: 0, letterSpacing: "-0.02em",
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            Let's{" "}
            <span style={{ color: "#22d3ee" }}>Connect</span>
          </h2>
          <p style={{
            marginTop: 12, fontSize: 14,
            color: "rgba(255,255,255,0.45)",
            fontFamily: "monospace",
          }}>
            interactive inbox · click a message · watch it land on the board
          </p>
        </div>

        {/* ── Social links ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: 16, marginBottom: 48,
        }}>
          {[
            { href: "https://github.com/Yamini-29",                               Icon: FaGithub,   label: "GitHub",   color: "#fff"    },
            { href: "https://linkedin.com/in/yamini-shree-baskar-b04644241",      Icon: FaLinkedin, label: "LinkedIn", color: "#0ea5e9" },
            { href: "mailto:yaminishreebaskar@gmail.com",                         Icon: FaEnvelope, label: "Email",    color: "#22d3ee" },
          ].map(({ href, Icon, label, color }) => (
            <motion.a key={label} href={href} target="_blank" rel="noreferrer"
              whileHover={{ y: -3, borderColor: color }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 10, padding: "22px 16px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14, textDecoration: "none",
                transition: "border-color 0.2s",
              }}
            >
              <Icon size={24} color={color} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "monospace" }}>
                {label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* ── Main panel: Chat + Board ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 20, alignItems: "stretch",
        }}>

          {/* ── LEFT: Chat panel ── */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>

            {/* channel header */}
            <div style={{
              padding: "14px 18px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>#</span>
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace", color: "#fff" }}>
                recruiter-inbox
              </span>
              <span style={{
                marginLeft: "auto", fontSize: 10, fontFamily: "monospace",
                color: "#4ade80", background: "#4ade8018",
                border: "1px solid #4ade8040", borderRadius: 5,
                padding: "2px 8px",
              }}>● live</span>
            </div>

            {/* thread tabs */}
            <div style={{
              display: "flex", gap: 4, padding: "10px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              overflowX: "auto",
            }}>
              {PRESET_MESSAGES.map((m, i) => (
                <button key={m.id} onClick={() => setActiveThread(i)}
                  style={{
                    padding: "5px 12px", borderRadius: 8,
                    border: `1px solid ${activeThread === i ? m.avatarColor + "60" : "rgba(255,255,255,0.07)"}`,
                    background: activeThread === i ? `${m.avatarColor}14` : "transparent",
                    color: activeThread === i ? m.avatarColor : "rgba(255,255,255,0.45)",
                    fontSize: 11, fontFamily: "monospace", fontWeight: 600,
                    cursor: "pointer", whiteSpace: "nowrap",
                    transition: "all 0.15s",
                  }}
                >
                  {sentIds.has(m.id) && (
                    <span style={{ color: "#4ade80", marginRight: 5 }}>✓</span>
                  )}
                  {m.label || m.sender.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* messages area */}
            <div ref={scrollRef} style={{
              flex: 1, padding: "18px 18px 12px",
              overflowY: "auto", minHeight: 240,
            }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeThread}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                  <ChatMessage
                    msg={currentMsg}
                    onSend={handleSend}
                    sent={sentIds.has(currentMsg.id)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* dummy input bar */}
            <div style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{
                flex: 1, background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 9, padding: "9px 14px",
                fontSize: 12, color: "rgba(255,255,255,0.25)",
                fontFamily: "monospace",
              }}>
                Reply to {currentMsg.sender}...
              </div>
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={() => handleSend(currentMsg)}
                style={{
                  background: "#22d3ee",
                  border: "none", borderRadius: 9,
                  width: 36, height: 36, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                    stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>
          </div>

          {/* ── RIGHT: Kanban board ── */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16, display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>

            {/* board header */}
            <div style={{
              padding: "14px 18px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1.5"
                  stroke="#22d3ee" strokeWidth="1.8"/>
                <rect x="14" y="3" width="7" height="7" rx="1.5"
                  stroke="#22d3ee" strokeWidth="1.8"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5"
                  stroke="rgba(255,255,255,0.3)" strokeWidth="1.8"/>
                <rect x="14" y="14" width="7" height="7" rx="1.5"
                  stroke="rgba(255,255,255,0.3)" strokeWidth="1.8"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>
                My Board
              </span>
              <span style={{
                marginLeft: 6, fontSize: 10, color: "#22d3ee",
                background: "#22d3ee18", border: "1px solid #22d3ee35",
                borderRadius: 5, padding: "2px 8px", fontFamily: "monospace",
              }}>
                {tasks.length} tasks
              </span>
            </div>

            {/* column header */}
            <div style={{
              padding: "10px 18px 6px",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: "50%",
                border: "1.8px solid rgba(255,255,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)" }} />
              </div>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "rgba(255,255,255,0.6)",
                fontFamily: "monospace", letterSpacing: "0.06em" }}>
                TODO
              </span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)",
                fontFamily: "monospace" }}>
                {tasks.length}
              </span>
            </div>

            {/* task list */}
            <div style={{
              flex: 1, padding: "6px 14px 14px",
              overflowY: "auto", display: "flex", flexDirection: "column", gap: 8,
            }}>
              <AnimatePresence>
                {tasks.length === 0 ? (
                  <div style={{
                    flex: 1, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    padding: "40px 0", gap: 12,
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      border: "1.5px dashed rgba(255,255,255,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 20, opacity: 0.3 }}>+</span>
                    </div>
                    <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.25)",
                      fontFamily: "monospace", margin: 0, textAlign: "center" }}>
                      Reply to a message<br />to add tasks here
                    </p>
                  </div>
                ) : (
                  tasks.map((task, i) => (
                    <TaskCard key={task.id} task={task} index={i} />
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* board footer */}
            <div style={{
              padding: "10px 16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", gap: 6, flexWrap: "wrap",
            }}>
              {Object.entries(PRIORITY_COLORS).map(([p, c]) => (
                <span key={p} style={{
                  fontSize: 9.5, fontFamily: "monospace",
                  color: c, background: `${c}12`,
                  border: `1px solid ${c}30`,
                  borderRadius: 5, padding: "2px 8px",
                }}>
                  {PRIORITY_ICONS[p]} {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Toast ── */}
        <AnimatePresence>
          {toast && (
            <motion.div key={toastKey}
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              style={{
                position: "fixed", bottom: 32, right: 32,
                background: "rgba(10,15,25,0.97)",
                border: "1px solid rgba(74,222,128,0.35)",
                borderRadius: 12, padding: "14px 20px",
                display: "flex", alignItems: "center", gap: 12,
                zIndex: 1000, maxWidth: 320, boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "#4ade8018", border: "1.5px solid #4ade8060",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, color: "#4ade80", flexShrink: 0,
              }}>
                ✓
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700,
                  color: "#fff", fontFamily: "monospace" }}>
                  Task added to board
                </p>
                <p style={{ margin: "3px 0 0", fontSize: 11,
                  color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>
                  {toast.title}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Resume ── */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <motion.a href="/resume.pdf" download
            whileHover={{ borderColor: "#22d3ee", color: "#22d3ee" }}
            style={{
              display: "inline-block",
              padding: "12px 32px",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 12, color: "rgba(255,255,255,0.75)",
              textDecoration: "none", fontSize: 13,
              fontFamily: "monospace", fontWeight: 600,
              letterSpacing: "0.06em", transition: "all 0.2s",
            }}
          >
            ↓ Download Resume
          </motion.a>
        </div>

      </div>
    </section>
  );
}