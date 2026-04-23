import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SceneController() {
  useEffect(() => {
    const sections = gsap.utils.toArray(".scene");

    const ctx = gsap.context(() => {
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#container",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => `+=${document.querySelector("#container").offsetWidth}`
        }
      });
    });

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, []);

  return null;
}