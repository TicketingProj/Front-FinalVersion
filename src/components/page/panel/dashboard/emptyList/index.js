//pic
import NotFoundSvg from "../../../../../../public/assets/svg/NotFoundSVG";

function EmptyList() {
  return (
    <>
      <NotFoundSvg classname={`w-96 h-[300px]`} />
      <span className="font-semibold text-xl mt-5">No Results Found</span>
      <p className="text-center mt-2.5 text-sm text-gray-500">
        It looks like this section is empty or your search did not return any
        results, you can start creating a content or search using another word.
      </p>
    </>
  );
}

export default EmptyList;
