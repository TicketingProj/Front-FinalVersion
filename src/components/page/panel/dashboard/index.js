//component
import EmptyList from "./emptyList";
import TicketStatus from "./ticketStatus";
//SVG
import { PlusIcon } from "@heroicons/react/solid";
/*
<div className="overflow-auto">
        <table class="min-w-[800px] w-full shadow-md mt-5 rounded-md bg-white">
          <thead className="w-full border-b">
            <tr className="grid grid-cols-12 min-w-full">
              <th className="my-3 col-span-2 text-center">Ticket Number</th>
              <th className="my-3 col-span-2 text-center">Subject</th>
              <th className="my-3 col-span-2 text-center">Priority</th>
              <th className="my-3 col-span-2 text-center">Status</th>
              <th className="my-3 col-span-2 text-center">Opened Date</th>
              <th className="my-3 col-span-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="flex flex-col">
            <tr className="grid grid-cols-12 min-w-full">
              <td className="mx-1.5 my-3 col-span-2 text-center">
                Witchy Woman
              </td>
              <td className="mx-1.5 my-3 col-span-2 text-center">The Eagles</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
            </tr>
            <tr className="grid grid-cols-12 min-w-full">
              <td className="mx-1.5 my-3 col-span-2 text-center">
                Witchy Woman
              </td>
              <td className="mx-1.5 my-3 col-span-2 text-center">The Eagles</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
            </tr>
            <tr className="grid grid-cols-12 min-w-full">
              <td className="mx-1.5 my-3 col-span-2 text-center">
                Witchy Woman
              </td>
              <td className="mx-1.5 my-3 col-span-2 text-center">The Eagles</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
              <td className="mx-1.5 my-3 col-span-2 text-center">1972</td>
            </tr>
          </tbody>
        </table>
      </div>
      */
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
      <TicketStatus />
      <div className="shadow-md mt-5 rounded-md flex flex-col items-center px-5 py-16 bg-white">
        <EmptyList />
      </div>
    </div>
  );
}
export default Dashboard;
