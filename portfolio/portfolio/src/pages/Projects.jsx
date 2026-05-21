import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "Decentralized Web Identity Using Blockchain",
    subtitle: "Secure Identity System",
    desc: "A blockchain-powered decentralized identity management system with secure authentication and encrypted user verification.",
    tech: ["React", "Tailwind CSS", "Blockchain"],
    color: "#3b82f6",
    gradient: "from-blue-600/20 to-cyan-500/20",
    github: "https://github.com/yourgithub/blockchain-identity",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop"
  },

  {
    title: "Twitter Like Application",
    subtitle: "Social Media Platform",
    desc: "A modern Twitter-inspired social platform with post creation, likes, comments, authentication, and dynamic feeds.",
    tech: ["HTML", "CSS", "JavaScript", "Django"],
    color: "#10b981",
    gradient: "from-green-600/20 to-emerald-500/20",
    github: "https://github.com/yourgithub/twitter-clone",
    image:
      "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1200&auto=format&fit=crop"
  },

  {
    title: "GramVikas NGO",
    subtitle: "Social Impact Portal",
    desc: "Interactive NGO platform to showcase initiatives, activities, and track donor outreach.",
    tech: ["React", "CSS", "Framer Motion"],
    color: "#ef4444",
    gradient: "from-red-600/20 to-rose-500/20",
    github: "https://github.com/ShrutiJadhav14/rk_gvs",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop"
  },

  {
    title: "Sprint IT",
    subtitle: "Training Academy",
    desc: "A modern education portal for course enrollment and student performance tracking.",
    tech: ["React", "Tailwind", "Node.js"],
    color: "#8b5cf6",
    gradient: "from-purple-600/20 to-indigo-500/20",
    github: "https://github.com/ShrutiJadhav14/SprintIT",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
  },

  {
    title: "SJ Group",
    subtitle: "Construction Showcase",
    desc: "Professional construction corporate site featuring portfolio filters and high-resolution project galleries.",
    tech: ["React", "UI/UX", "Tailwind"],
    color: "#6366f1",
    gradient: "from-blue-700/20 to-indigo-600/20",
    github: "https://github.com/ShrutiJadhav14/SJGroup",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop"
  }
];

function ProjectCard({ project, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10deg", "-10deg"]
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10deg", "10deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative h-[560px] w-full rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 p-[1px] group"
    >
      <div
        style={{ transform: "translateZ(75px)" }}
        className="h-full w-full rounded-[2.5rem] bg-[#0c0c0c] overflow-hidden relative flex flex-col"
      >
        {/* Hover Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 flex flex-col justify-between flex-1">
          <div>
            {/* Top Section */}
            <div className="flex justify-between items-start mb-6">
              {/* Icon */}
              <div
                style={{ backgroundColor: project.color }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-black/50"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>

              {/* GitHub Button */}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>

            {/* Text */}
            <h3 className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em] mb-3">
              {project.subtitle}
            </h3>

            <h4 className="text-3xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h4>

            <p className="text-gray-400 mt-5 text-sm leading-relaxed font-light">
              {project.desc}
            </p>
          </div>

          {/* Footer */}
          <div className="space-y-6 mt-8">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="text-[9px] font-bold text-gray-300 border border-white/5 px-2.5 py-1 rounded-full bg-white/5 uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between group/footer">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-blue-600 group-hover:w-12 transition-all duration-500" />
                <span className="text-[10px] font-black uppercase text-white tracking-widest">
                  Case Study
                </span>
              </div>

              <span className="text-gray-600 font-mono text-xs">
                /0{index + 1}
              </span>
            </div>
          </div>
        </div>

        {/* Glow */}
        <div
          style={{ backgroundColor: project.color }}
          className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-all duration-700"
        />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="min-h-screen py-32 px-6 md:px-20 bg-[#050505] relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute top-20 left-0 w-full text-center pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[25vw] font-black leading-none text-white">
          WORKS
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-[1px] bg-blue-500" />

              <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.5em]">
                Case Studies
              </span>
            </motion.div>

            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
              Featured{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
                Work.
              </span>
            </h2>
          </div>

          <p className="text-gray-500 max-w-xs text-sm font-light">
            A collection of modern applications focusing on blockchain,
            performance, scalability, and premium user experiences.
          </p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}