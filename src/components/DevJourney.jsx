"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Layout ────────────────────────────────────────────────────────────────────
const W          = 1000;
const H          = 380;
const PIPELINE_Y = 140;
const BRANCH_Y   = PIPELINE_Y + 130;
const NODE_R     = 42;

// Hero cyan palette (matches "Yamini Shree" blue)
const CYAN   = "#22d3ee";   // main pipeline nodes
const INDIGO = "#818cf8";   // model node
const GREEN  = "#4ade80";   // cache / healthy
const PINK   = "#f472b6";   // auth
const ORANGE = "#fb923c";   // queue
const VIOLET = "#c084fc";   // svc microservice
const WHITE  = "#ffffff";
const DIM    = "rgba(255,255,255,0.55)";

// ─── Data ──────────────────────────────────────────────────────────────────────
const NODES = [
  { id: "dev",   x: 0,   label: "DEV",   sub: "commit",  color: CYAN,   type: "origin" },
  { id: "gw",    x: 140, label: "GW",    sub: "gateway", color: CYAN,   type: "normal" },
  { id: "api",   x: 280, label: "API",   sub: "route",   color: CYAN,   type: "normal" },
  { id: "db",    x: 420, label: "DB",    sub: "query",   color: CYAN,   type: "flaky"  },
  { id: "cache", x: 560, label: "CACHE", sub: "redis",   color: GREEN,  type: "normal" },
  { id: "model", x: 700, label: "MODEL", sub: "infer",   color: INDIGO, type: "model"  },
  { id: "out",   x: 880, label: "OUT",   sub: "stream",  color: CYAN,   type: "normal" },
];

const BRANCHES = [
  { id: "auth",  parentId: "gw",  label: "AUTH",  sub: "jwt",   color: PINK   },
  { id: "queue", parentId: "api", label: "QUEUE", sub: "kafka", color: ORANGE },
  { id: "svc",   parentId: "db",  label: "SVC",   sub: "micro", color: VIOLET },
];

const PACKETS = [
  { id: "p1", label: "HTTP", from: "dev",   to: "gw",    color: CYAN,   baseDur: 6   },
  { id: "p2", label: "JWT",  from: "gw",    to: "auth",  color: PINK,   baseDur: 7   },
  { id: "p3", label: "REQ",  from: "gw",    to: "api",   color: CYAN,   baseDur: 5.5 },
  { id: "p4", label: "MSG",  from: "api",   to: "queue", color: ORANGE, baseDur: 8   },
  { id: "p5", label: "SQL",  from: "api",   to: "db",    color: CYAN,   baseDur: 6.5 },
  { id: "p6", label: "FN",   from: "db",    to: "svc",   color: VIOLET, baseDur: 7.5 },
  { id: "p7", label: "HIT",  from: "db",    to: "cache", color: GREEN,  baseDur: 5   },
  { id: "p8", label: "VEC",  from: "cache", to: "model", color: INDIGO, baseDur: 8.5 },
  { id: "p9", label: "RES",  from: "model", to: "out",   color: CYAN,   baseDur: 6   },
];

const NODE_INFO = {
  dev:   { title: "Developer",    desc: "Pushes code · triggers CI/CD pipeline" },
  gw:    { title: "API Gateway",  desc: "Rate-limits, routes, auth pre-check" },
  api:   { title: "REST API",     desc: "Business logic, validation, orchestration" },
  db:    { title: "Database",     desc: "PostgreSQL — simulated flakiness under load" },
  cache: { title: "Redis Cache",  desc: "Hot-path cache — cuts DB queries by ~70%" },
  model: { title: "AI Model",     desc: "LLM inference — confidence drifts live" },
  out:   { title: "Output",       desc: "SSE streamed response to client" },
  auth:  { title: "Auth Service", desc: "JWT validation + token refresh" },
  queue: { title: "Kafka Queue",  desc: "Async fan-out · durable event log" },
  svc:   { title: "Microservice", desc: "Isolated domain — independent deploy" },
};

