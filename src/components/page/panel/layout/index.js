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
        className={`col-span-3 md:static z-20 absolute ${
          isOpenNavber ? "left-0 h-screen w-screen" : "-left-[100%]"
        } duration-200`}
      >
        <Navbar navbarHandler={navbarHandler} />
      </div>
      <div className="col-span-12 md:col-span-9 flex flex-col">
        <Header navbarHandler={navbarHandler} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
