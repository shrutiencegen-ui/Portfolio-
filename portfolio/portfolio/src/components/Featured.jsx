export default function Featured() {
  return (
    <section className="py-20 px-6">

      <h2 className="text-4xl font-bold mb-10 text-center">
        Featured Project
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h3 className="text-2xl font-semibold mb-4">Pramay Agro</h3>

          <p className="text-gray-400 mb-4">
            Full-stack e-commerce platform with authentication, cart system, and product management.
          </p>

          <ul className="text-gray-400 space-y-2 mb-4">
            <li>✔ User authentication & authorization</li>
            <li>✔ Shopping cart & order system</li>
            <li>✔ Admin product management</li>
          </ul>

          <div className="flex gap-4">
            <a href="#" className="text-cyan-400">Live</a>
            <a href="#" className="text-purple-400">GitHub</a>
          </div>
        </div>

        <div className="bg-white/5 h-64 rounded-xl flex items-center justify-center">
          Screenshot
        </div>

      </div>

    </section>
  );
}