import CanvasScene from "../three/CanvasScene";

export default function HeroScene() {
  return (
    <section className="scene w-screen h-screen flex items-center justify-between px-10">

      {/* LEFT TEXT */}
      <div className="w-1/2">
        <h1 className="text-5xl font-bold">
          Your Name
        </h1>

        <p className="text-gray-400 mt-4">
          Full Stack Developer crafting modern web experiences
        </p>
      </div>

      {/* RIGHT ROBOT */}
      <div className="w-1/2 h-[500px]">
        <CanvasScene />
      </div>

    </section>
  );
}