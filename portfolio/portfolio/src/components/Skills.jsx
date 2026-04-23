import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const skills = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", invert: true },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Javascript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
];

function SkillIcon({ icon, position, name, invert }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* Dynamic size factor (6 on mobile, 8 on desktop) */}
      <Html position={position} center distanceFactor={8} className="md:distance-factor-10"> 
        <motion.div 
          whileHover={{ scale: 1.15 }}
          className="flex flex-col items-center group cursor-pointer"
        >
          {/* Card Size Normalized (w-24 h-24) */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 group-hover:border-blue-500/50 transition-all shadow-2xl">
            {/* Image Size Normalized (h-16 w-auto) */}
            <img 
              src={icon} 
              alt={name} 
              className={`max-h-16 w-auto md:max-h-20 object-contain drop-shadow-md ${invert ? 'brightness-200' : ''}`} 
            />
            {/* Contact Shadow Glow */}
            <div className="absolute inset-0 bg-blue-500/15 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <span className="mt-2 text-[10px] md:text-xs font-bold text-white uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-white/10 opacity-70 group-hover:opacity-100 transition-opacity">
            {name}
          </span>
        </motion.div>
      </Html>
    </Float>
  );
}

export default function SkillsScene() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Responsive logic to handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768; // Tailwind md: breakpoint

  return (
    <section className="relative w-screen h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center px-6">
      
      {/* Title Header */}
      <div className="absolute top-16 w-full text-center z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-blue-500 font-mono tracking-[0.3em] uppercase text-[10px] md:text-xs mb-1"
        >
          Technical Proficiency
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tighter"
        >
          Tech <span className="text-blue-500 underline decoration-blue-500/30">Stack.</span>
        </motion.h2>
      </div>

      {/* 3D Canvas Layer */}
      <Canvas camera={{ position: [0, 0, 15], fov: isMobile ? 50 : 40 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        <group position={[0, -0.5, 0]}>
          {skills.map((skill, i) => {
            // ANTI-CLOCKWISE ORBIT CALCULATIONS
            const totalSkills = skills.length;
            const angle = (i / totalSkills) * Math.PI * 2;
            
            // Dynamic radius based on viewport width
            const radius = isMobile ? 3.5 : 7.5; 

            // x: cos(angle), y: minor movement, z: sin(-angle) = anti-clockwise
            const x = Math.cos(angle) * radius;
            const y = (Math.random() - 0.5) * 1.5; // Slight organic y variance
            const z = Math.sin(-angle) * radius; 

            return (
              <SkillIcon 
                key={i} 
                icon={skill.icon} 
                name={skill.name} 
                position={[x, y, z]} 
                invert={skill.invert}
              />
            );
          })}
        </group>

        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={1.0} // Control the auto-rotation speed
          enablePan={false}
          // Clamp mouse rotation so they don't see "under" or "over" the scene
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* Decorative Text Overlay - Solves the "empty" complaint */}
      <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none select-none">
        <h3 className="text-[20vw] font-bold text-white leading-none">EXPERTISE</h3>
      </div>
    </section>
  );
}