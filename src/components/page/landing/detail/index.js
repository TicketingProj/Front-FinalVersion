import { useRouter } from "next/router";
//style
import Style from "./detail.module.css";

function Detail() {
  const router = useRouter();

  const onSigninClickHandler = () => {
    if (localStorage.getItem("token") !== null && localStorage.getItem("id")) {
      router.push(`panel/dashboard`);
    } else {
      router.push("/auth");
    }
  };

  return (
    <div
      className={`${Style.bgShadowtext} text-center py-14 rounded-md  relative z-10 top-14 px-5 mx-2.5 sm:w-10/12 bg-white sm:mx-auto`}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
        Still no luck? We can help
      </h2>
      <div className="flex flex-col mb-7 text-sm sm:text-base">
        <span>Contact us and we will get back to you</span>
        <span> as soon as possible</span>
      </div>

      <button
        onClick={onSigninClickHandler}
        className={`${Style.mybutton} ${Style.green} text-sm sm:text-base`}
      >
        Open a Ticket
      </button>
    </div>
  );
}

export default Detail;
