import { ummLogo } from "../assets/images";

export default function ContactPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-5xl px-4">
        {/* On desktop/tablet: 2 columns. On mobile: stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: logo */}
          <div className="flex justify-center md:justify-end">
            <img
              src={ummLogo}
              alt="Urban Masque Media"
              className="w-[220px] h-auto"
            />
          </div>

          {/* Right: text */}
          <div className="md:justify-self-start text-left max-w-md">
            <h1 className="text-[20px] font-bold mb-3">Contact Me.</h1>

            <p className="text-[12px] leading-relaxed opacity-90">
              Got an idea? A collab in mind? Something half-formed but
              interesting? This is the place. I work across art, sound,
              narrative, and emerging tech.
            </p>

            <p className="text-[12px] leading-relaxed opacity-90 mt-4">
              Some projects are polished, some are weird, all are intentional.
              If you’re reaching out with curiosity, support, or an opportunity,
              I’m listening.
            </p>

            <a
              href="https://instagram.com/urbanmasque.tv"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 text-[12px] underline underline-offset-4"
            >
              instagram.com/urbanmasque.tv
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
