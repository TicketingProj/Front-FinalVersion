import React, { useState, useEffect } from "react";
import Link from "next/dist/client/link";
//service
import { GetMyTicket } from "../../../../services/ticket";
import { GetAllTicket } from "../../../../services/ticket";
//redux
import { useSelector } from "react-redux";
//component
import EmptyList from "./emptyList";
import TicketStatus from "./ticketStatus";
import TicketList from "./ticketList";
//SVG
import { PlusIcon } from "@heroicons/react/solid";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [isLoadingTicket, setIsLoadingTicket] = useState(true);
  const { user } = useSelector((state) => state);

  useEffect(() => {
    if (user.token) getListOfTicket();
  }, [user]);

  const getListOfTicket = async (filter) => {
    setIsLoadingTicket(true);
    try {
      if (user.isSavior) {
        const response = await GetAllTicket(user.token, filter);
        if (response.status === 200) {
          setTickets(response.data.results);
        }
      } else {
        const response = await GetMyTicket(user.token, filter);
        if (response.status === 200) {
          setTickets(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoadingTicket(false);
  };

  return (
    <div className="p-5 bg-[#F5F7FA] flex-grow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <span className="text-xl font-semibold">My Tickets</span>
          <p className="text-sm text-gray-500">
            <span className="text-blue-500">Users</span> / Tickets
          </p>
        </div>
        <div className="flex flex-col sm:flex-row-reverse items-start sm:items-center  gap-x-2.5">
          {!user.isSavior ? (
            <Link href={"/panel/dashboard/add"}>
              <div className="my-3 hover:w-[135px] w-[45px] duration-200 cursor-pointer overflow-hidden flex items-center flex-nowrap py-2 px-3.5 gap-x-2.5 rounded-md bg-blue-700">
                <a className="text-white">
                  <PlusIcon className="w-5" />
                </a>
                <span className="text-white whitespace-nowrap">new ticket</span>
              </div>
            </Link>
          ) : (
            <span className="text-xl font-semibold ">Admin Panel</span>
          )}
        </div>
      </div>
      <TicketStatus getList={getListOfTicket} />
      {isLoadingTicket ? (
        <div className="min-w-[800px] w-full shadow-md rounded-md bg-white">
          <div
            className={`py-10 mt-5 rounded-md flex flex-row justify-center items-center `}
          >
            <div
              style={{ borderTopColor: "transparent" }}
              className="w-14 h-14 border-2 border-black border-solid rounded-full animate-spin"
            ></div>
          </div>
        </div>
      ) : tickets.length <= 0 ? (
        <EmptyList />
      ) : (
        <TicketList getListOfTicket={getListOfTicket} tickets={tickets} />
      )}
    </div>
  );
}
export default Dashboard;
