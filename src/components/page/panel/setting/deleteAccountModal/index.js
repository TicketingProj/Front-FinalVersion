import React, { useState } from "react";
import { useRouter } from "next/router";
//services
import { DeleteAccount } from "../../../../../services/account";
//redux
import { useDispatch, useSelector } from "react-redux";

function DeleteAccountModal({ modalHandler }) {
  const router = useRouter();
  const { user } = useSelector((state) => state);
  const [isLoadingBtn, setISLoadingBtn] = useState(false);
  const onDeleteAccountHandler = async () => {
    setISLoadingBtn(true);
    try {
      const response = await DeleteAccount(user.id, user.token);
      if (response.status === 204) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
    setISLoadingBtn(false);
  };
  return (
    <div
      onClick={modalHandler}
      className={`fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-5 py-5 rounded-md space-y-10 mx-5"
      >
        <div className="flex flex-col items-center gap-y-2">
          <span className="text-xl font-semibold text-gray-700">
            Do you want to delete your account ?
          </span>
          <span className="self-start text-xs text-red-500">
            (All your tickets will be lost)
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-x-3">
          {isLoadingBtn ? (
            <div
              className={`w-[110px] py-2.5 rounded-md flex flex-row justify-center items-center bg-red-600`}
            >
              <div
                style={{ borderTopColor: "transparent" }}
                className="w-6 h-6 border-2 border-white border-solid rounded-full animate-spin"
              ></div>
            </div>
          ) : (
            <button
              onClick={onDeleteAccountHandler}
              className="bg-red-600 hover:bg-red-900 duration-200 text-xl px-10 py-2 rounded-md text-white"
            >
              Yes
            </button>
          )}
          <button
            onClick={modalHandler}
            className="bg-gray-600 hover:bg-gray-900 duration-200 text-xl px-10 py-2 rounded-md text-white"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccountModal;
