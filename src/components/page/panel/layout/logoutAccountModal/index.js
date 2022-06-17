import { useRouter } from "next/router";

function LogoutAccountModal({ modalHandler }) {
  const router = useRouter();
  const onLogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    router.reload();
  };

  return (
    <div
      onClick={modalHandler}
      className={`fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-60`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-5 py-5 rounded-md space-y-5"
      >
        <span className="text-xl font-semibold text-gray-700">
          Do you want to logout ?
        </span>
        <div className="w-full flex items-center justify-center gap-x-3">
          <button
            onClick={onLogoutHandler}
            className="bg-red-600 hover:bg-red-900 duration-200 text-xl px-10 py-2 rounded-md text-white"
          >
            Yes
          </button>
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

export default LogoutAccountModal;
