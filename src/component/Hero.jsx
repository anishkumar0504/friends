import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const heroRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          markers: true,
        },
      });

     // LEFT (from top-left)
tl.fromTo(
  ".img1",
  { x: -300, y: -150, opacity: 0 },
  { x: 0, y: 0, opacity: 1, ease: "power3.out" },
  0
);

tl.fromTo(
  ".img2",
  { x: -400, y: 150, opacity: 0 },
  { x: 0, y: 0, opacity: 1, ease: "power3.out" },
  0.1
);

// RIGHT (from top-right / bottom-right)
tl.fromTo(
  ".img4",
  { x: 300, y: 150, opacity: 0 },
  { x: 0, y: 0, opacity: 1, ease: "power3.out" },
  0
);

tl.fromTo(
  ".img5",
  { x: 400, y: -150, opacity: 0 },
  { x: 0, y: 0, opacity: 1, ease: "power3.out" },
  0.1
);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      id="hero"
      className="bg-white overflow-hidden h-screen"
    >
      <div className="grid grid-cols-3 gap-0 mt-15">

        {/* LEFT */}
        <div className="flex flex-col items-center gap-4">
          <img
            className="img1 ml-[280px] h-[360px] rounded-xl"
            src="./image1.jpg"
            alt=""
          />
          <img
            className="img2 ml-[380px] h-[180px] rounded-xl"
            src="./image2.jpg"
            alt=""
          />
        </div>

        {/* CENTER */}
        <div className="flex justify-center mt-10">
          <img
            className="h-[480px] rounded-2xl"
            src="./image3.jpg"
            alt=""
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-start gap-4 -translate-x-80">
          <img
className="img5 ml-[260px] h-[180px] rounded-xl"            src="./image5.jpg"
            alt=""
          />
          <img
            className="img4 ml-[280px] h-[360px] rounded-xl"
            src="./image4.jpg"
            alt=""
          />
        </div>

      </div>
    </div>
  );
};

export default Hero;