import React from "react";

const Hero = () => {
  return (
    <div className="bg-white ">
      <div>
        <div className="grid grid-cols-3 gap-4">
             {/* left  */}
          <div className="grid col-span-1">

            <div className="flex flex-col items-center gap-2.5">
              <img
                className="ml-[280px] h-90 rounded-xl mt-15"
                src="./image1.jpg"
                alt="img1"
              />
              <img
                className="ml-[380px] h-45 rounded-xl mt-2"
                src="./image2.jpg"
                alt="img1"
              />
            </div>
          </div>
             {/* Center — big single image */}
          <div className="grid col-span-2">
            <img
              className="flex mt-20 h-120 rounded-2xl ml-10"
              src="./image3.jpg"
            />
          </div>
          <div className="grid col-span-3">
                {/* right  */}
                
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
