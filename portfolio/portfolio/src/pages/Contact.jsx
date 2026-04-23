import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // EmailJS Integration
    // Replace these IDs with your actual EmailJS credentials
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,  
        import.meta.env.VITE_TEMPLATE_ID,
        formRef.current, 
        import.meta.env.VITE_PUBLIC_KEY 
        
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Message sent successfully! 🚀", {
            style: { background: "#111", color: "#fff", borderRadius: "15px", border: "1px solid #333" },
          });
          formRef.current.reset();
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <section id="contact" className="min-h-screen py-24 px-6 md:px-12 bg-[#050505] relative overflow-hidden flex items-center justify-center">
      <Toaster position="bottom-right" />
      
      {/* BACKGROUND PREMIUM ANIMATION */}
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full animate-pulse" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* LEFT SIDE: THE PITCH */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col justify-center space-y-12"
        >
          <div>
            <motion.div initial={{ x: -20 }} whileInView={{ x: 0 }} className="flex items-center gap-3 mb-6">
              <span className="w-10 h-[1px] bg-blue-500" />
              <span className="text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em]">Available for projects</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
              LET'S <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                CREATE.
              </span>
            </h2>
            <p className="text-gray-400 text-lg mt-8 max-w-sm leading-relaxed font-light">
              Hya portfolio sathi me modern tech vaprlay. Tumchya ideas la reality madhe convert karnyachi vel aali aahe.
            </p>
          </div>

          {/* CONTACT PILLS */}
          <div className="space-y-6">
            {[
              { label: "Email", value: "shruti.jadhav1411@gmail.com", icon: "📧" },
              { label: "Location", value: "Pune, Maharashtra", icon: "📍" }
            ].map((info, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 p-4 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-xl">
                  {info.icon}
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">{info.label}</p>
                  <p className="text-white font-medium">{info.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

    
{/* SOCIAL LINKS */}
<div className="flex gap-6 mt-12">
  {[
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shruti-jadhav-116b41216/' },
    { name: 'GitHub', url: 'https://github.com/ShrutiJadhav14' }
  ].map((social) => (
    <motion.a
      key={social.name}
      href={social.url}
      target="_blank" 
      rel="noreferrer"
      whileHover={{ y: -5, opacity: 1 }}
      initial={{ opacity: 0.6 }}
      className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2 transition-all group"
    >
      <span className="group-hover:text-blue-500 transition-colors">{social.name}</span>
      <span className="text-blue-500 font-light opacity-50 group-hover:translate-x-1 transition-transform inline-block">
        ↗
      </span>
    </motion.a>
  ))}
</div>
        </motion.div>

        {/* RIGHT SIDE: THE GLASS FORM */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-7 relative"
        >
          {/* Decorative Glowing Edge */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[3rem] blur opacity-10" />
          
          <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl backdrop-blur-3xl">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Your Name</label>
                  <input 
                    required
                    name="user_name"
                    type="text" 
                    placeholder="Enter name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-8 text-white outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Email Address</label>
                  <input 
                    required
                    name="user_email"
                    type="email" 
                    placeholder="example@dev.com" 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 px-8 text-white outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Message</label>
                <textarea 
                  required
                  name="message"
                  rows="4" 
                  placeholder="Tell me about your project..." 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-3xl py-5 px-8 text-white outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all resize-none"
                ></textarea>
              </div>

              <motion.button 
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-6 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Deploy Message"}
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}