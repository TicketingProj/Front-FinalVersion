import React, { useState } from "react";
import Link from "next/dist/client/link";

//component
import Selection from "../../../common/selection";
import EmptyList from "./emptyList";
import TicketStatus from "./ticketStatus";
import TicketList from "./ticketList";
//SVG
import { PlusIcon } from "@heroicons/react/solid";

const TicketStatusList = [
  {
    id: 1,
    title: "All",
    value: "All",
  },
  {
    id: 2,
    title: "Open",
    value: "OP",
  },
  {
    id: 3,
    title: "Inprogress",
    value: "IN",
  },
  {
    id: 4,
    title: "Close",
    value: "Cl",
  },
];

function Dashboard() {
  const [selectedStatus, setSelectedStatus] = useState({
    id: 1,
    title: "All",
    value: "All",
  });

  const selectedStatusHandler = (id) => {
    setSelectedStatus(TicketStatusList.find((item) => item.id === id));
  };

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
          <div className="w-52">
            <Selection
              handleOption={selectedStatusHandler}
              options={TicketStatusList}
              selectedOption={selectedStatus}
            />
          </div>
          <Link href={"/panel/dashboard/add"}>
            <div className="hover:w-[135px] w-[45px] duration-200 cursor-pointer overflow-hidden flex items-center flex-nowrap py-2 px-3.5 gap-x-2.5 rounded-md bg-blue-700">
              <a className="text-white">
                <PlusIcon className="w-5" />
              </a>
              <span className="text-white whitespace-nowrap">new ticket</span>
            </div>
          </Link>
        </div>
      </div>
      <TicketStatus />
      <TicketList />
    </div>
  );
}
export default Dashboard;
