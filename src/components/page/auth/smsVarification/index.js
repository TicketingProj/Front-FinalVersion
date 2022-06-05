import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
//services
import { SmsVarificationOtp } from "../../../../services/account";

function SmsVarification({ phoneNumber, onVarificationHandler }) {
  const inputRef = useRef();
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(120);

  const [dataSchema, setDataSchema] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
  });

  useEffect(() => {
    if (timer > 0) {
      const timerHandler = setTimeout(() => {
        setTimer((prevState) => prevState - 1);
      }, [1000]);
      return () => {
        clearTimeout(timerHandler);
      };
    } else {
      onGetPhoneNumberHandler();
    }
  }, [timer]);

  const schemaHandler = (e) => {
    const ElmentsLength = [...inputRef.current.childNodes].length;
    let currentElementIndex = 0;

    if (e.target.value.length <= 1) {
      setDataSchema({
        ...dataSchema,
        [e.target.name]: e.target.value,
      });
    }

    //find current input in list
    [...inputRef.current.childNodes].map((items, index) => {
      if (items.name === e.target.name) {
        currentElementIndex = index;
      }
    });

    //if length of value of target = 1 , go to to next input if exist
    if (e.target.value.length >= 1) {
      if (currentElementIndex < ElmentsLength - 1) {
        inputRef.current.childNodes[currentElementIndex + 1].focus();
      }
    }
    //if length of value of target = 1 , go to to before input if exist
    else if (e.target.value.length === 0) {
      if (currentElementIndex > 0) {
        inputRef.current.childNodes[currentElementIndex - 1].focus();
      }
    }
  };

  const onGetPhoneNumberHandler = () => {
    onVarificationHandler("getPhoneNumber");
  };

  const onSubmitDataHandler = () => {
    if (
      dataSchema.num1.length > 0 &&
      dataSchema.num2.length > 0 &&
      dataSchema.num3.length > 0 &&
      dataSchema.num4.length > 0
    ) {
      smsVarificationHandler();
    } else {
      setError(true);
      toast.error("please full inputs");
    }
  };

  const smsVarificationHandler = async () => {
    try {
      const response = await SmsVarificationOtp({
        phoneNumber: `0${phoneNumber}`,
        otp: `${dataSchema.num1}${dataSchema.num2}${dataSchema.num3}${dataSchema.num4}`,
      });
      //check response status
      if (response.status === 202) {
        //currect otp
        onVarificationHandler("registerUser", {
          phoneNumber,
          id: response.data.id,
        });
        toast.success("Sms varificate Successfully");
      } else {
        toast.error("check your otp code");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-fit flex flex-col items-center justify-center gap-y-5">
        <div className="self-start">
          <h1 className="text-3xl font-semibold">SMS sent !</h1>
          <span className="text-lg text-[#646464]">Enter the number sent</span>
        </div>
        <div ref={inputRef} className="flex items-center gap-x-1">
          <input
            value={dataSchema["num1"]}
            name="num1"
            className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
              dataSchema.num1 ? "!border-green-200" : ""
            } ${
              error && dataSchema.num1.length === 0 ? "!border-red-200" : ""
            }`}
            type={"number"}
            onChange={schemaHandler}
          />
          <input
            value={dataSchema["num2"]}
            name="num2"
            className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
              dataSchema.num2 ? "!border-green-200" : ""
            } ${
              error && dataSchema.num2.length === 0 ? "!border-red-200" : ""
            }`}
            type={"number"}
            onChange={schemaHandler}
          />
          <input
            value={dataSchema["num3"]}
            name="num3"
            className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
              dataSchema.num3 ? "!border-green-200" : ""
            } ${
              error && dataSchema.num3.length === 0 ? "!border-red-200" : ""
            }`}
            type={"number"}
            onChange={schemaHandler}
          />
          <input
            value={dataSchema["num4"]}
            name="num4"
            className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
              dataSchema.num4 ? "!border-green-200" : ""
            } ${
              error && dataSchema.num4.length === 0 ? "!border-red-200" : ""
            }`}
            type={"number"}
            onChange={schemaHandler}
          />
        </div>
        <div className="flex flex-col justify-between items-center w-full">
          <button
            onClick={onSubmitDataHandler}
            className="bg-[#515BE0] text-white hover:text-[#515BE0] hover:bg-white border border-[#515BE0] duration-200 w-full py-2.5 rounded-lg"
          >
            Sign in
          </button>
          <button
            onClick={onGetPhoneNumberHandler}
            className="text-sm text-gray-500 mt-2 self-end mb-3 hover:text-blue-900 duration-200"
          >
            wrong number ?
          </button>
          <div className="cursor-default text-sm">
            <span className="font-semibold">expires on : </span>
            <span className="text-[#515151] text-xs font-semibold">
              {`0${Math.floor(timer / 60)}:${
                timer % 60 < 10 ? "0" : ""
              }${Math.floor(timer % 60)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmsVarification;