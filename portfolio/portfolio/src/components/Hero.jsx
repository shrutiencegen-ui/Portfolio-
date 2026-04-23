import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useEffect, useRef, useState } from "react";
import RobotModel from "../three/RobotModel";

export default function Hero() {

  const heroRef = useRef();

  // ✅ visibility control
  const [isVisible, setIsVisible] = useState(true);

  // ✅ responsive detection (FIXED)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const robotScale = useMemo(() => (isMobile ? 0.75 : 1), [isMobile]);

  // ✅ detect hero visibility (MAIN FIX)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100dvh] bg-[#050505] overflow-hidden flex flex-col justify-center"
    >
      
      {/* BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
        <h2 className="text-[25vw] font-black text-white leading-none tracking-tighter uppercase select-none">
          CODING
        </h2>
      </div>

      {/* 🤖 ROBOT (FIXED) */}
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full max-w-4xl h-[60vh] md:h-[80vh] opacity-80 md:opacity-100">
        
        <Canvas
          camera={{ position: [0, 0, 5], fov: 35 }}
          frameloop="always"
          dpr={[1, 1.5]}
          gl={{ preserveDrawingBuffer: true }}
        >
          <Suspense fallback={null}>
            
            {/* LIGHTS */}
            <ambientLight intensity={2} />
            <spotLight position={[10, 10, 10]} intensity={2} />
            <pointLight position={[-10, -10, -10]} intensity={1.5} />

            {/* ✅ SHOW ONLY WHEN HERO IS VISIBLE */}
            {isVisible && (
              <motion.group
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
                position={[0, -0.8, 0]}
              >
                <RobotModel scale={robotScale} />
              </motion.group>
            )}

          </Suspense>
        </Canvas>
      </div>

      {/* ✅ YOUR ORIGINAL CONTENT (UNCHANGED) */}
      <div className="relative z-20 w-full px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 items-center h-full pt-20 md:pt-0 gap-10 md:gap-0">
        
        {/* LEFT */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-start space-y-4 text-center md:text-left"
        >
          <div className="inline-block px-3 py-1 border border-blue-500/30 rounded-full bg-blue-500/5">
            <span className="text-blue-500 font-mono text-[10px] uppercase tracking-widest font-bold">
              Full Stack Developer 
            </span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter">
            SHRUTI <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
              JADHAV.
            </span>
          </h1>
          
          <p className="text-gray-400 text-sm md:text-lg max-w-xs leading-relaxed font-light">
            Full Stack Developer specializing in 
            <span className="text-white font-medium"> React, Node.js, Express.js, Django, Flask</span> & interactive 3D experiences.
          </p>

          <a href="#projects">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black font-black uppercase text-[10px] rounded-full"
            >
              My Projects
            </motion.button>
          </a>
        </motion.div>

        {/* MIDDLE */}
        <div className="hidden md:block" />

        {/* RIGHT */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col items-center md:items-end space-y-12"
        >
          <div className="text-center md:text-right group">
            <h3 className="text-5xl md:text-7xl font-black text-white group-hover:text-blue-500 transition">
              6+
            </h3>
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
              Months Intern
            </p>
          </div>
          
          <div className="text-center md:text-right group">
            <h3 className="text-5xl md:text-7xl font-black text-white group-hover:text-purple-500 transition">
              11+
            </h3>
            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
              Real Projects
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}