import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section on scroll
      const sections = navLinks.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -300 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 ${
        scrolled ? "py-4 bg-black/40 backdrop-blur-xl border-b border-white/10" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO: Shruti Jadhav */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center font-black text-white group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            SJ
          </div>
          <h1 className="text-xl font-black text-white tracking-tighter uppercase">
            Shruti <span className="text-blue-500">J.</span>
          </h1>
        </motion.div>

        {/* DESKTOP LINKS: Floating Capsule Style */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-2xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </div>

        {/* MOBILE TOGGLE: Minimalist Icon */}
        <div className="md:hidden flex items-center">
          <button 
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.div 
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white rounded-full" 
            />
            <motion.div 
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-white rounded-full" 
            />
            <motion.div 
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-white rounded-full" 
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU: Full Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 5%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 5%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black text-white hover:text-blue-500 transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            
            {/* Social Links for Mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 flex gap-8 text-gray-500 font-mono text-xs tracking-widest"
            >
              <span>GITHUB</span>
              <span>LINKEDIN</span>
              <span>TWITTER</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}