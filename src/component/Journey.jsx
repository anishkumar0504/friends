import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const polaroids = [
  { src: "./image1.jpg", caption: "First day chaos 🎒", rotate: -8  },
  { src: "./image2.jpg", caption: "Lab nights 💻",      rotate:  5  },
  { src: "./image3.jpg", caption: "Canteen crew 🍕",    rotate: -4  },
  { src: "./image4.jpg", caption: "Sem results 😅",     rotate:  9  },
  { src: "./image5.jpg", caption: "Final year 🎓",      rotate: -6  },
];

const timeline = [
  "2024 — Strangers became friends",
  "2024 — Friends became family",
  "2025 — Family got chaotic ",
  "2026 — Forever grateful ",
];

const Journey = () => {
  const sectionRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // title slides up
      tl.fromTo(
        ".journey-title",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out", duration: 0.6 },
        0
      );

      // desc fades up
      tl.fromTo(
        ".journey-desc",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out", duration: 0.5 },
        0.2
      );

      // polaroids fly up one by one
      polaroids.forEach((p, i) => {
        tl.fromTo(
          `.polaroid-${i}`,
          { y: 300, opacity: 0, rotation: 0 },
          {
            y: i * 7,
            x: i * 4,
            opacity: 1,
            rotation: p.rotate,
            ease: "power4.out",
            duration: 0.6,
          },
          0.1 + i * 0.15
        );
      });

      // timeline items stagger in after polaroids
      tl.fromTo(
        ".timeline-item",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out", duration: 0.4, stagger: 0.1 },
        0.9
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#f5f0e8] flex flex-col md:flex-row items-center justify-center px-8 md:px-20 py-24 gap-16 overflow-hidden"
    >

      {/* ── LEFT — Title + description only ───────────────── */}
      <div className="flex-1 max-w-sm flex flex-col gap-6">

        <p
          className="journey-desc text-xs uppercase tracking-[0.3em] text-gray-400 font-medium"
          style={{ opacity: 0 }}
        >
          four years · one story
        </p>

        <h2
          className="journey-title leading-none text-gray-900"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
            fontWeight: 900,
            letterSpacing: "-2px",
            opacity: 0,
          }}
        >
          our<br />
          <em style={{ fontWeight: 400 }}>btech</em><br />
          journey
        </h2>

        <p
          className="journey-desc text-gray-500 text-sm leading-relaxed max-w-xs"
          style={{ opacity: 0 }}
        >
          Some bonds don't need WiFi to stay connected. We survived deadlines,
          shared tiffins, failed vivas, and somehow came out as each other's
          forever people. Not just classmates — brothers for life. 🫂
        </p>

      </div>

      {/* ── RIGHT — Polaroids + timeline below ────────────── */}
      <div className="flex-1 flex flex-col items-center gap-10">

        {/* Polaroid stack */}
        <div style={{ position: "relative", width: "260px", height: "320px" }}>
          {polaroids.map((p, i) => (
            <div
              key={i}
              className={`polaroid-${i}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "240px",
                background: "#fff",
                padding: "12px 12px 40px 12px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                zIndex: i,
                transformOrigin: "center center",
                opacity: 0,
              }}
            >
              <img
                src={p.src}
                alt={p.caption}
                style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
              />
              <p style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "13px",
                color: "#555",
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
              }}>
                {p.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline — sits right below the stack */}
        <div className="flex flex-col gap-2 w-[240px]">
          {timeline.map((t, i) => (
            <div
              key={i}
              className="timeline-item flex items-center gap-3 text-xs text-gray-500"
              style={{ opacity: 0 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
              {t}
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default Journey;