function getPos(id) {
  const n = NODES.find(n => n.id === id);
  if (n) return { x: n.x + NODE_R, y: PIPELINE_Y };
  const b = BRANCHES.find(b => b.id === id);
  if (b) {
    const p = NODES.find(n => n.id === b.parentId);
    return { x: p.x + NODE_R, y: BRANCH_Y };
  }
  return { x: 0, y: 0 };
}

// ─── Stick Figure (plain circle head, no face) ─────────────────────────────────
function StickFigure({ x, y, walking, onClick, paused }) {
  const strokeColor = CYAN;
  const sw = 2.5;
  return (
    <motion.g
      style={{ cursor: "pointer" }}
      onClick={onClick}
      animate={{ x, y: y - 58 }}
      transition={{ x: { duration: 0, ease: "linear" } }}
    >
      {/* hover glow when paused */}
      {paused && (
        <motion.circle cx={0} cy={-40} r={22}
          fill="none" stroke={CYAN} strokeWidth={1}
          animate={{ opacity: [0.5, 0, 0.5], r: [22, 34, 22] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      )}

      {/* plain head — just a circle */}
      <circle cx={0} cy={-40} r={9}
        fill="none" stroke={strokeColor} strokeWidth={sw} />

      {/* body */}
      <line x1={0} y1={-31} x2={0} y2={-10}
        stroke={strokeColor} strokeWidth={sw} strokeLinecap="round" />

      {/* left arm */}
      <motion.line x1={0} y1={-24} x2={-16} y2={-12}
        stroke={strokeColor} strokeWidth={sw - 0.3} strokeLinecap="round"
        animate={walking ? { x2: [-16, -9, -16], y2: [-12, -22, -12] } : {}}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* right arm + laptop */}
      <motion.g
        animate={walking ? { rotate: [-14, 14, -14] } : {}}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        style={{ transformOrigin: "0px -24px" }}
      >
        <line x1={0} y1={-24} x2={16} y2={-12}
          stroke={strokeColor} strokeWidth={sw - 0.3} strokeLinecap="round" />
        {/* laptop body */}
        <rect x={14} y={-16} width={16} height={11} rx={2}
          fill="none" stroke={strokeColor} strokeWidth={1.8} />
        {/* laptop base */}
        <line x1={13} y1={-5} x2={31} y2={-5}
          stroke={strokeColor} strokeWidth={1.8} strokeLinecap="round" />
        {/* screen glow */}
        <rect x={15} y={-15} width={14} height={9} rx={1}
          fill={`${CYAN}22`} />
      </motion.g>

      {/* left leg */}
      <motion.line x1={0} y1={-10} x2={-12} y2={8}
        stroke={strokeColor} strokeWidth={sw - 0.3} strokeLinecap="round"
        animate={walking ? { x2: [-12, -5, -12], y2: [8, 1, 8] } : {}}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />

      {/* right leg */}
      <motion.line x1={0} y1={-10} x2={12} y2={8}
        stroke={strokeColor} strokeWidth={sw - 0.3} strokeLinecap="round"
        animate={walking ? { x2: [12, 5, 12], y2: [8, 1, 8] } : {}}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.g>
  );
}

// ─── Main Pipeline Node ─────────────────────────────────────────────────────────
function PipelineNode({ node, status, confidence, onClick, isActive }) {
  const isModel = node.type === "model";
  const cx = node.x + NODE_R;
  const dotColor = status === "error" ? "#f87171"
                 : status === "retry" ? "#facc15"
                 : "#4ade80";

  return (
    <g style={{ cursor: "pointer" }} onClick={() => onClick(node.id)}>

      {/* model confidence glow */}
      {isModel && <>
        <motion.circle cx={cx} cy={PIPELINE_Y} r={NODE_R + 8}
          fill="none" stroke={INDIGO} strokeWidth={1.5}
          animate={{ opacity: [0.08, 0.6 * confidence, 0.08], r: [NODE_R + 8, NODE_R + 20, NODE_R + 8] }}
          transition={{ duration: 2.6, repeat: Infinity }} />
        <motion.circle cx={cx} cy={PIPELINE_Y} r={NODE_R + 18}
          fill="none" stroke={INDIGO} strokeWidth={0.8}
          animate={{ opacity: [0, 0.35 * confidence, 0], r: [NODE_R + 18, NODE_R + 30, NODE_R + 18] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: 0.6 }} />
      </>}

      {/* active ring */}
      {isActive && (
        <motion.circle cx={cx} cy={PIPELINE_Y} r={NODE_R + 6}
          fill="none" stroke={node.color} strokeWidth={2}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }} />
      )}

      {/* idle pulse */}
      <motion.circle cx={cx} cy={PIPELINE_Y} r={NODE_R + 2}
        fill="none" stroke={node.color} strokeWidth={1}
        animate={{ opacity: [0.12, isActive ? 0.7 : 0.3, 0.12] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: NODES.indexOf(node) * 0.3 }} />

      {/* filled circle */}
      <circle cx={cx} cy={PIPELINE_Y} r={NODE_R}
        fill={isModel ? `${INDIGO}20` : `${node.color}14`}
        stroke={node.color}
        strokeWidth={isActive ? 2.5 : 1.8} />

      {/* main label — white, bold */}
      <text x={cx} y={PIPELINE_Y - 8}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={node.label.length > 4 ? "13" : "15"}
        fontFamily="'JetBrains Mono','Fira Code',monospace"
        fontWeight="700" fill={WHITE} letterSpacing="0.12em">
        {node.label}
      </text>

      {/* sub label — white 60% */}
      <text x={cx} y={PIPELINE_Y + 14}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="10" fontFamily="monospace"
        fill={WHITE} opacity={0.55} letterSpacing="0.08em">
        {node.sub}
      </text>

      {/* status dot */}
      <motion.circle
        cx={cx + NODE_R - 8} cy={PIPELINE_Y - NODE_R + 8}
        r={7} fill={dotColor}
        stroke="rgba(0,0,0,0.4)" strokeWidth={1}
        animate={status === "error" ? { opacity: [1, 0.2, 1] } : { opacity: 1 }}
        transition={{ duration: 0.4, repeat: Infinity }}
      />

      {/* latency badge on active */}
      {isActive && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <rect x={cx - 30} y={PIPELINE_Y - NODE_R - 30} width={60} height={20} rx={6}
            fill="rgba(0,0,0,0.9)" stroke={node.color} strokeWidth={1} />
          <text x={cx} y={PIPELINE_Y - NODE_R - 19}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="monospace" fontWeight="600" fill={node.color}>
            ~{Math.floor(Math.random() * 80 + 15)}ms
          </text>
        </motion.g>
      )}

      {/* model mini confidence bar */}
      {isModel && (
        <g>
          <rect x={node.x + 6} y={PIPELINE_Y + NODE_R + 10}
            width={NODE_R * 2 - 12} height={5} rx={2.5}
            fill="rgba(129,140,248,0.2)" />
          <motion.rect x={node.x + 6} y={PIPELINE_Y + NODE_R + 10}
            width={(NODE_R * 2 - 12) * confidence} height={5} rx={2.5} fill={INDIGO}
            animate={{ width: (NODE_R * 2 - 12) * confidence }}
            transition={{ duration: 1 }} />
        </g>
      )}
    </g>
  );
}

