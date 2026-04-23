import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PreLoader({ onFinish }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // HTML varcha initial loader kadhun takne
    const loader = document.getElementById("initial-loader");
    if (loader) loader.style.display = "none";

    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);
    
    setTimeout(onFinish, 3000);
    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 1, ease: [0.19, 1, 0.22, 1] } 
      }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
    >
      <div className="relative overflow-hidden px-10">
        {/* Main Text with Mask Reveal */}
        <motion.h1 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white text-xl md:text-2xl font-light tracking-[0.4em] uppercase text-center"
        >
          Shruti Jadhav <span className="text-gray-600">/</span> Portfolio
        </motion.h1>
        
        {/* Subtle Line Loader */}
        <div className="mt-8 w-[200px] h-[1px] bg-white/5 relative mx-auto">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            className="absolute top-0 left-0 h-full bg-blue-600"
          />
        </div>

        {/* Counter */}
        <motion.p 
          className="mt-4 text-white/20 font-mono text-[10px] tracking-widest text-center"
        >
          {percent}% LOADING
        </motion.p>
      </div>

      {/* Aesthetic Background - Very subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
    </motion.div>
  );
}