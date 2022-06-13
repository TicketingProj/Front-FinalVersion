import React, { useState, useRef } from "react";

//pic
import DefaultUser from "./../../../../../public/assets/img/user.png";
import IranIcon from "./../../../../../public/assets/img/icons8-iran-48 (1).png";

//SVG
import { PencilAltIcon } from "@heroicons/react/solid";
import { SaveIcon } from "@heroicons/react/solid";
function Setting() {
  const inputFile = useRef();

  const [userProfiel, setUserProfile] = useState({ preview: "", raw: "" });
  const [dataSchema, setDataSchema] = useState({
    fullName: "",
    email: "",
    phoneNumber: "9901660268",
    Agreemet: false,
  });

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
    <div className="p-8 bg-[#F5F7FA] flex flex-col h-full">
      <div>
        <span className="text-2xl font-semibold">Setting</span>
        <p className="text-sm mt-1">
          User / <span className="text-blue-500">Setting</span>
        </p>
      </div>
      <div className="flex flex-col xl:grid xl:grid-cols-12 gap-2">
        <div className="col-span-3 shadow-md mt-5 rounded-md flex flex-col items-center px-5 py-16 bg-white">
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
          <span className="mt-2.5 text-lg font-medium">full name</span>
          <div className="flex items-center gap-x-2 mt-8 p-4 w-full rounded-md text-gray-500 bg-gray-200">
            <PencilAltIcon className=" w-5 h-5" />
            <span>Account Detail</span>
          </div>
        </div>
        <div className="col-span-9 shadow-md mt-5 rounded-md flex flex-col items-center bg-white">
          <div className="w-full border-b px-6 py-4">
            <span className="text-xl font-semibold text-gray-600">
              Account Detail
            </span>
          </div>
          <div className="px-6 py-4 w-full flex flex-col gap-y-4 h-full">
            <div className="flex flex-col sm:flex-row gap-y-5 items-center gap-x-2">
              <div className="flex flex-col w-full">
                <label className=" text-gray-500">Fullname</label>
                <input
                  name="fullName"
                  onChange={schemaHandler}
                  value={dataSchema.fullName}
                  className="border-2 border-gray-200 rounded-md outline-none px-3 py-2"
                  type={"text"}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-gray-500">Email</label>
                <input
                  name="email"
                  onChange={schemaHandler}
                  value={dataSchema.email}
                  className="border-2 border-gray-200 rounded-md outline-none px-3 py-2"
                  type={"email"}
                />
              </div>
            </div>
            <div className="flex flex-col w-fit ">
              <label className="text-gray-500">phone number</label>
              <div className="flex gap-x-2">
                <div className="flex items-center justify-center gap-x-1 border-2 rounded-md px-3">
                  <span className="text-sm font-semibold">+98</span>
                  <img className="h-9 " src={IranIcon.src} />
                </div>
                <input
                  className={`border-2 border-gray-200 rounded-md outline-none w-full px-2 text-gray-500`}
                  disabled
                  type="number"
                  value={dataSchema.phoneNumber}
                />
              </div>
            </div>
            <button className="mt-16 ml-auto py-2 px-3 hover:bg-blue-900 duration-200 bg-blue-700 rounded-md flex items-center gap-x-2 text-white">
              <SaveIcon className="w-5" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
