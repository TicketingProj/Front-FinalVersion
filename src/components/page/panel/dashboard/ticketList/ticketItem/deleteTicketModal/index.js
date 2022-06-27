function DeleteTicketModal({ modalHandler, isDeleteLoadingBtn }) {
  return (
    <div
      onClick={() => modalHandler(false)}
      className={`fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-5 py-5 rounded-md space-y-10 mx-5"
      >
        <div className="flex flex-col items-center gap-y-2">
          <span className="text-xl font-semibold text-gray-700">
            Do you want to delete your ticket ?
          </span>
        </div>
        <div className="w-full flex items-center justify-center gap-x-3">
          {isDeleteLoadingBtn ? (
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
              onClick={() => modalHandler(true)}
              className="bg-red-600 hover:bg-red-900 duration-200 text-xl px-10 py-2 rounded-md text-white"
            >
              Yes
            </button>
          )}
          <button
            onClick={() => modalHandler(false)}
            className="bg-gray-600 hover:bg-gray-900 duration-200 text-xl px-10 py-2 rounded-md text-white"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTicketModal;
