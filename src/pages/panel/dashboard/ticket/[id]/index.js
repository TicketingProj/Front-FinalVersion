import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";
import { useRouter } from "next/dist/client/router";
//custom hook
import UseStatus from "../../../../../helper/useStatus";
import UsePriority from "../../../../../helper/usePriority";
//redux
import { useSelector } from "react-redux";
//service
import { GetSingleTickets } from "../../../../../services/ticket";
//component
import Layout from "../../../../../components/page/panel/layout";
//svg
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { UploadIcon } from "@heroicons/react/outline";
//pic
import defaulUser from "./../../../../../../public/assets/img/user.png";
import inbox from "./../../../../../../public/assets/img/inbox.png";

function SingleTicket() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [ticket, setTicket] = useState({
    ticket: "",
  });
  const { user } = useSelector((state) => state);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getTicket();
    }
  }, [id]);
  const getTicket = async () => {
    setLoading(true);
    try {
      const response = await GetSingleTickets(user.token, id);
      if (response.status === 202) {
        setTicket(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const goBackHandler = () => {
    router.back();
  };

  return (
    <Layout>
      {loading && (
        <div className="bg-black opacity-90 absolute h-screen w-screen flex items-center justify-center">
          <div
            className={`mt-5 text-center rounded-md grid md:grid-cols-3 grid-cols-1`}
          >
            <div
              style={{ borderTopColor: "transparent" }}
              className="w-16 h-16 border-2 border-white border-solid rounded-full animate-spin"
            ></div>
          </div>
        </div>
      )}
      <div className="p-5 bg-[#F5F7FA] flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-semibold">Ticket #{id}</span>
            <p className="text-sm text-gray-500">
              <span className="text-blue-500">Users / Tickets </span>/ #{id}
            </p>
          </div>
          <button
            className="bg-white hover:bg-[#fafbfc] flex items-center gap-x-1 border rounded-md py-2 px-4 duration-200"
            onClick={goBackHandler}
          >
            <ArrowLeftIcon className="w-4" />
            back
          </button>
        </div>
        <div className="shadow-md mt-8">
          <div className="flex items-center justify-between bg-white border-b  py-3 px-4">
            <span className="text-xl sm:text-2xl text-gray-600 font-medium">
              {ticket.ticket.title}
            </span>
            <div>
              <span
                className={`${
                  ticket.ticket.pariority === "HI"
                    ? "bg-red-900"
                    : ticket.ticket.pariority === "LO"
                    ? "bg-gray-600"
                    : "bg-green-600"
                } text-sm sm:text-base p-2 text-white bg-gray-600 mx-1 rounded-md`}
              >
                {UsePriority(ticket.ticket.pariority)}
              </span>
              <span
                className={`${
                  ticket.ticket.status === "OP"
                    ? "bg-blue-600"
                    : ticket.ticket.status === "CL"
                    ? "bg-red-600"
                    : ""
                } text-sm sm:text-base p-2 text-white mx-1 rounded-md`}
              >
                {UseStatus(ticket.ticket.status)}
              </span>
            </div>
          </div>
          <div className="bg-[#F8F9FA] py-2">
            <div className="flex items-start gap-x-2 m-2.5 sm:m-5 p-1 sm:p-5">
              <img
                className="w-8 h-8 sm:w-14 sm:h-14 rounded-full"
                src={user.avatar ? user.avatar : defaulUser.src}
              />
              <div className="flex-grow flex flex-col gap-y-2">
                <div className="rounded-tl-3xl rounded-md bg-white shadow-sm p-4">
                  <div className="w-full flex items-center justify-between pb-2 border-b">
                    <span className="text-base sm:text-lg font-semibold">
                      {user.fullName}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      {moment(ticket.ticket.createdAt).format(
                        "YYYY/MM/DD  hh:mm"
                      )}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base py-2">
                    {ticket.ticket.body}
                  </p>
                </div>
                {ticket.files && ticket.files.length > 0 ? (
                  <div className="rounded-md bg-white shadow-sm p-4">
                    <a
                      target={"_blank"}
                      download
                      href={`http://optivas.ir${ticket.files[0].file}`}
                      className="flex items-center gap-x-2 group"
                    >
                      <img className="w-8" src={`${inbox.src}`} />
                      <span className="group-hover:text-blue-500 duration-200">
                        Uploaded file
                      </span>
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <span className="text-xs text-gray-500 m-5">
              last update{" "}
              {moment(ticket.ticket.updatedAt).format("YYYY/MM/DD  hh:mm")}
            </span>
          </div>
        </div>

        {/* this is admin */}
        {/* <div className="bg-white rounded-lg p-5 mt-8">
          <div className="flex flex-col gap-y-1 mb-5">
            <label>Replay Message:</label>
            <textarea className="border rounded-md py-1 px-2 min-h-[175px] outline-none" />
          </div>
          <div className="flex flex-col gap-y-2">
            <label>
              Files : (<span className="font-semibold">Supported types</span> :
              JPG, JPEG, PNG, PDF)
            </label>
            <div className="flex items-center justify-between h-[45px]">
              <div className="h-full flex-grow flex items-center border rounded-l-md">
                <button className="h-full px-2 border-r bg-[#F5F7FA]">
                  Choose File
                </button>
                <span className="px-2">No File Chosen</span>
              </div>
              <button className="w-fit h-full px-4 text-3xl border border-[#212529] hover:bg-white hover:text-[#212529] duration-200 bg-[#212529] text-white rounded-r-md">
                +
              </button>
            </div>
          </div>
          <button className="bg-blue-700 hover:bg-blue-900 duration-200 text-white flex items-center gap-x-1 rounded-md px-4 py-2 mt-5">
            <UploadIcon className="w-5" />
            Send
          </button>
        </div> */}
      </div>
    </Layout>
  );
}

export default SingleTicket;
