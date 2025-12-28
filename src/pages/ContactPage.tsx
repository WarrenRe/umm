import { ummLogo } from "../assets/images"; // or: import { logo as ummLogo } from "../assets/images";
import { useMediaQuery } from "../hooks/useMediaQuery";

export default function ContactPage() {
  const isDesktopOrTablet = useMediaQuery("(min-width: 768px)");

  const text = (
    <div className="border-2 border-black bg-white p-6">
      <h1 className="text-xl uppercase tracking-[0.2em] mb-4">Hit me up.</h1>
      <p className="leading-relaxed">
        Got an idea? A collab in mind? Something half-formed but interesting?
        <br />
        This is the place. I work across art, sound, narrative, and emerging tech.
        <br />
        Some projects are polished, some are weird, all are intentional.
        If you’re reaching out with curiosity, support, or an opportunity, I’m listening.
      </p>

      <div className="mt-6 uppercase tracking-[0.2em] text-sm">
        instagram
      </div>
    </div>
  );

  // MOBILE: stacked, still fits width, scroll allowed if needed
  if (!isDesktopOrTablet) {
    return (
      <div className="w-full space-y-6">
        <div className="border-2 border-black bg-white p-4">
          <img src={ummLogo} alt="UMM" className="w-full h-auto block" />
        </div>
        {text}
      </div>
    );
  }

  // DESKTOP/TABLET: split, no scroll, image left / text right
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6 items-center">
        <div className="border-2 border-black bg-white p-6 flex justify-start">
          <img
            src={ummLogo}
            alt="UMM"
            className="h-[220px] w-auto object-contain"
          />
        </div>

        <div className="flex justify-end">{text}</div>
      </div>
    </div>
  );
}
