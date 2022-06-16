import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import { ToastContainer } from "react-toastify";
//component
import SmsVarification from "../../components/page/auth/smsVarification";
import GetPhoneNumber from "../../components/page/auth/getPhoneNumber";
import Registration from "../../components/page/auth/registration";
//pic
import SiteLogo from "./../../../public/assets/img/dark-logo.png";
//style
import "react-toastify/dist/ReactToastify.css";

function Auth() {
  const router = useRouter();
  const [varificateStatus, setVarificationStatus] = useState("getPhoneNumber");

  const onVarificationHandler = (target) => {
    setVarificationStatus(target);
  };

  useEffect(() => {
    //check localStorage to go to Dashboard if have localStorage
    if (localStorage.getItem("token") !== null) {
      router.push(
        `panel/dashboard?token=${localStorage.getItem("token")}&id=${
          localStorage.id
        }`
      );
    }
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-between w-full">
        <div className="px-5 py-4 border-b  w-full">
          <Link href="/">
            <a className="w-fit">
              <img className="w-48 sm:w-60 h-10" src={SiteLogo.src} />
            </a>
          </Link>
        </div>

        {varificateStatus === "getPhoneNumber" ? (
          <GetPhoneNumber onVarificationHandler={onVarificationHandler} />
        ) : varificateStatus === "getSmsCode" ? (
          <SmsVarification onVarificationHandler={onVarificationHandler} />
        ) : (
          <Registration />
        )}
        <div className="w-full bg-[#F3F3F3] px-5 py-4 border-t text-gray-500 text-sm">
          <span> © 2022 Fowtickets - All rights reserved</span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Auth;
