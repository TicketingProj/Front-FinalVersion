import Link from "next/link";

//style
import Style from "./detail.module.css";

function Detail() {
  return (
    <div
      className={`${Style.bgShadowtext} text-center py-14 rounded-md  relative z-50 top-14 px-5 mx-2.5 sm:w-10/12 bg-white sm:mx-auto`}
    >
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
        Still no luck? We can help
      </h2>
      <div className="flex flex-col mb-7 text-sm sm:text-base">
        <span>Contact us and we will get back to you</span>
        <span> as soon as possible</span>
      </div>
      <Link href={"/auth"}>
        <a class={`${Style.mybutton} ${Style.green} text-sm sm:text-base`}>
          Open a Ticket
        </a>
      </Link>
    </div>
  );
}

export default Detail;
