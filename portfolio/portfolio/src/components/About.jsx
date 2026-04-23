import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef(null);

  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-12 bg-[#050505] overflow-hidden flex items-center justify-center"
    >
      {/* BACKGROUND EFFECTS - Advanced Blur Nodes */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* LEFT SIDE: THE IMAGE (Visual Anchor) */}
        <motion.div
          style={{ y: yImage }}
          className="lg:col-span-5 relative group"
        >
          {/* Neon Border Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-[#111]">
            <motion.img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000"
              alt="Shruti Jadhav"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition duration-700 scale-110 group-hover:scale-100"
            />
            
            {/* Floating Info Tag */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute top-6 right-6 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl"
            >
              <p className="text-[10px] text-blue-400 font-mono tracking-tighter uppercase mb-1">Status</p>
              <p className="text-xs text-white font-bold tracking-widest italic">OPEN TO WORK</p>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE: THE CONTENT (Bento Style) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 space-y-10"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-blue-500" />
              <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.4em]">Biography</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
              BEYOND THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                PIXELS & CODE.
              </span>
            </h2>
          </motion.div>

          {/* Bio Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl"
          >
            I’m <span className="text-white font-bold">Shruti Jadhav</span>, a Full Stack Engineer who loves turning complex problems into 
            elegant, high-performance web applications. My approach blends <span className="text-blue-400">clean code</span> with 
            <span className="text-purple-400"> immersive design</span>.
          </motion.p>

          {/* BENTO STATS GRID */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {[
              { label: "Experience", val: "Intern", sub: "6+ Months", icon: "🚀" },
              { label: "Projects", val: "11+", sub: "Live Apps", icon: "✨" },
              { label: "Stack", val: "MERN", sub: "Python/Flask", icon: "⚡" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm"
              >
                <span className="text-xl mb-3 block">{stat.icon}</span>
                <h4 className="text-2xl font-black text-white">{stat.val}</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{stat.label}</p>
                <p className="text-[9px] text-blue-500/70 font-mono mt-2">{stat.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* ACTION BUTTONS */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-6 pt-4"
          >
            <motion.a
              href="/resume.pdf"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-black font-black uppercase text-[11px] rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all"
            >
              Download CV
            </motion.a>
             <a href="#contact">
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-4 text-white font-bold text-[11px] uppercase tracking-widest group"
              
            > 
              Let's Connect 
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
                →
              </span>

            </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}