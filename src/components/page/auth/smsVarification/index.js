import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
//service
import { GetSingleUser } from "../../../../services/account";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addAllData } from "../../../../slice/user";
import { addOtp } from "../../../../slice/user";
//services
import { SmsVarificationOtp } from "../../../../services/account";

function SmsVarification({ onVarificationHandler }) {
  const router = useRouter();
  const inputRef = useRef();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [dataSchema, setDataSchema] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
  });
  const [error, setError] = useState(false);

  const [timer, setTimer] = useState(120);

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
    //if length of value of target = 1 , go to to after input if exist
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
    //Check input data
    if (
      dataSchema.num1.length > 0 &&
      dataSchema.num2.length > 0 &&
      dataSchema.num3.length > 0 &&
      dataSchema.num4.length > 0
    ) {
      //send data
      smsVarificationHandler();
    } else {
      //set error
      setError(true);
      toast.error("please full inputs");
    }
  };

  const smsVarificationHandler = async () => {
    setIsLoadingBtn(true);
    try {
      const response = await SmsVarificationOtp({
        phoneNumber: `0${user.phoneNumber}`,
        otp: `${dataSchema.num1}${dataSchema.num2}${dataSchema.num3}${dataSchema.num4}`,
      });
      //check response status
      if (response.status === 202) {
        //currect otp
        dispatch(addOtp({ ...response.data }));
        toast.success("Sms varificate Successfully");
        //check if user had login before
        getUser(response.data.token, response.data.id);
      } else {
        toast.error("check your otp code");
      }
    } catch (error) {
      toast.error("check your otp code");
      console.log(error);
    }
    setIsLoadingBtn(false);
  };

  const getUser = async (token, id) => {
    try {
      const response = await GetSingleUser(id, token);
      if (response.status === 200) {
        // check user have Register
        if (response.data.fullName) {
          dispatch(addAllData({ ...response.data }));
          //set localStorage to login when user come to account
          localStorage.setItem("token", `${token}`);
          localStorage.setItem("id", `${id}`);
          router.push(`/panel/dashboard`);
        } else {
          onVarificationHandler("registerUser");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-fit flex flex-col items-center justify-center gap-y-5 mx-3">
      <div className="self-start">
        <h1 className="text-3xl font-semibold">SMS sent !</h1>
        <span className="text-lg text-[#646464]">Enter the number sent</span>
      </div>
      <div ref={inputRef} className="flex items-center gap-x-1">
        <input
          autoFocus
          value={dataSchema["num1"]}
          name="num1"
          className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
            dataSchema.num1 ? "!border-green-200" : ""
          } ${error && dataSchema.num1.length === 0 ? "!border-red-200" : ""}`}
          type={"number"}
          onChange={schemaHandler}
        />
        <input
          value={dataSchema["num2"]}
          name="num2"
          className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
            dataSchema.num2 ? "!border-green-200" : ""
          } ${error && dataSchema.num2.length === 0 ? "!border-red-200" : ""}`}
          type={"number"}
          onChange={schemaHandler}
        />
        <input
          value={dataSchema["num3"]}
          name="num3"
          className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
            dataSchema.num3 ? "!border-green-200" : ""
          } ${error && dataSchema.num3.length === 0 ? "!border-red-200" : ""}`}
          type={"number"}
          onChange={schemaHandler}
        />
        <input
          value={dataSchema["num4"]}
          name="num4"
          className={`duration-200 border-2 hover:border-blue-200 focus:border-blue-500 outline-none border-gray-200 rounded-lg w-12 h-12 text-center text-xl ${
            dataSchema.num4 ? "!border-green-200" : ""
          } ${error && dataSchema.num4.length === 0 ? "!border-red-200" : ""}`}
          type={"number"}
          onChange={schemaHandler}
        />
      </div>
      <div className="flex flex-col justify-between items-center w-full">
        {!isLoadingBtn ? (
          <button
            onClick={onSubmitDataHandler}
            className="bg-[#515BE0] text-white hover:text-[#515BE0] hover:bg-white border border-[#515BE0] duration-200 w-full py-2.5 rounded-lg mb-2"
          >
            Sign in
          </button>
        ) : (
          <div
            className={`w-full py-2.5 flex flex-row justify-center items-center bg-[#515BE0] rounded-lg mb-2`}
          >
            <div
              style={{ borderTopColor: "transparent" }}
              className="w-6 h-6 border-2 border-white border-solid rounded-full animate-spin"
            ></div>
          </div>
        )}
        <div className="flex items-center flex-row-reverse gap-x-5 justify-center">
          <div
            onClick={onGetPhoneNumberHandler}
            className="cursor-pointer group flex items-center gap-x-2 relative "
          >
            <div className="text-sm text-gray-600 mt-2 self-end mb-2 ">
              wrong number ?
            </div>
            <span className="absolute text-sm font-medium opacity-0 top-7 group-hover:opacity-100 duration-200 bg-black bg-opacity-70 text-white p-2 rounded-lg rounded-bl-3xl">
              phoneNumber {`0${user.phoneNumber}`}
            </span>
          </div>
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
