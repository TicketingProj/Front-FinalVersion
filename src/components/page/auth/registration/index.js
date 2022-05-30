import React, { useRef, useState } from "react";

//pic
import DefaultUser from "./../../../../../public/assets/img/user.png";
import IranIcon from "./../../../../../public/assets/img/icons8-iran-48 (1).png";
import { toast } from "react-toastify";

function Registration() {
  const inputFile = useRef();

  const [dataSchema, setDataSchema] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    Agreemet: false,
  });

  const [userProfiel, setUserProfile] = useState({ preview: "", raw: "" });

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
              userProfiel && userProfiel.preview
                ? userProfiel.preview
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
        {userProfiel && userProfiel.preview && (
          <button
            onClick={() => setUserProfile()}
            className="duration-200 bg-red-700 text-white border border-red-700 hover:bg-white hover:text-red-700 px-3 py-1 rounded-md"
          >
            remove profile
          </button>
        )}
        <div className="relative flex flex-col w-full">
          <label className="text-sm text-gray-500">full name</label>
          <input
            className="border-2 border-gray-200 rounded-md outline-none px-2 py-1"
            type={"text"}
          />
        </div>
        <div className="relative flex flex-col w-full">
          <label className="text-sm text-gray-500">email</label>
          <input
            className="border-2 border-gray-200 rounded-md outline-none px-2 py-1"
            type={"email"}
          />
        </div>
        <div className="relative flex flex-col w-full">
          <label className="text-sm text-gray-500">phone number</label>
          <div className="flex gap-x-2">
            <div className="flex items-center justify-center gap-x-1 border-2 rounded-md px-3">
              <span className="text-sm font-semibold">+98</span>
              <img className="h-9 " src={IranIcon.src} />
            </div>
            <input
              className={`border-2 border-gray-200 rounded-md outline-none w-full px-2 `}
              disabled
              type="number  "
              placeholder="phone number"
              onChange={schemaHandler}
              value={dataSchema.phoneNumber}
            />
          </div>
        </div>
        <div className="relative flex flex-row-reverse items-center justify-end gap-x-2 w-full">
          <label className="text-sm text-gray-500">
            I agree to the{" "}
            <span className="text-blue-500">terms of service</span>
          </label>
          <input
            className="border border-gray-200 rounded-md outline-none"
            type={"checkbox"}
          />
        </div>
        <button className="duration-200 bg-[#515BE0] text-white border border-[#515BE0] hover:text-[#515BE0] hover:bg-white font-medium px-12 py-2.5 rounded-md mt-2">
          Continue
        </button>
      </div>
    </div>
  );
}

export default Registration;
