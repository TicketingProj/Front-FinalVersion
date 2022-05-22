function Footer() {
  return (
    <div className="bg-[#222222] pb-12 pt-24">
      <ul className="flex justify-center items-center text-[#c5c5c5] flex-wrap">
        <li className="cursor-pointer text-xs sm:text-base hover:text-white duration-200 border-r-2 border-[#495959] px-2.5">
          Privacy policy
        </li>
        <li className="cursor-pointer text-xs sm:text-base hover:text-white duration-200 border-r-2 border-[#495959] px-2.5">
          Terms of use
        </li>
        <li className="cursor-pointer text-xs sm:text-base hover:text-white duration-200 px-2.5">
          Account deleting
        </li>
      </ul>
      <p className=" text-xs sm:text-base text-center mt-5 text-[#7c7c7d]">
        © 2022 Fowtickets - All rights reserved
      </p>
    </div>
  );
}

export default Footer;
