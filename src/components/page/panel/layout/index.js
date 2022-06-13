import React, { useState } from "react";
import Header from "./header";
import Navbar from "./navbar";
function Layout({ children }) {
  const [isOpenNavber, setIsOpenNavber] = useState(false);
  const navbarHandler = () => {
    console.log("come here");
    setIsOpenNavber((prevState) => !prevState);
  };
  return (
    <div className="flex flex-col-reverse md:flex-row h-screen justify-end">
      <div className="relative">
        <div
          className={`h-full absolute md:relative z-10 ${
            isOpenNavber ? "w-full" : "w-0 md:w-full"
          } overflow-hidden duration-200`}
        >
          <Navbar navbarStatus={isOpenNavber} />
        </div>
        <div className="block md:hidden  overflow-y-auto">{children}</div>
      </div>
      <div className="w-full flex flex-col">
        <Header navbarHandler={navbarHandler} />
        <div className="md:block hidden overflow-y-auto h-full">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
