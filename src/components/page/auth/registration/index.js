import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addAllData } from "../../../../slice/user";
//service
import { RegisterUser } from "../../../../services/account";
//pic
import DefaultUser from "./../../../../../public/assets/img/user.png";
import IranIcon from "./../../../../../public/assets/img/icons8-iran-48 (1).png";

function Registration() {
  const router = useRouter();
  const inputFile = useRef();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [dataSchema, setDataSchema] = useState({ ...user, Agreemet: false });

  const [userProfile, setUserProfile] = useState({ preview: "", raw: "" });

  const [error, setError] = useState({});

  const setLocalStorage = () => {
    localStorage.setItem("token", `${user.token}`);
    localStorage.setItem("id", `${user.id}`);
  };

  const schemaHandler = (e) => {
    setDataSchema({
      ...dataSchema,
      [e.target.name]: e.target.value,
    });
  };

  const onUplaodFileHandler = (e) => {
    if (e.target.files.length && e.target.files[0].type.includes("image")) {
      setUserProfile({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    } else {
      toast.error("please select image for your profile");
    }
  };

  const onSubmitDataHandler = () => {
    //check values
    let flagHaveError = false;

    //claer errors list
    setError({});

    if (dataSchema.fullName.trim().length <= 0) {
      setError((prevState) => ({
        ...prevState,
        fullName: "please enter fullname",
      }));

      flagHaveError = true;
    }
    if (
      dataSchema.email.trim().length <= 0 ||
      validateEmail(dataSchema.email) === null
    ) {
      if (validateEmail(dataSchema.email) === null) {
        setError((prevState) => ({
          ...prevState,
          email: "please enter email correctly",
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          email: "please enter email",
        }));
      }
      flagHaveError = true;
    }
    if (dataSchema.Agreemet === false) {
      setError((prevState) => ({
        ...prevState,
        Agreemet: "accept terms of services",
      }));
      flagHaveError = true;
    }

    if (!flagHaveError) {
      onPostDataHandler();
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onPostDataHandler = async () => {
    setIsLoadingBtn(true);
    try {
      const { fullName, email, phoneNumber, id, token } = dataSchema;
      const response = await RegisterUser({
        avatar: userProfile.raw,
        id,
        fullName,
        email,
        phoneNumber: `0${phoneNumber}`,
        token,
      });
      if (response.status === 200) {
        toast.success("data add successfully");
        setLocalStorage();
        dispatch(addAllData({ ...dataSchema }));
        router.push(`/panel/dashboard`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoadingBtn(false);
  };

  return (
    <div className="w-fit flex flex-col items-center justify-center gap-y-5 my-5">
      <div className="self-start mx-5">
        <h1 className="text-3xl font-semibold">Register user!</h1>
        <p className="text-[#646464] text-lg">Enter your information </p>
      </div>
      <div className="flex flex-col gap-y-2 items-center w-[295px] sm:w-[350px] mx-5">
        <div
          onClick={() => inputFile.current.click()}
          className="group w-32 h-32 rounded-full overflow-hidden cursor-pointer"
        >
          <img
            className="w-full h-full object-cover"
            src={
              userProfile && userProfile.preview
                ? userProfile.preview
                : DefaultUser.src
            }
          />
          <span className="duration-300 bg-black bg-opacity-40 px-5 py-5 relative bottom-0 group-hover:bottom-9 text-white text-sm left-3 rounded-full">
            get picture
          </span>
          <input
            type={"file"}
            onChange={onUplaodFileHandler}
            id="file"
            ref={inputFile}
          />
        </div>
        {userProfile && userProfile.preview && (
          <button
            onClick={() =>
              setUserProfile({
                raw: "",
                preview: "",
              })
            }
            className="duration-200 bg-red-700 text-white border border-red-700 hover:bg-white hover:text-red-700 px-3 py-1 rounded-md"
          >
            remove profile
          </button>
        )}
        <div className="relative flex flex-col w-full">
          <label className="text-sm text-gray-500">full name</label>
          <input
            name="fullName"
            onChange={schemaHandler}
            value={dataSchema.fullName}
            className={`${
              error.fullName ? "border-red-200" : ""
            } border-2 border-gray-200 rounded-md outline-none px-2 py-1`}
            type={"text"}
          />
          {error.fullName && (
            <span className="text-sm text-red-500">{error.fullName}</span>
          )}
        </div>
        <div className="relative flex flex-col w-full">
          <label className="text-sm text-gray-500">email</label>
          <input
            name="email"
            onChange={schemaHandler}
            value={dataSchema.email}
            className={`${
              error.email ? "border-red-200" : ""
            } border-2 border-gray-200 rounded-md outline-none px-2 py-1`}
            type={"email"}
          />
          {error.email && (
            <span className="text-sm text-red-500">{error.email}</span>
          )}
        </div>
        <div className="relative flex flex-col w-full">
          <label className="text-sm text-gray-500">phone number</label>
          <div className="flex gap-x-2">
            <div className="flex items-center justify-center gap-x-1 border-2 rounded-md px-3">
              <span className="text-sm font-semibold">+98</span>
              <img className="h-9" src={IranIcon.src} />
            </div>
            <input
              className={`border-2 border-gray-200 rounded-md outline-none w-full px-2 text-gray-500`}
              disabled
              type="number"
              value={dataSchema.phoneNumber}
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          <div className="relative flex flex-row-reverse items-center justify-end gap-x-2 w-full">
            <label className="text-sm text-gray-500">
              I agree to the
              <Link href={"/termsOfServices"}>
                <a target="_blank" className="text-blue-500 mx-1">
                  terms of service
                </a>
              </Link>
            </label>
            <input
              name="Agreemet"
              value={dataSchema.Agreemet}
              onChange={schemaHandler}
              className={`border-2 border-gray-200 rounded-md outline-none`}
              type={"checkbox"}
            />
          </div>
          {error.Agreemet && (
            <span className="text-xs text-red-500">{error.Agreemet}</span>
          )}
        </div>
        {!isLoadingBtn ? (
          <button
            onClick={onSubmitDataHandler}
            className="w-[150px] duration-200 bg-[#515BE0] text-white border border-[#515BE0] hover:text-[#515BE0] hover:bg-white font-medium py-2.5 rounded-md mt-2"
          >
            Continue
          </button>
        ) : (
          <div
            className={`w-[150px] py-2.5 rounded-md mt-2 flex flex-row justify-center items-center bg-[#515BE0]`}
          >
            <div
              style={{ borderTopColor: "transparent" }}
              className="w-6 h-6 border-2 border-white border-solid rounded-full animate-spin"
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Registration;
