import { useState } from "react";
import Link from "next/dist/client/link";
//style
import Style from "./header.module.css";
//ico
import FlowTicketIcon from "./../../../../../../public/assets/ico/favicon.ico";
//pic
import defaultImage from "./../../../../../../public/assets/img/user.png";
//SVG
import { BellIcon } from "@heroicons/react/outline";
import { MenuIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/outline";

function Header({ navbarHandler }) {
  const [isOpenSearchField, setIsOpenSearchFeild] = useState(false);

  return (
    <div class="shadow-md w-full py-2.5 px-7">
      <div
        className={`flex flex-col md:flex-row-reverse items-center justify-between gap-y-2.5 overflow-y-hidden duration-500 md:h-fit ${
          isOpenSearchField ? "h-[90px]" : "h-[45px]"
        }`}
      >
        <div className="flex flex-row-reverse items-center justify-between gap-x-5 w-full md:w-fit">
          <div className="flex flex-row-reverse items-center gap-x-5">
            <button className="bg-gray-300 text-white rounded-full w-10 h-10">
              <img src={defaultImage.src} />
            </button>
            <button className="w-6">
              <BellIcon />
            </button>
            <button
              onClick={() => {
                setIsOpenSearchFeild((prevState) => !prevState);
              }}
              className="w-6  md:hidden block"
            >
              <SearchIcon />
            </button>
          </div>
          <div className="flex items-center">
            <button
              onClick={navbarHandler}
              className="w-8 md:hidden block mx-2"
            >
              <MenuIcon />
            </button>
            <Link href={"/"}>
              <a className="w-7 md:hidden">
                <img src={FlowTicketIcon.src} />
              </a>
            </Link>
          </div>
        </div>
        <input
          className="bg-[#f5f4f4] w-full md:w-3/4 py-1.5 px-2 rounded-md outline-none text-gray-600"
          placeholder="Type to search..."
        />
      </div>
    </div>
  );
}
export default Header;
