//SVG
import { PlusIcon } from "@heroicons/react/solid";
import { MailOpenIcon } from "@heroicons/react/solid";
import { ChatIcon } from "@heroicons/react/solid";
import { ReplyIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/solid";
import NotFoundSvg from "../../../../../public/assets/svg/NotFoundSVG";

function Dashboard() {
  return (
    <div class=" p-5 bg-[#F5F7FA]">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xl font-semibold">My Tickets</span>
          <p className="text-sm text-gray-500">
            <span className="text-blue-500">Users</span> / Tickets
          </p>
        </div>
        <div className="flex items-center flex-row-reverse gap-x-2.5">
          <div class="">
            <select
              className="py-2 px-2 rounded-md border outline-none"
              id="TF"
              name="tarafdari"
            >
              <option value="Esteghlal">All</option>
              <option value="Persepolis">Opened</option>
              <option value="Persepolis">Answered</option>
              <option value="Persepolis">Replied</option>
              <option value="Persepolis">Close</option>
            </select>
          </div>
          <button className="bg-blue-700 text-white py-2 px-3.5 rounded-md">
            <PlusIcon className="w-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
        <div className="bg-blue-800 text-white flex items-center justify-between p-5 rounded-md">
          <div className="flex flex-col">
            <span className="text-2xl mb-2">Opened</span>
            <span className="text-xl">0</span>
          </div>
          <MailOpenIcon className="w-16 opacity-25" />
        </div>
        <div className="bg-green-800 text-white flex items-center justify-between p-5 rounded-md">
          <div className="flex flex-col">
            <span className="text-2xl mb-2">Answered</span>
            <span className="text-xl">0</span>
          </div>
          <ChatIcon className="w-16 opacity-25" />
        </div>
        <div className="bg-purple-600 text-white flex items-center justify-between p-5 rounded-md">
          <div className="flex flex-col">
            <span className="text-2xl mb-2">Replied</span>
            <span className="text-xl">0</span>
          </div>
          <ReplyIcon className="w-16 opacity-25" />
        </div>
        <div className="bg-red-800 text-white flex items-center justify-between p-5 rounded-md">
          <div className="flex flex-col">
            <span className="text-2xl mb-2">Closed</span>
            <span className="text-xl">0</span>
          </div>
          <XIcon className="w-16 opacity-25" />
        </div>
      </div>
      <div className="shadow-md mt-5 rounded-md flex flex-col items-center px-5 py-16 bg-white">
        <NotFoundSvg classname={`w-96 h-[300px]`} />
        <span className="font-semibold text-xl mt-5">No Results Found</span>
        <p className="text-center mt-2.5 text-sm text-gray-500">
          It looks like this section is empty or your search did not return any
          results, you can start creating a content or search using another
          word.
        </p>
      </div>
    </div>
  );
}
export default Dashboard;
