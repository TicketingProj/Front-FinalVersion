import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
function SmsVarification({ onGoToGetPhoneNumberHandler }) {
  const router = useRouter();
  const inputRef = useRef();
  const [timer, setTimer] = useState(120);

  const [dataSchema, setDataSchema] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
    num5: "",
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
      onGoToGetPhoneNumberHandler(false);
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

  return (
    <div className="w-screen h-screen flex items-center justify-center">
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
              dataSchema.num1 ? "border-green-200" : ""
            }`}
            type={"number"}
            onChange={schemaHandler}
          />
          <input
            value={dataSchema["num2"]}
            name="num2"
            className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
              dataSchema.num2 ? "border-green-200" : ""
            }`}
            type={"number"}
            onChange={schemaHandler}
          />
          <input
            value={dataSchema["num3"]}
            name="num3"
            className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
              dataSchema.num3 ? "border-green-200" : ""
            }`}
            type={"number"}
            onChange={schemaHandler}
          />
          <input
            value={dataSchema["num4"]}
            name="num4"
            className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
              dataSchema.num4 ? "border-green-200" : ""
            }`}
            type={"number"}
            onChange={schemaHandler}
          />
          <input
            value={dataSchema["num5"]}
            name="num5"
            className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
              dataSchema.num5 ? "border-green-200" : ""
            }`}
            type={"number"}
            onChange={schemaHandler}
          />
        </div>
        <button className="bg-[#515BE0] text-white hover:text-[#515BE0] hover:bg-white border border-[#515BE0] duration-200 px-14 py-2.5 rounded-lg">
          Sign in
        </button>
        <div className="cursor-default text-sm">
          <span>Expires on : </span>
          <span className="text-[#515151] text-xs">
            {`0${Math.floor(timer / 60)}:${
              timer % 60 < 10 ? "0" : ""
            }${Math.floor(timer % 60)}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SmsVarification;
