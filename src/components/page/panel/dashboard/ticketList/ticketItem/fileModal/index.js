import React, { useState, useRef } from "react";

import { EyeIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/outline";

//pic
import inbox from "./../../../../../../../../public/assets/img/inbox.png";

function FileModal({ prevFile, isSearching, modalHandler, isLoadingBtn }) {
  const fileContainer = useRef();
  const [filePickStatus, setFilePickStatus] = useState("noFile");
  const [file, setFile] = useState({
    preview: "",
    raw: "",
  });

  const onUplaodFileHandler = (e) => {
    if (e.target.files.length) {
      setFile({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    } else {
      // console.log("error add file");
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFilePickStatus("noFile");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFilePickStatus("dragOver");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFilePickStatus("noFile");
    setFile({
      preview: URL.createObjectURL(e.dataTransfer.files[0]),
      raw: e.dataTransfer.files[0],
    });
  };

  return (
    <div
      onClick={() => modalHandler(false)}
      className={`fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-11/12 md:w-3/4 p-9 rounded-md space-y-10 mx-5"
      >
        {isSearching ? (
          <div
            style={{ borderTopColor: "transparent" }}
            className="mx-auto w-10 h-10 border-2 border-black border-solid rounded-full animate-spin"
          ></div>
        ) : prevFile.length > 0 ? (
          <>
            <span className="text-xl font-semibold text-gray-700">
              Ticket you have already uploaded
            </span>
            <a
              target={"_blank"}
              download
              href={`http://optivas.ir${prevFile[0].file}`}
              className="flex items-center gap-x-2.5 w-full group"
            >
              <img className="w-8" src={`${inbox.src}`} />
              <span className="group-hover:text-blue-500 duration-200">
                Uploaded file
              </span>
            </a>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-y-2">
              <span className="text-xl font-semibold text-gray-700">
                Attach file to your ticket
              </span>
            </div>
            <input
              ref={fileContainer}
              type={"file"}
              className="hidden"
              onChange={onUplaodFileHandler}
            />
            {file.raw ? (
              <div className="grid grid-cols-1 sm:grid-cols-4 text-gray-500 text-center gap-y-3 items-center p-3 text-sm min-h-[75px] border rounded-md">
                <a
                  download
                  href={`${file.preview}`}
                  className="hover:text-blue-500 duration-200 truncate"
                >
                  {file.raw.name}
                </a>
                <span>
                  size : {(file.raw.size / (1024 * 1024)).toFixed(2)}MB
                </span>
                <span>Type : {file.raw.type}</span>
                <div className="flex items-center justify-center gap-x-2">
                  <a
                    download
                    href={`${file.preview}`}
                    className="px-3 py-1 bg-blue-500 rounded-md text-white border border-blue-500 duration-200 hover:text-blue-500 hover:bg-white"
                  >
                    <EyeIcon className="w-5" />
                  </a>
                  <button
                    onClick={() => {
                      setFile({
                        preview: "",
                        raw: "",
                      });
                    }}
                    className="px-3 py-1 bg-red-500 rounded-md text-white border border-red-500 duration-200 hover:text-red-500 hover:bg-white"
                  >
                    <TrashIcon className="w-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => handleDragOver(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onClick={() => fileContainer.current.click()}
                className={`${
                  filePickStatus === "dragOver"
                    ? "bg-blue-300 bg-opacity-30"
                    : ""
                } duration-200 cursor-pointer flex flex-col items-center justify-center text-sm text-gray-500 w-full min-h-[200px] border border-blue-500 border-dashed rounded-md`}
              >
                <span>Drag your file in box</span>
                <span>or</span>
                <span>click to select file</span>
              </div>
            )}
            <div className="w-full flex items-center justify-center gap-x-3">
              {isLoadingBtn ? (
                <div
                  className={`w-[110px] py-2.5 rounded-md flex flex-row justify-center items-center bg-blue-600`}
                >
                  <div
                    style={{ borderTopColor: "transparent" }}
                    className="w-6 h-6 border-2 border-white border-solid rounded-full animate-spin"
                  ></div>
                </div>
              ) : (
                <button
                  onClick={() => modalHandler(true, file.raw)}
                  className="bg-blue-600 hover:bg-blue-900 duration-200 text-xl px-10 py-2 rounded-md text-white"
                >
                  Send
                </button>
              )}
              <button
                onClick={() => modalHandler(false)}
                className="bg-gray-600 hover:bg-gray-900 duration-200 text-xl px-10 py-2 rounded-md text-white"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FileModal;
