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
    <div class={`flex h-full w-full`}>
      <div className="bg-[#212529] h-full flex flex-col md:w-[300px] w-[500px]">
        <button
          onClick={navbarHandler}
          className="p-1 border-2 rounded-lg w-fit border-white mt-3 ml-3"
        >
          <XIcon className="w-5 text-white" />
        </button>
        <img class="px-6 py-5" src={FlowTicketImage.src} />
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
          <button class="bg-red-700 hover:bg-red-900 duration-200 text-white h-14 m-5 rounded-md flex items-center justify-center gap-x-2.5">
            <LogoutIcon className="w-6" />
            logout
          </button>
        </div>
      </div>
      <div
        onClick={navbarHandler}
        className="bg-black bg-opacity-75 md:hidden block w-full"
      ></div>
    </div>
  );
}

export default Navbar;
