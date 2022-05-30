import React, { useState, useEffect } from "react";
import axios from "axios";
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

const accessToken =
  "zvFNQ6ah25tXkUiv5mLGBF9jaM8U6KM4Ol2kvRvd26xNrhTlB77CBZe4sRr9eqi9";

const urlAPI = "http://optivas.ir/accounts/";

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Beare ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function Auth() {
  const [varificateStatus, setVarificationStatus] = useState("getPhoneNumber");

  useEffect(() => {
    postPhoneNumber();
  }, []);

  const postPhoneNumber = async () => {
    const resualt = await axios.post(`${urlAPI}`, {
      phoneNumber: "09925414279",
    });
    console.log(resualt);
  };

  const onVarificationHandler = (status) => {
    setVarificationStatus(status);
  };

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
