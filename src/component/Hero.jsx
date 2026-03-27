import React from "react";

const Hero = () => {
  return (
    <div className="bg-white">
      <div className="grid grid-cols-3 gap-0 mt-15">
        {/* LEFT */}
        <div className="flex flex-col items-center gap-4">
          <img
            className="ml-[280px] h-90 rounded-xl"
            src="./image1.jpg"
            alt="img1"
          />
          <img
            className="ml-[380px] h-45 rounded-xl"
            src="./image2.jpg"
            alt="img2"
          />
        </div>

        {/* CENTER */}
        <div className="flex justify-center mt-10">
          <img className="h-120 rounded-2xl" src="./image3.jpg" alt="img3" />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-start gap-4 -translate-x-80">
          {" "}
          <img
            className="ml-[280px] h-90 rounded-xl"
            src="./image4.jpg"
            alt="img4"
          />
          <img
            className="ml-[380px] h-45 rounded-xl -translate-x-25"
            src="./image5.jpg"
            alt="img5"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
