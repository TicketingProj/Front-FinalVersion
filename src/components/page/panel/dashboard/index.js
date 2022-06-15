import React from "react";
import Link from "next/dist/client/link";

//component
import EmptyList from "./emptyList";
import TicketStatus from "./ticketStatus";
import TicketList from "./ticketList";
//SVG
import { PlusIcon } from "@heroicons/react/solid";

function Dashboard() {
  return (
    <div className="p-5 bg-[#F5F7FA] flex-grow">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xl font-semibold">My Tickets</span>
          <p className="text-sm text-gray-500">
            <span className="text-blue-500">Users</span> / Tickets
          </p>
        </div>
        <div className="flex items-center flex-row-reverse gap-x-2.5">
          <div>
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
          <Link href={"/panel/dashboard/add"}>
            <a className="bg-blue-700 text-white py-2 px-3.5 rounded-md">
              <PlusIcon className="w-5" />
            </a>
          </Link>
        </div>
      </div>
      <TicketStatus />
      <TicketList />
    </div>
  );
}
export default Dashboard;
