import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
//pic
import FlowTicketImage from "./../../../../../../public/assets/img/light-logo.png";
//SVG
import { LibraryIcon } from "@heroicons/react/outline";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";

function Navbar({ navbarHandler }) {
  const [route, setRoute] = useState("");
  const router = useRouter();

  useEffect(() => {
    setRoute(router.asPath.split("/")[2]);
  }, []);

  return (
    <div className={`h-full w-full flex`}>
      <div className="bg-[#212529] h-full lg:w-full w-[250px] sm:w-[300px] flex flex-col">
        <button
          onClick={navbarHandler}
          className="block lg:hidden p-1 border-2 rounded-lg w-fit text-white duration-200 border-white mt-3 mr-3 ml-auto hover:bg-white hover:text-[#212529]"
        >
          <XIcon className="w-5" />
        </button>
        <img className="px-6 py-5" src={FlowTicketImage.src} />
        <div className="flex flex-col gap-y-10 h-full">
          <div className="flex flex-col">
            <button
              onClick={() => {
                router.push("/panel/dashboard");
                navbarHandler();
              }}
              className={`${
                route === "dashboard" ? "before:bg-[#515BE0] bg-[#424549]" : ""
              } before:w-0.5 before:h-full hover:before:bg-[#515BE0] flex items-center gap-x-2 hover:bg-[#424549] h-12 text-white duration-200`}
            >
              <LibraryIcon className="w-8" />
              <span className="">My Ticket</span>
            </button>
            <button
              onClick={() => {
                router.push("/panel/setting");
                navbarHandler();
              }}
              className={` ${
                route === "setting" ? "before:bg-[#515BE0] bg-[#424549]" : ""
              } before:w-0.5 before:h-full hover:before:bg-[#515BE0] flex items-center gap-x-2 hover:bg-[#424549] h-12 text-white duration-200`}
            >
              <AdjustmentsIcon className="w-8" />
              <span className="">Setting</span>
            </button>
          </div>
          <button className="mt-auto bg-red-700 hover:bg-red-900 duration-200 text-white h-14 m-5 rounded-md flex items-center justify-center gap-x-2.5">
            <LogoutIcon className="w-6" />
            logout
          </button>
        </div>
      </div>
      <div
        onClick={navbarHandler}
        className="flex-grow bg-black bg-opacity-75 lg:hidden block z-20"
      ></div>
    </div>
  );
}

export default Navbar;
