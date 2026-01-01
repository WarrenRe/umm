import { ummLogo } from "../assets/images";

export default function ContactPage() {
  return (
    <div className="w-full flex justify-center">
      {/* This height keeps everything visible on desktop without scrolling */}
      <div className="w-full max-w-5xl min-h-[calc(100vh-220px)] flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Logo (left on desktop, top on mobile) */}
          <div className="flex justify-center md:justify-end">
            <img
              src={ummLogo}
              alt="UMM"
              className="w-[220px] md:w-[260px] h-auto"
            />
          </div>

          {/* Text (right on desktop, below on mobile) */}
          <div className="max-w-md justify-self-center md:justify-self-start text-[12px] leading-6">
            <div className="text-[18px] font-bold mb-4">Contact Me.</div>

            <p className="mb-4">
              Got an idea? A collab in mind? Something half-formed but interesting?
              This is the place. I work across art, sound, narrative, and emerging tech.
            </p>

            <p className="mb-6">
              Some projects are polished, some are weird, all are intentional.
              If you’re reaching out with curiosity, support, or an opportunity, I’m listening.
            </p>

            <a
              href="https://instagram.com/urbanmasque.tv"
              target="_blank"
              rel="noreferrer"
              className="inline-block font-bold underline underline-offset-4"
            >
              instagram.com/urbanmasque.tv
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

