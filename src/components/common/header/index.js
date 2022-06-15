import React, { useState } from "react";
import Link from "next/link";
//SVG
import { MenuIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";
//picture
import HeaderLogo from "../../../../public/assets/img/dark-logo.png";

function Header() {
  const [isShowNavbar, setIsShowNavbar] = useState(false);

  const onShowNavbarHandler = () => {
    setIsShowNavbar(!isShowNavbar);
  };

  return (
    <nav className="flex items-center justify-between px-7 sm:px-16 py-4 border-b">
      <Link href={"/"}>
        <a>
          <img
            className="w-48 sm:w-60 h-10"
            src={HeaderLogo.src}
            alt="header logo"
          />
        </a>
      </Link>
      <div className="hidden md:flex items-center">
        <Link href={"/auth"}>
          <a className="px-7 py-2 bg-blue-900 rounded-md text-lg  text-white hover:bg-white hover:text-blue-800 border border-blue-800 duration-300 relative left-2 ">
            Sign In
          </a>
        </Link>
      </div>
      <button onClick={onShowNavbarHandler} className="block md:hidden">
        <MenuIcon className="w-7 h-7" />
      </button>
      <div
        className={`${
          isShowNavbar ? "left-0" : "left-full"
        } p-4 fixed md:hidden w-full h-screen bg-white left-0 top-0 overflow-hidden flex flex-col items-center gap-y-2.5 z-50 duration-500`}
      >
        <button onClick={onShowNavbarHandler} className="self-end mb-5">
          <XIcon className="w-7 h-7" />
        </button>
        <Link href={"/auth"}>
          <a className="w-full sm:w-3/4 h-16 flex items-center justify-center bg-blue-900 rounded-2xl text-lg sm:text-xl  text-white hover:bg-white hover:text-blue-800 border border-blue-800 duration-300">
            Sign In
          </a>
        </Link>

        <img
          className="mt-8 w-60 h-10"
          src={HeaderLogo.src}
          alt="header logo"
        />
      </div>
    </nav>
  );
}

export default Header;