// ─── Branch Node ────────────────────────────────────────────────────────────────
function BranchNode({ branch }) {
  const parent = NODES.find(n => n.id === branch.parentId);
  const cx = parent.x + NODE_R;

  return (
    <g>
      {/* solid visible stem */}
      <line
        x1={cx} y1={PIPELINE_Y + NODE_R + 2}
        x2={cx} y2={BRANCH_Y - NODE_R - 2}
        stroke={branch.color} strokeWidth={1.5}
        strokeDasharray="6 4" opacity={0.8}
      />

      {/* pulse ring */}
      <motion.circle cx={cx} cy={BRANCH_Y} r={NODE_R + 2}
        fill="none" stroke={branch.color} strokeWidth={1}
        animate={{ opacity: [0.1, 0.5, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.8 }} />

      {/* fill */}
      <circle cx={cx} cy={BRANCH_Y} r={NODE_R}
        fill={`${branch.color}18`} stroke={branch.color} strokeWidth={1.8} />

      {/* white bold label */}
      <text x={cx} y={BRANCH_Y - 8}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="13" fontFamily="'JetBrains Mono','Fira Code',monospace"
        fontWeight="700" fill={WHITE} letterSpacing="0.12em">
        {branch.label}
      </text>
      <text x={cx} y={BRANCH_Y + 13}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="10" fontFamily="monospace"
        fill={WHITE} opacity={0.55}>
        {branch.sub}
      </text>
    </g>
  );
}

// ─── Packet ─────────────────────────────────────────────────────────────────────
function Packet({ packet, speedMult }) {
  const from = getPos(packet.from);
  const to   = getPos(packet.to);
  const dur  = packet.baseDur / speedMult;

  return (
    <motion.g
      animate={{ x: [from.x, to.x], y: [from.y, to.y], opacity: [0, 1, 1, 0] }}
      transition={{
        duration: dur, repeat: Infinity, repeatDelay: dur * 0.45,
        ease: "linear", opacity: { times: [0, 0.06, 0.9, 1] },
      }}
    >
      {/* glow halo */}
      <circle r={9}  fill={packet.color} opacity={0.15} />
      {/* core */}
      <circle r={6}  fill={packet.color} opacity={1} />
      {/* label */}
      <text y={-14} textAnchor="middle"
        fontSize="10" fontFamily="'JetBrains Mono',monospace"
        fontWeight="700" fill={WHITE} opacity={0.95} letterSpacing="0.07em">
        {packet.label}
      </text>
    </motion.g>
  );
}

// ─── Error / Retry Event ────────────────────────────────────────────────────────
function RetryEvent({ trigger }) {
  const db = getPos("db");
  const [key, setKey] = useState(0);
  useEffect(() => { if (trigger) setKey(k => k + 1); }, [trigger]);
  if (!trigger) return null;
  return (
    <g key={key}>
      <motion.text x={db.x + 16} y={db.y - 60}
        fontSize="13" fontFamily="monospace" fontWeight="700"
        fill="#f87171" letterSpacing="0.1em"
        initial={{ opacity: 0, y: db.y - 48 }}
        animate={{ opacity: [0, 1, 1, 0], y: [db.y - 48, db.y - 64, db.y - 64] }}
        transition={{ duration: 2 }}>
        ERR 500
      </motion.text>
      <motion.circle r={7} fill="#facc15"
        animate={{ x: [db.x, db.x + 80], y: [db.y, db.y], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, delay: 1.6, ease: "easeIn" }} />
      <motion.text fontSize="12" fontFamily="monospace" fontWeight="700" fill="#facc15"
        animate={{ x: [db.x + 20, db.x + 100], y: [db.y - 16, db.y - 16], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, delay: 1.6 }}>
        ↺ retry
      </motion.text>
    </g>
  );
}

// ─── Tooltip ────────────────────────────────────────────────────────────────────
function Tooltip({ nodeId }) {
  const info = NODE_INFO[nodeId];
  if (!info) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 4, scale: 0.95 }}
      transition={{ duration: 0.18 }}
      style={{
        position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        background: "rgba(5,10,20,0.97)", border: `1px solid ${CYAN}50`,
        borderRadius: 12, padding: "12px 22px", minWidth: 240,
        pointerEvents: "none", zIndex: 30,
      }}
    >
      <p style={{ margin: 0, fontFamily: "monospace", fontSize: 13, fontWeight: 700,
        color: CYAN, letterSpacing: "0.1em" }}>{info.title}</p>
      <p style={{ margin: "6px 0 0", fontFamily: "monospace", fontSize: 11,
        color: WHITE, opacity: 0.75, lineHeight: 1.6 }}>{info.desc}</p>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function DevPipeline() {
  const [figX, setFigX]           = useState(NODES[0].x + NODE_R);
  const [walking, setWalking]     = useState(true);
  const [paused, setPaused]       = useState(false);
  const [target, setTarget]       = useState(null);
  const [speedMult, setSpeedMult] = useState(0.45);
  const [activeNode, setActiveNode] = useState(null);
  const [tooltip, setTooltip]     = useState(null);
  const [confidence, setConfidence] = useState(0.76);
  const [retryTrigger, setRetryTrigger] = useState(false);
  const [statuses, setStatuses]   = useState(
    Object.fromEntries(NODES.map(n => [n.id, "healthy"]))
  );

  const rafRef = useRef(null);
  const dirRef = useRef(1);
  const xRef   = useRef(NODES[0].x + NODE_R);
  const tsRef  = useRef(null);

  // auto-walk
  useEffect(() => {
    if (target !== null || paused) return;
    const speed = 35 * speedMult;
    const step = (ts) => {
      if (!tsRef.current) tsRef.current = ts;
      const dt = Math.min((ts - tsRef.current) / 1000, 0.05);
      tsRef.current = ts;
      xRef.current += dirRef.current * speed * dt;
      const maxX = NODES[NODES.length - 1].x + NODE_R * 2;
      const minX = NODES[0].x + NODE_R;
      if (xRef.current >= maxX) { dirRef.current = -1; xRef.current = maxX; }
      if (xRef.current <= minX) { dirRef.current =  1; xRef.current = minX; }
      setFigX(xRef.current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(rafRef.current); tsRef.current = null; };
  }, [target, paused, speedMult]);

  // walk-to-node
  useEffect(() => {
    if (target === null) return;
    const dest = NODES.find(n => n.id === target);
    if (!dest) return;
    const tx = dest.x + NODE_R;
    const speed = 70 * speedMult;
    setWalking(true);
    tsRef.current = null;
    const step = (ts) => {
      if (!tsRef.current) tsRef.current = ts;
      const dt = Math.min((ts - tsRef.current) / 1000, 0.05);
      tsRef.current = ts;
      const diff = tx - xRef.current;
      if (Math.abs(diff) < 2) {
        xRef.current = tx; setFigX(tx);
        setWalking(false); setTarget(null); tsRef.current = null;
        return;
      }
      xRef.current += Math.sign(diff) * Math.min(speed * dt, Math.abs(diff));
      setFigX(xRef.current);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(rafRef.current); tsRef.current = null; };
  }, [target, speedMult]);

  // DB fault cycle
  useEffect(() => {
    const id = setInterval(() => {
      setStatuses(s => ({ ...s, db: "error" }));
      setRetryTrigger(true);
      setTimeout(() => setStatuses(s => ({ ...s, db: "retry" })), 2000);
      setTimeout(() => { setStatuses(s => ({ ...s, db: "healthy" })); setRetryTrigger(false); }, 4200);
    }, 15000);
    return () => clearInterval(id);
  }, []);

  // drift model confidence
  useEffect(() => {
    const id = setInterval(() => {
      setConfidence(c => Math.min(0.98, Math.max(0.38, c + (Math.random() - 0.46) * 0.1)));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const handleNodeClick = useCallback((id) => {
    setActiveNode(id); setTooltip(id); setTarget(id);
    setTimeout(() => setTooltip(null), 5000);
  }, []);

  const handleFigureClick = () => {
    setPaused(p => {
      const next = !p;
      setWalking(!next);
      return next;
    });
  };

  const pipeX1 = NODES[0].x + NODE_R;
  const pipeX2 = NODES[NODES.length - 1].x + NODE_R;

  const LEGEND = [
    { color: "#4ade80", label: "healthy" },
    { color: "#f87171", label: "error"   },
    { color: "#facc15", label: "retry"   },
    { color: INDIGO,    label: "model"   },
    { color: GREEN,     label: "cache"   },
    { color: PINK,      label: "auth"    },
    { color: ORANGE,    label: "queue"   },
    { color: VIOLET,    label: "svc"     },
  ];

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: 1020,
      fontFamily: "'JetBrains Mono','Fira Code',monospace",
    }}>

      {/* ── Speed control ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 11, color: DIM, letterSpacing: "0.14em" }}>SPEED</span>
        <input type="range" min={0.2} max={1.5} step={0.05} value={speedMult}
          onChange={e => setSpeedMult(Number(e.target.value))}
          style={{ width: 100, accentColor: CYAN, cursor: "pointer" }} />
        <span style={{ fontSize: 11, color: CYAN, minWidth: 34, fontWeight: 700 }}>
          {speedMult.toFixed(1)}×
        </span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", marginLeft: 4 }}>
          click nodes · click figure to pause
        </span>
      </div>

      {/* ── SVG Canvas ── */}
      <div style={{ position: "relative" }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`}
          style={{ overflow: "visible", display: "block" }}>
          <defs>
            {/* subtle grid */}
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M50 0L0 0 0 50" fill="none"
                stroke="rgba(255,255,255,0.04)" strokeWidth={0.8} />
            </pattern>
            {/* pipeline gradient */}
            <linearGradient id="pipeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor={CYAN}   stopOpacity="0.3" />
              <stop offset="45%"  stopColor={INDIGO} stopOpacity="0.7" />
              <stop offset="100%" stopColor={CYAN}   stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* grid bg */}
          <rect width={W} height={H} fill="url(#grid)" />

          {/* main pipeline line */}
          <line x1={pipeX1} y1={PIPELINE_Y} x2={pipeX2} y2={PIPELINE_Y}
            stroke="url(#pipeGrad)" strokeWidth={2} />

          {/* branch nodes */}
          {BRANCHES.map(b => <BranchNode key={b.id} branch={b} />)}

          {/* main nodes */}
          {NODES.map(node => (
            <PipelineNode key={node.id} node={node}
              status={statuses[node.id]} confidence={confidence}
              onClick={handleNodeClick} isActive={activeNode === node.id} />
          ))}

          {/* packets */}
          {PACKETS.map(p => <Packet key={p.id} packet={p} speedMult={speedMult} />)}

          {/* latency drift particles */}
          {[0,1,2,3,4,5].map(i => (
            <motion.circle key={`d${i}`} r={3.5} fill={CYAN} opacity={0.22}
              animate={{ cx: [pipeX1, pipeX2], cy: [PIPELINE_Y, PIPELINE_Y], opacity: [0, 0.3, 0.3, 0] }}
              transition={{
                duration: (12 + i * 3.5) / speedMult,
                repeat: Infinity, delay: i * 3.2, ease: "linear",
              }}
            />
          ))}

          {/* retry event */}
          <RetryEvent trigger={retryTrigger} />

          {/* stick figure */}
          <StickFigure
            x={figX} y={PIPELINE_Y}
            walking={walking} paused={paused}
            onClick={handleFigureClick}
          />

          {/* legend */}
          <g transform={`translate(8, ${H - 28})`}>
            {LEGEND.map((item, i) => (
              <g key={item.label} transform={`translate(${i * 118}, 0)`}>
                <circle cx={7} cy={7} r={6} fill={item.color} />
                <text x={17} y={11}
                  fontSize="10.5" fontFamily="monospace"
                  fontWeight="500" fill={WHITE} opacity={0.7}
                  letterSpacing="0.05em">
                  {item.label}
                </text>
              </g>
            ))}
          </g>
        </svg>

        <AnimatePresence>
          {tooltip && <Tooltip nodeId={tooltip} />}
        </AnimatePresence>
      </div>

      {/* ── Model Confidence Bar ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
        <span style={{ fontSize: 10, color: DIM, letterSpacing: "0.14em", whiteSpace: "nowrap" }}>
          MODEL CONFIDENCE
        </span>
        <div style={{
          flex: 1, height: 4, borderRadius: 2,
          background: "rgba(129,140,248,0.15)",
        }}>
          <motion.div
            style={{
              height: 4, borderRadius: 2,
              background: `linear-gradient(90deg, ${INDIGO}, #c084fc)`,
            }}
            animate={{ width: `${confidence * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <motion.span
          style={{ fontSize: 11, color: INDIGO, minWidth: 38,
            fontFamily: "monospace", fontWeight: 700 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}>
          {(confidence * 100).toFixed(0)}%
        </motion.span>
      </div>
    </div>
  );
}