import { ummLogo } from "../assets/images";

export default function ContactPage() {
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-5xl px-6">
        {/* No borders, no shadows here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: logo */}
          <div className="flex justify-center md:justify-end">
            <img
              src={ummLogo}
              alt="Urban Masque Media"
              className="w-[200px] md:w-[220px] h-auto block"
            />
          </div>

          {/* Right: text */}
          <div className="max-w-md text-left">
            <h1 className="text-[20px] font-bold mb-4">Contact Me.</h1>

            <p className="text-[12px] leading-relaxed opacity-90">
              Got an idea? A collab in mind? Something half-formed but interesting?
              This is the place. I work across art, sound, narrative, and emerging tech.
            </p>

            <p className="text-[12px] leading-relaxed opacity-90 mt-4">
              Some projects are polished, some are weird, all are intentional.
              If you’re reaching out with curiosity, support, or an opportunity, I’m listening.
            </p>

            <a
              href="https://instagram.com/urbanmasque.tv"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 text-[12px] underline underline-offset-4 hover:opacity-70"
            >
              instagram.com/urbanmasque.tv
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
