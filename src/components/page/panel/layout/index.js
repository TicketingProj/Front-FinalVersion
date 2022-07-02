import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
//services
import { GetSingleUser } from "../../../../services/account";
//redux
import { useDispatch, useSelector } from "react-redux";
//component
import Header from "./header";
import Navbar from "./navbar";
import { addAllData } from "../../../../slice/user";

function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const [isOpenNavber, setIsOpenNavber] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      getUser(localStorage.getItem("id"), localStorage.getItem("token"));
    } else {
      router.push("/");
    }
  }, []);

  const getUser = async (id, token) => {
    try {
      const response = await GetSingleUser(id, token);
      if (response.status === 200) {
        dispatch(addAllData({ ...response.data, token }));
        return;
      }
    } catch (error) {
      console.log(error);
    }
    router.push("/");
  };

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
        <Header
          isSavior={user.isSavior}
          name={user.fullName}
          avatar={user.avatar}
          navbarHandler={navbarHandler}
        />
        {children}
      </div>
    </div>
  );
}

export default Layout;
