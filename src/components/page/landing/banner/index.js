import React from "react";
import Link from "next/link";

//style
import Style from "./banner.module.css";

function Banner() {
  return (
    <div>
      <div className="bg-[#515BE0] flex items-center flex-col justify-center pb-8 px-5">
        <h1 className={Style.banner_title}>How We Can Help You?</h1>
        <p className={Style.banner_detail}>
          Start search to find what you are looking for, if you can't find
          something related <br /> to your problem you can get in touch with us{" "}
        </p>

        <Link href={"/auth"}>
          <a className="px-10 sm:px-16 py-3 sm:py-4 bg-blue-900  text-white rounded-md text-base sm:text-xl sm:font-semibold hover:bg-blue-800 duration-200">
            Get Start
          </a>
        </Link>
      </div>

      <svg
        className={Style.BackgroundWave}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#515BE0"
          fill-opacity="1"
          d="M0,32L48,48C96,64,192,96,288,96C384,96,480,64,576,80C672,96,768,160,864,154.7C960,149,1056,75,1152,53.3C1248,32,1344,64,1392,80L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}

export default Banner;
