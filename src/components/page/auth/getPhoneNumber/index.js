import react, { useState } from "react";
//pic
import IranIcon from "./../../../../../public/assets/img/icons8-iran-48 (1).png";
//style
import Style from "./getPhoneNumber.module.css";

function GetPhoneNumber({ getCodeHandler }) {
  const [phoneNumber, setPhoneNumber] = useState();
  const [error, setError] = useState();

  const phoneNumberHandler = (e) => {
    if (e.target.value.length < 11) {
      setPhoneNumber(e.target.value);
    }
  };

  const onOpenVarificationHandler = () => {
    //check length of phone number
    if (phoneNumber.length < 10) {
      setError("please enter your phone number correctly");
    } else {
      //clear error
      setError();

      getCodeHandler("getSmsCode");
    }
  };

  console.log("phone number : ", phoneNumber);

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
          <button
            onClick={onOpenVarificationHandler}
            type="submit"
            className={Style.button}
          >
            get code
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetPhoneNumber;
