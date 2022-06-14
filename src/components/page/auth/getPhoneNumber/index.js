import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
//services
import { PostPhoneNumber } from "../../../../services/account";
//pic
import IranIcon from "./../../../../../public/assets/img/icons8-iran-48 (1).png";
//style
import Style from "./getPhoneNumber.module.css";

function GetPhoneNumber({ onVarificationHandler }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [error, setError] = useState();

  const phoneNumberHandler = (e) => {
    if (e.target.value.length < 11) {
      setPhoneNumber(e.target.value);
    }
  };

  const onOpenVarificationHandler = () => {
    //check length of phone number
    if (phoneNumber.length < 10) {
      setError("please enter your phone number currectly");
    } else {
      postPhoneNumberHandler();
    }
  };

  const postPhoneNumberHandler = async () => {
    setIsLoadingBtn(true);
    try {
      const response = await PostPhoneNumber(`0${phoneNumber}`);
      if (response.status === 200) {
        //send phone number successfully
        toast.success(response.data.message.message);
        setError(null);
        console.log("response  : ", response);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoadingBtn(false);
  };

  return (
    <div>
      <div className="w-fit flex flex-col items-center justify-center gap-y-5">
        <div className="self-start">
          <h1 className="text-3xl font-semibold">welcom!</h1>
          <p className="text-[#646464] text-lg">Login to your account </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center h-12 ">
            <div className="flex items-center justify-center gap-x-1 border-2 rounded-md px-1.5 h-12">
              <span className="text-sm font-semibold">+98</span>
              <img className="h-9 " src={IranIcon.src} />
            </div>
            <input
              className={`${Style.phoneNumber} h-full ${
                error ? "!border-red-600" : ""
              }`}
              type="number  "
              placeholder="phone number"
              onChange={phoneNumberHandler}
              value={phoneNumber}
            />
          </div>
          {error && (
            <span className="self-start text-red-600 font-semibold">
              {error}
            </span>
          )}
          {!isLoadingBtn ? (
            <button
              onClick={onOpenVarificationHandler}
              type="submit"
              className={Style.button}
            >
              Send Code
            </button>
          ) : (
            <div
              className={`min-w-[200px] min-h-[50px] flex flex-row justify-center items-center bg-[#515BE0] rounded-[10px] mt-5`}
            >
              <div
                style={{ borderTopColor: "transparent" }}
                className="w-6 h-6 border-2 border-white border-solid rounded-full animate-spin"
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetPhoneNumber;
