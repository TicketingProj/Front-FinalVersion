import React, { useState } from "react";
import Header from "./header";
import Navbar from "./navbar";
function Layout({ children }) {
  const [isOpenNavber, setIsOpenNavber] = useState(false);

  const navbarHandler = () => {
    setIsOpenNavber((prevState) => !prevState);
  };
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div
        className={`col-span-12 lg:col-span-3 xl:col-span-2 fixed lg:static h-full z-20 w-full lg:w-fit
        ${isOpenNavber ? "left-0" : "-left-full"} duration-200 
        
      `}
      >
        <Navbar navbarHandler={navbarHandler} />
      </div>
      <div className="col-span-12 lg:col-span-9 xl:col-span-10 flex flex-col">
        <Header navbarHandler={navbarHandler} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
