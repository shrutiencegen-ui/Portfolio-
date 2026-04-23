export default function AboutScene() {
  return (
    <section className="scene w-screen h-screen flex items-center justify-center gap-10 px-10">

      <div className="w-1/2 text-gray-400">
        <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
        I build scalable full stack applications using modern technologies.
      </div>

      <div className="w-1/2">
        <div className="bg-white/5 h-[400px] rounded-2xl backdrop-blur-xl flex items-center justify-center">
          Robot moves here →
        </div>
      </div>

    </section>
  );
}