import { motion } from "framer-motion";

interface SubjectAnimationProps {
  animation: 'physics' | 'maths' | 'chemistry' | 'biology';
}

export function SubjectAnimation({ animation }: SubjectAnimationProps) {
  if (animation === 'physics') {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 pointer-events-none">
        <svg viewBox="0 0 200 120" className="w-full h-full opacity-25 text-white">
          <circle cx="100" cy="60" r="7" fill="currentColor" />
          {[0, 60, 120].map((angle, i) => (
            <g key={i} style={{ transformOrigin: "100px 60px", transform: `rotate(${angle}deg)` }}>
              <ellipse cx="100" cy="60" rx="70" ry="22" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </g>
          ))}
          <motion.g
            style={{ transformOrigin: "100px 60px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="170" cy="60" r="5" fill="currentColor" />
          </motion.g>
          <motion.g
            style={{ transformOrigin: "100px 60px" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <g style={{ transform: "rotate(60deg)", transformOrigin: "100px 60px" }}>
              <circle cx="170" cy="60" r="4" fill="currentColor" />
            </g>
          </motion.g>
          <motion.g
            style={{ transformOrigin: "100px 60px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          >
            <g style={{ transform: "rotate(120deg)", transformOrigin: "100px 60px" }}>
              <circle cx="170" cy="60" r="3" fill="currentColor" />
            </g>
          </motion.g>
          {[
            { x: 20, y: 15 }, { x: 160, y: 10 }, { x: 180, y: 90 }, { x: 10, y: 95 },
            { x: 100, y: 5 }, { x: 40, y: 110 }, { x: 140, y: 105 },
          ].map((p, i) => (
            <motion.g key={i} animate={{ y: [0, -10, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}>
              <circle cx={p.x} cy={p.y} r="2" fill="currentColor" />
            </motion.g>
          ))}
        </svg>
      </div>
    );
  }

  if (animation === 'maths') {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-violet-900 to-purple-700 pointer-events-none flex items-center justify-center">
        <motion.svg
          viewBox="0 0 120 120"
          className="absolute w-36 h-36 opacity-20 text-white"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <polygon points="60,8 112,104 8,104" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="60" cy="64" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="28" y="28" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </motion.svg>

        <div className="absolute inset-0 flex items-center justify-center">
          {[
            { text: 'f(x)', x: '12%', y: '20%', delay: 0 },
            { text: 'dx',   x: '65%', y: '15%', delay: 0.5 },
            { text: 'Σ',    x: '80%', y: '60%', delay: 1.0 },
            { text: 'π',    x: '10%', y: '70%', delay: 1.5 },
            { text: '√x',   x: '50%', y: '80%', delay: 0.8 },
          ].map((item, i) => (
            <motion.span
              key={i}
              className="absolute text-white font-mono font-bold text-base select-none opacity-30"
              style={{ left: item.x, top: item.y }}
              animate={{ opacity: [0.15, 0.6, 0.15], y: [0, -8, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
            >
              {item.text}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  if (animation === 'chemistry') {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-700 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 200 120" className="w-full h-full text-white">
          <motion.g
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ opacity: 0.3 }}
          >
            <line x1="100" y1="55" x2="72" y2="80" stroke="currentColor" strokeWidth="3" />
            <line x1="100" y1="55" x2="128" y2="80" stroke="currentColor" strokeWidth="3" />
            <circle cx="100" cy="55" r="16" fill="currentColor" />
            <circle cx="72" cy="80" r="10" fill="currentColor" />
            <circle cx="128" cy="80" r="10" fill="currentColor" />
            <text x="95" y="60" fontSize="12" fill="white" style={{ fontFamily: "monospace" }}>O</text>
            <text x="67" y="85" fontSize="10" fill="white" style={{ fontFamily: "monospace" }}>H</text>
            <text x="123" y="85" fontSize="10" fill="white" style={{ fontFamily: "monospace" }}>H</text>
          </motion.g>

          {[
            { cx: 30, delay: 0.0, dur: 3.8, r: 4 },
            { cx: 55, delay: 0.5, dur: 4.5, r: 3 },
            { cx: 80, delay: 1.0, dur: 3.2, r: 5 },
            { cx: 140, delay: 0.3, dur: 5.0, r: 3 },
            { cx: 160, delay: 1.5, dur: 3.5, r: 4 },
            { cx: 175, delay: 0.8, dur: 4.2, r: 2 },
          ].map((b, i) => (
            <motion.g
              key={i}
              animate={{ y: [-140], opacity: [0, 0.4, 0] }}
              transition={{ duration: b.dur, repeat: Infinity, ease: "linear", delay: b.delay }}
            >
              <circle cx={b.cx} cy="130" r={b.r} fill="white" />
            </motion.g>
          ))}
        </svg>
      </div>
    );
  }

  if (animation === 'biology') {
    return (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-rose-900 to-pink-700 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 200 120" className="w-full h-full text-white opacity-30">
          <motion.g
            animate={{ scaleY: [1, -1, 1] }}
            style={{ transformOrigin: "100px 60px" }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M 30 60 Q 65 30 100 60 Q 135 90 170 60"
              fill="none" stroke="currentColor" strokeWidth="3"
            />
          </motion.g>
          <path
            d="M 30 60 Q 65 90 100 60 Q 135 30 170 60"
            fill="none" stroke="currentColor" strokeWidth="3"
          />

          {[45, 70, 100, 130, 155].map((x, i) => (
            <motion.g
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
            >
              <line x1={x} y1="45" x2={x} y2="75" stroke="currentColor" strokeWidth="2" />
              <circle cx={x} cy="44" r="3" fill="currentColor" />
              <circle cx={x} cy="76" r="3" fill="currentColor" />
            </motion.g>
          ))}

          <motion.g
            animate={{ scale: [1, 1.15, 1] }}
            style={{ transformOrigin: "165px 25px" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ellipse cx="165" cy="25" rx="14" ry="9" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="165" cy="25" r="5" fill="currentColor" />
          </motion.g>
        </svg>
      </div>
    );
  }

  return null;
}
