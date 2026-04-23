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
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <Html position={position} center distanceFactor={10}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-20 h-20 md:w-32 md:h-32 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
            <img
              src={icon}
              alt={name}
              className={`max-h-14 md:max-h-20 w-auto object-contain ${
                invert ? "brightness-200" : ""
              }`}
            />
          </div>

          <span className="mt-2 text-[10px] md:text-xs text-white font-bold uppercase opacity-70">
            {name}
          </span>
        </motion.div>
      </Html>
    </Float>
  );
}

export default function SkillsScene() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // 👉 IMPORTANT: reduce skills on mobile for performance
  const visibleSkills = isMobile ? skills.slice(0, 5) : skills;

  return (
    <section className="relative w-screen h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center px-4">

      {/* TITLE */}
      <div className="absolute top-16 w-full text-center z-10">
        <motion.p className="text-blue-500 text-[10px] md:text-xs uppercase tracking-widest">
          Technical Proficiency
        </motion.p>

        <motion.h2 className="text-4xl md:text-7xl font-black text-white">
          Tech <span className="text-blue-500">Stack</span>
        </motion.h2>
      </div>

      {/* 3D CANVAS */}
      <Canvas
        camera={{ position: [0, 0, 15], fov: isMobile ? 55 : 40 }}
        dpr={isMobile ? 1 : 2}          // 🔥 performance fix
        frameloop="demand"              // 🔥 reduces continuous render load
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />

        <group position={[0, -0.5, 0]}>
          {visibleSkills.map((skill, i) => {
            const total = visibleSkills.length;
            const angle = (i / total) * Math.PI * 2;
            const radius = isMobile ? 3 : 7;

            const x = Math.cos(angle) * radius;
            const y = (Math.random() - 0.5) * 1;
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
          autoRotateSpeed={isMobile ? 0.5 : 1}
          enablePan={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      {/* BACK TEXT */}
      <div className="absolute bottom-10 right-5 opacity-10 pointer-events-none">
        <h3 className="text-[20vw] font-bold text-white">EXPERTISE</h3>
      </div>
    </section>
  );
}