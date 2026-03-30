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
          end: "+=120%",
          scrub: true,
          pin: true,
          markers: true,
        },
      });

      // starts as medium frame, shrinks to small card on scroll
      tl.fromTo(
        ".center-img",
        { width: "72vw", height: "78vh", borderRadius: "20px" },
        { width: "380px", height: "480px", borderRadius: "20px", ease: "power3.out" },
        0
      );

      tl.fromTo(".img1", { x: -300, y: -150, opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: "power3.out" }, 0.2);
      tl.fromTo(".img2", { x: -400, y: 150,  opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: "power3.out" }, 0.3);
      tl.fromTo(".img4", { x: 300,  y: 150,  opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: "power3.out" }, 0.2);
      tl.fromTo(".img5", { x: 400,  y: -150, opacity: 0 }, { x: 0, y: 0, opacity: 1, ease: "power3.out" }, 0.3);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} id="hero" className="bg-white overflow-hidden h-screen relative">

      {/* CENTER IMAGE — wrapper div is what GSAP animates */}
      <div
        className="center-img"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "72vw",          // ← small frame on load
          height: "78vh",
          borderRadius: "20px",
          overflow: "hidden",     // ← clips the image to the rounded corners
          zIndex: 0,
        }}
      >
        <img
          src="./image3.jpg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="grid grid-cols-3 gap-0 mt-15 relative z-10">
        <div className="flex flex-col items-center gap-4">
          <img className="img1 ml-[280px] h-[360px] rounded-xl relative z-10" src="./image1.jpg" alt="" />
          <img className="img2 ml-[380px] h-[180px] rounded-xl relative z-10" src="./image2.jpg" alt="" />
        </div>
        <div></div>
        <div className="flex flex-col items-start gap-4 -translate-x-80">
          <img className="img5 ml-[300px] h-[180px] rounded-xl relative z-10" src="./image5.jpg" alt="" />
          <img className="img4 ml-[280px] h-[360px] rounded-xl relative z-10" src="./image4.jpg" alt="" />
        </div>
      </div>

    </div>
  );
};

export default Hero;