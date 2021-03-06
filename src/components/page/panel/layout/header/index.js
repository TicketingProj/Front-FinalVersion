import { useState } from "react";
import Link from "next/dist/client/link";
//style
import Style from "./header.module.css";
//ico
import FlowTicketIcon from "./../../../../../../public/assets/ico/favicon.ico";
//pic
import defaultImage from "./../../../../../../public/assets/img/user.png";
//SVG
import { MenuIcon } from "@heroicons/react/outline";

function Header({ isSavior, name, avatar, navbarHandler }) {
  const [isOpenSearchField, setIsOpenSearchFeild] = useState(false);

  return (
    <div className="shadow-lg w-full py-2.5 px-7">
      <div
        className={`flex flex-col lg:flex-row-reverse items-center justify-between gap-y-2.5 overflow-y-hidden duration-500 lg:h-fit ${
          isOpenSearchField ? "h-[90px]" : "h-[45px]"
        }`}
      >
        <div className="flex flex-row-reverse items-center justify-between gap-x-5 w-full lg:w-fit">
          <div className="flex flex-row-reverse items-center gap-x-5">
            <button className="bg-gray-300 text-white rounded-full w-10 h-10">
              <img
                className="w-full h-full object-cover rounded-full"
                src={avatar ? avatar : defaultImage.src}
              />
            </button>
            <div>
              <span className="font-semibold">{name}</span>
              {isSavior && (
                <span className="text-sm text-gray-500"> (admin) </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={navbarHandler}
              className="w-8 lg:hidden block mx-2"
            >
              <MenuIcon />
            </button>
            <Link href={"/"}>
              <a className="w-7 lg:hidden">
                <img src={FlowTicketIcon.src} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
