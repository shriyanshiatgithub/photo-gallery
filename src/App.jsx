import Gallery from "./components/Gallery";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* decorative chrome shapes (purely visual) */}
      <div
        aria-hidden="true"
        className="chrome-ring pointer-events-none fixed -right-32 -top-24 h-[28rem] w-[28rem] rotate-12 opacity-80"
      />
      <div
        aria-hidden="true"
        className="chrome-ring pointer-events-none fixed -bottom-32 -left-24 h-80 w-80 -rotate-12 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/3 top-1/4 h-72 w-72 rounded-full bg-lavender-deep/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-14 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-lavender/70">
            Celebrate every moment
          </p>
          <h1 className="mt-4 font-display text-6xl font-bold leading-none tracking-tight sm:text-8xl">
            <span className="chrome-text">Photo</span>{" "}
            <span className="italic text-lavender-deep">Gallery</span>
          </h1>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-lavender to-transparent" />
        </header>

        <main>
          <Gallery />
        </main>
      </div>
    </div>
  );
}