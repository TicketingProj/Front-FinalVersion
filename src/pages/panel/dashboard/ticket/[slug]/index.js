import React from "react";
import { useRouter } from "next/dist/client/router";
//component
import Layout from "../../../../../components/page/panel/layout";
//svg
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { UploadIcon } from "@heroicons/react/outline";
//pic
import defaulUser from "./../../../../../../public/assets/img/user.png";

function SingleTicket() {
  const router = useRouter();

  const goBackHandler = () => {
    router.back();
  };

  return (
    <Layout>
      <div className="p-5 bg-[#F5F7FA] flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-semibold">Ticket #690948</span>
            <p className="text-sm text-gray-500">
              <span className="text-blue-500">Users / Tickets </span>/ #690948
            </p>
          </div>
          <button
            className="bg-white hover:bg-[#fafbfc] flex items-center gap-x-1 border rounded-md py-2 px-4 duration-200"
            onClick={goBackHandler}
          >
            <ArrowLeftIcon className="w-4" />
            back
          </button>
        </div>
        <div className="shadow-md mt-8">
          <div className="flex items-center justify-between bg-white border-b  py-3 px-4">
            <span className="text-2xl text-gray-600 font-medium">Subject</span>
            <div>
              <span className="p-2 text-white bg-gray-600 mx-2 rounded-md">
                Normal
              </span>
              <span className="p-2 text-white bg-blue-600 mx-2 rounded-md">
                Opened
              </span>
            </div>
          </div>
          <div className="bg-[#F8F9FA]">
            <div className="flex items-start gap-x-2 m-5 p-5">
              <img className="w-16" src={defaulUser.src} />
              <div className="flex-grow rounded-md bg-white shadow-sm p-4">
                <div className="w-full flex items-center justify-between pb-2 border-b">
                  <span className="text-lg font-semibold">Fullname</span>
                  <span className="text-sm text-gray-500">Time send</span>
                </div>
                <p className="py-2">this message form user</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-5 mt-8">
          <div className="flex flex-col gap-y-1 mb-5">
            <label>Replay Message:</label>
            <textarea className="border rounded-md py-1 px-2 min-h-[175px] outline-none" />
          </div>
          <div className="flex flex-col gap-y-2">
            <label>
              Files : (<span className="font-semibold">Supported types</span> :
              JPG, JPEG, PNG, PDF)
            </label>
            <div className="flex items-center justify-between h-[45px]">
              <div className="h-full flex-grow flex items-center border rounded-l-md">
                <button className="h-full px-2 border-r bg-[#F5F7FA]">
                  Choose File
                </button>
                <span className="px-2">No File Chosen</span>
              </div>
              <button className="w-fit h-full px-4 text-3xl border border-[#212529] hover:bg-white hover:text-[#212529] duration-200 bg-[#212529] text-white rounded-r-md">
                +
              </button>
            </div>
          </div>
          <button className="bg-blue-700 hover:bg-blue-900 duration-200 text-white flex items-center gap-x-1 rounded-md px-4 py-2 mt-5">
            <UploadIcon className="w-5" />
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default SingleTicket;
