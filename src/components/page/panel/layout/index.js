import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
    const { token, id } = router.query;
    if (token === undefined || id === undefined) {
      console.log("come here");
      router.push("/");
    } else {
      getUser(id, token);
    }
  }, [user]);

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

  console.log("user :", user);

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div
        className={`col-span-12 lg:col-span-3 xl:col-span-2 fixed lg:static h-full z-20 w-full lg:w-fit
        ${isOpenNavber ? "left-0" : "-left-full"} duration-200 
        
      `}
      >
        <Navbar id={user.id} token={user.token} navbarHandler={navbarHandler} />
      </div>
      <div className="col-span-12 lg:col-span-9 xl:col-span-10 flex flex-col">
        <Header avatar={user.avatar} navbarHandler={navbarHandler} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
