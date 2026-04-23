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
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // scroll background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // active section
  useEffect(() => {
    const sections = navLinks.map(link =>
      document.getElementById(link.href.substring(1))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => section && observer.observe(section));

    return () => {
      sections.forEach(section => section && observer.unobserve(section));
    };
  }, []);

  // lock scroll
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
  }, [mobileMenuOpen]);

  // resize close
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);

    setTimeout(() => {
      const section = document.getElementById(href.substring(1));
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 px-4 sm:px-6 md:px-12 ${
          scrolled
            ? "py-3 bg-black/50 backdrop-blur-xl border-b border-white/10"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-black">
              SJ
            </div>
            <h1 className="text-lg font-black text-white uppercase">
              Shruti <span className="text-blue-500">J.</span>
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 text-xs uppercase ${
                    isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center z-[110]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <div className="flex flex-col gap-1.5 pointer-events-none">
              <span className="w-6 h-0.5 bg-white" />
              <span className="w-6 h-0.5 bg-white" />
              <span className="w-6 h-0.5 bg-white" />
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-[100dvh] bg-black z-[999] relative flex flex-col items-center justify-center gap-10 overflow-y-auto"
          >

            {/* ❌ CLOSE ICON - LEFT SIDE */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 text-white text-4xl font-bold"
            >
              &times;
            </button>

            {/* MENU ITEMS */}
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-3xl font-black text-white uppercase"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}