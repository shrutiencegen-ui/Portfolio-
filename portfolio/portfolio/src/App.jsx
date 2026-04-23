import { useState } from "react"; // useState import kelay
import { motion, AnimatePresence } from "framer-motion";

// Components Imports
import Navbar from "./components/Navbar";
import CanvasScene from "./scenes/CanvasScene";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import PreLoader from "./components/PreLoader";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="bg-[#050505]">
      {/* 1. PreLoader Logic */}
      <AnimatePresence mode="wait">
        {loading ? (
          <PreLoader key="loader" onFinish={() => setLoading(false)} />
        ) : (
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="bg-[#050505] text-white relative"
          >
            {/* 2. Navigation */}
            <Navbar />

            {/* 3. HERO SECTION (With Robot Scene) */}
            <section className="relative w-full h-screen overflow-hidden">
              <div className="absolute inset-0 z-0">
                <CanvasScene />
              </div>
              <div className="relative z-10" id="hero">
                <Hero />
              </div>
            </section>

            {/* 4. ABOUT SECTION */}
            <section className="relative w-full min-h-screen bg-[#080808] z-20" id="about">
              <About />
            </section>

            {/* 5. SKILLS SECTION */}
            <section className="relative w-full min-h-screen bg-[#050505] z-20" id="skills">
              <Skills />
            </section>

            {/* 6. EXPERIENCE SECTION */}
            <section id="experience" className="relative w-full z-20">
              <Experience />
            </section>

            {/* 7. PROJECTS SECTION */}
            <section id="projects" className="relative w-full z-20">
              <Projects />
            </section>

            {/* 8. CONTACT SECTION */}
            <section id="contact" className="relative w-full z-20">
              <Contact />
            </section>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}