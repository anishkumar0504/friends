import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const images = [
  "./image1.jpg",
  "./image2.jpg",
  "./image3.jpg",
  "./image4.jpg",
  "./image5.jpg",
];

const Hero = () => {
  const heroRef = useRef();
  const sliderRef = useRef();
  const dotsRef = useRef([]);

  // ── DESKTOP animation ──────────────────────────────────────────
  useEffect(() => {
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=120%",
          scrub: true,
          pin: true,
          markers: false,
        },
      });

      // center image shrinks
      tl.fromTo(
        ".center-img",
        { width: "72vw", height: "68vh", borderRadius: "20px" },
        { width: "380px", height: "460px", borderRadius: "20px", ease: "power3.out" },
        0
      );

      // title fades up
      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power3.out" },
        0.25
      );

      // side images fly in
      tl.fromTo(".img1", { x: -300, y: -150, opacity: 0 }, { x: 0, y: 0, opacity: 1 }, 0.2);
      tl.fromTo(".img2", { x: -400, y:  150, opacity: 0 }, { x: 0, y: 0, opacity: 1 }, 0.3);
      tl.fromTo(".img4", { x:  300, y:  150, opacity: 0 }, { x: 0, y: 0, opacity: 1 }, 0.2);
      tl.fromTo(".img5", { x:  400, y: -150, opacity: 0 }, { x: 0, y: 0, opacity: 1 }, 0.3);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ── MOBILE dot indicator ───────────────────────────────────────
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const slider = sliderRef.current;
    if (!slider) return;

    // animate cards in on load
    gsap.fromTo(
      ".mobile-card",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, stagger: 0.1, ease: "power3.out", duration: 0.6 }
    );

    // update dots on scroll
    const onScroll = () => {
      const index = Math.round(slider.scrollLeft / slider.offsetWidth);
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        dot.style.width = i === index ? "24px" : "8px";
        dot.style.background = i === index ? "#111" : "#ccc";
      });
    };

    slider.addEventListener("scroll", onScroll);
    return () => slider.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── DESKTOP ───────────────────────────────────────────── */}
      <div
        ref={heroRef}
        id="hero"
        className="hidden md:block bg-white overflow-hidden h-screen relative"
      >
        {/* Center image wrapper — GSAP animates this div */}
        <div
          className="center-img"
          style={{
            position: "absolute",
            top: "42%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "72vw",
            height: "68vh",
            borderRadius: "20px",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <img
            src="./image3.jpg"
            alt="hero"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Big title below image */}
        <div
          className="hero-title"
          style={{
            position: "absolute",
            bottom: "6%",
            width: "100%",
            textAlign: "center",
            zIndex: 10,
            opacity: 0,
          }}
        >
          <h1 className="text-7xl font-bold tracking-tight text-gray-900">
            Discover Your World
          </h1>
        </div>

        {/* Side images */}
        <div className="grid grid-cols-3 gap-0 mt-15 relative z-10">
          <div className="flex flex-col items-center gap-4">
            <img className="img1 ml-[280px] h-[360px] rounded-xl" src="./image1.jpg" alt="" />
            <img className="img2 ml-[380px] h-[180px] rounded-xl" src="./image2.jpg" alt="" />
          </div>
          <div />
          <div className="flex flex-col items-start gap-4 -translate-x-80">
            <img className="img5 ml-[300px] h-[180px] rounded-xl" src="./image5.jpg" alt="" />
            <img className="img4 ml-[280px] h-[360px] rounded-xl" src="./image4.jpg" alt="" />
          </div>
        </div>
      </div>

      {/* ── MOBILE ────────────────────────────────────────────── */}
      <div className="md:hidden bg-white min-h-screen flex flex-col justify-center items-center py-12">

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center px-6 mb-8 leading-tight">
          Discover<br />Your World
        </h1>

        {/* Swipeable cards */}
        <div
          ref={sliderRef}
          className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 px-8"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="mobile-card snap-center flex-shrink-0 rounded-3xl overflow-hidden shadow-xl"
              style={{ width: "78vw", height: "55vw", opacity: 0 }}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-6 items-center">
          {images.map((_, i) => (
            <div
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              style={{
                width: i === 0 ? "24px" : "8px",
                height: "8px",
                borderRadius: "9999px",
                background: i === 0 ? "#111" : "#ccc",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;