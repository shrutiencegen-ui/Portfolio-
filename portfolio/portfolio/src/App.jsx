import { useState } from "react";
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
    <div className="bg-[#050505] min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <PreLoader key="loader" onFinish={() => setLoading(false)} />
        ) : (
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full"
          >
            <Navbar />

            {/* --- 1. HERO SECTION (Robot ithech rahil) --- */}
            <section 
              id="hero" 
              className="relative w-full h-screen overflow-hidden bg-transparent"
            >
              {/* Robot Scene - Background la */}
              <div className="absolute inset-0 z-0">
                <CanvasScene />
              </div>

              {/* Hero Text Content - Robot chya upar */}
              <div className="relative z-10 w-full h-full">
                <Hero />
              </div>
            </section>

            {/* --- 2. ABOUT SECTION (Solid Background mule robot hide hoil) --- */}
            <section 
              id="about" 
              className="relative w-full min-h-screen bg-[#050505] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.9)]"
            >
              <About />
            </section>

            {/* --- 3. SKILLS SECTION --- */}
            <section 
              id="skills" 
              className="relative w-full min-h-screen bg-[#050505] z-20"
            >
              <Skills />
            </section>

            {/* --- 4. EXPERIENCE SECTION --- */}
            <section 
              id="experience" 
              className="relative w-full bg-[#050505] z-20"
            >
              <Experience />
            </section>

            {/* --- 5. PROJECTS SECTION --- */}
            <section 
              id="projects" 
              className="relative w-full bg-[#050505] z-20"
            >
              <Projects />
            </section>

            {/* --- 6. CONTACT SECTION --- */}
            <section 
              id="contact" 
              className="relative w-full bg-[#050505] z-20"
            >
              <Contact />
            </section>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}