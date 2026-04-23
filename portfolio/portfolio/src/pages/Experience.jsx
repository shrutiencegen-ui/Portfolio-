import { motion } from "framer-motion";

const experiences = [
  {
    company: "Encegen AI Labs",
    location: "Wagholi",
    role: "Full Stack Developer",
    duration: "Present",
    description: "Developing end-to-end web applications, integrating AI features, and optimizing backend systems for scalability.",
    color: "from-blue-600 to-cyan-500"
  },
  {
    company: "Litecode Software Pvt Ltd",
    location: "Remote/Office",
    role: "Web Development Intern",
    duration: "2 Months",
    description: "Worked on frontend components, fixed UI bugs, and learned the software development life cycle (SDLC).",
    color: "from-purple-600 to-pink-500"
  }
];

export default function Experience() {
  return (
    <section className="min-h-screen py-24 px-6 md:px-20 bg-[#050505] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
          My <span className="text-blue-500">Journey.</span>
        </h2>
        <p className="text-gray-500 mt-4 font-mono uppercase tracking-widest text-sm">Professional Experience</p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* The Vertical Line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-20" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`relative mb-16 flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-black z-10 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />

            {/* Content Card */}
            <div className="w-full md:w-[45%] ml-8 md:ml-0">
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Gradient Top Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${exp.color}`} />
                
                <span className="text-blue-400 font-mono text-sm">{exp.duration}</span>
                <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">
                  {exp.company}
                </h3>
                <p className="text-lg font-semibold text-gray-300 mb-4">{exp.role}</p>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                <div className="flex items-center text-xs text-gray-500 font-bold uppercase tracking-tighter">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {exp.location}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}