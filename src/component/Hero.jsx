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

      // 🔥 CENTER IMAGE (big → normal, behind everything)
      tl.fromTo(
        ".center-img",
        {
          scale: 1.8,
          opacity: 0,
          filter: "blur(20px)",
        },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power3.out",
        },
        0
      );

      // 🔥 LEFT (diagonal)
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

      // 🔥 RIGHT (diagonal)
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
            className="img1 ml-[280px] h-[360px] rounded-xl relative z-10"
            src="./image1.jpg"
            alt=""
          />
          <img
            className="img2 ml-[380px] h-[180px] rounded-xl relative z-10"
            src="./image2.jpg"
            alt=""
          />
        </div>

        {/* CENTER */}
        <div className="flex justify-center mt-10">
          <img
            className="center-img h-[480px] rounded-2xl relative z-0"
            src="./image3.jpg"
            alt=""
          />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-start gap-4 -translate-x-80">
          <img
            className="img5 ml-[260px] h-[180px] rounded-xl relative z-10"
            src="./image5.jpg"
            alt=""
          />
          <img
            className="img4 ml-[280px] h-[360px] rounded-xl relative z-10"
            src="./image4.jpg"
            alt=""
          />
        </div>

      </div>
    </div>
  );
};

export default Hero;