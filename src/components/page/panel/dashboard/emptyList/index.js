//pic
import NotFoundSvg from "../../../../../../public/assets/svg/NotFoundSVG";

function EmptyList() {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center shadow-md mt-8 py-10 px-5">
      <NotFoundSvg classname={`w-56 sm:w-96 h-[300px]`} />
      <span className="font-semibold text-xl mt-5">No Results Found</span>
      <p className="text-center mt-2.5 text-sm text-gray-500">
        It looks like this section is empty or your search did not return any
        results, you can <br /> start creating a content or search using another
        word.
      </p>
    </div>
  );
}

export default EmptyList;
