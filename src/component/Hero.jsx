import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const heroRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // 🔥 Set initial center position (NO Tailwind transform)
      gsap.set(".center-img", {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        zIndex: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=120%",
          scrub: true,
          pin: true,
          markers: true,
        },
      });

      // 🔥 CENTER IMAGE (FULL SCREEN → CENTER CARD)
      tl.fromTo(
        ".center-img",
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
        },
        {
          width: "380px",
          height: "480px",
          borderRadius: "20px",
          ease: "power3.out",
        },
        0
      );

      // 🔥 LEFT (diagonal)
      tl.fromTo(
        ".img1",
        { x: -300, y: -150, opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: "power3.out" },
        0.2
      );

      tl.fromTo(
        ".img2",
        { x: -400, y: 150, opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: "power3.out" },
        0.3
      );

      // 🔥 RIGHT (diagonal)
      tl.fromTo(
        ".img4",
        { x: 300, y: 150, opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: "power3.out" },
        0.2
      );

      tl.fromTo(
        ".img5",
        { x: 400, y: -150, opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: "power3.out" },
        0.3
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      id="hero"
      className="bg-white overflow-hidden h-screen relative"
    >

      {/* 🔥 CENTER IMAGE */}
      <img
        className="center-img object-cover"
        src="./image3.jpg"
        alt=""
      />

      <div className="grid grid-cols-3 gap-0 mt-15 relative z-10">

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

        {/* CENTER EMPTY SPACE */}
        <div></div>

        {/* RIGHT */}
        <div className="flex flex-col items-start gap-4 -translate-x-80">
          <img
            className="img5 ml-[300px] h-[180px] rounded-xl relative z-10"
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