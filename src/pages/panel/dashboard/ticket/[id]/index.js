import React, { useState, useEffect } from "react";
import moment from "moment-jalaali";
import { useRouter } from "next/dist/client/router";
//custom hook
import UseStatus from "../../../../../helper/useStatus";
import UsePriority from "../../../../../helper/usePriority";
//redux
import { useSelector } from "react-redux";
//service
import { GetChildTikcet } from "../../../../../services/ticket";
import { EditTicket } from "../../../../../services/ticket";
import { PostTicket } from "../../../../../services/ticket";
import { GetSingleTickets } from "../../../../../services/ticket";
//component
import TicketMessage from "../../../../../components/page/panel/dashboard/singleTicket/message";
import Layout from "../../../../../components/page/panel/layout";
//svg
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { UploadIcon } from "@heroicons/react/outline";

function SingleTicket() {
  const router = useRouter();

  const [dataSchema, setDataSchema] = useState({
    title: "",
    body: "",
  });

  const [loading, setLoading] = useState(true);

  const [ticket, setTicket] = useState({
    ticket: "",
  });

  const [replyTicket, setReplyTicket] = useState({});
  const [replyLoadingBtn, setReplyLoadingBtn] = useState(false);
  const { user } = useSelector((state) => state);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getTicket();
    }
  }, [id]);

  const dataSchemaHandler = (key, value) => {
    setDataSchema({
      ...dataSchema,
      [key]: value,
    });
  };

  const getTicket = async () => {
    setLoading(true);
    try {
      const response = await GetSingleTickets(user.token, id);
      if (response.status === 202) {
        setTicket(response.data);
        if (response.data.ticket.parent !== null) {
          getChildTicket(response.data.ticket.parent);
        }
        if (user.isSavior === true && response.data.ticket.status === "OP") {
          setTicketInProgress(response.data.ticket);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getChildTicket = async (_id) => {
    try {
      const response = await GetSingleTickets(user.token, _id);
      setReplyTicket({ ...response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const setTicketInProgress = async (_ticket) => {
    try {
      const response = await EditTicket(
        {
          ticketId: _ticket.id,
          ..._ticket,
          status: "PR",
          id: user.id,
          // parent: 1,
        },
        user.token
      );
      getTicket();
    } catch (error) {
      console.log(error);
    }
  };

  const postAnswer = async () => {
    setReplyLoadingBtn(true);
    try {
      const response = await PostTicket(
        {
          title: dataSchema.title,
          body: dataSchema.body,
          id: user.id,
          pariority: "NO",
          section: "TE",
          status: "OP",
        },
        user.token
      );
      if (response.status === 200) {
        await addAnswerToTicket(response.data.id);
      }
      // console.log("response : ", response);
    } catch (error) {
      console.log(error);
    }
    setReplyLoadingBtn(false);
  };

  const goBackHandler = () => {
    router.back();
  };

  const addAnswerToTicket = async (ticketId) => {
    try {
      const response = await EditTicket(
        {
          ticketId: ticket.ticket.id,
          ...ticket.ticket,
          status: "CL",
          parent: ticketId,
          id: user.id,
        },
        user.token
      );
      getTicket();
    } catch (error) {
      console.log(error);
    }
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
                    : "bg-yellow-600"
                } text-sm sm:text-base p-2 text-white mx-1 rounded-md`}
              >
                {UseStatus(ticket.ticket.status)}
              </span>
            </div>
          </div>
          <div className="bg-[#F8F9FA] py-2">
            <TicketMessage
              isReplay={false}
              user={ticket.ticket.user}
              files={ticket.files}
              createdAt={ticket.ticket.createdAt}
              message={ticket.ticket.body}
            />
            {replyTicket && replyTicket.ticket && (
              <TicketMessage
                isReplay={true}
                user={replyTicket.ticket.user}
                files={replyTicket.files}
                createdAt={replyTicket.ticket.createdAt}
                message={replyTicket.ticket.body}
              />
            )}

            <span className="text-xs text-gray-500 m-5">
              last update{" "}
              {moment(ticket.ticket.updatedAt).format("YYYY/MM/DD  hh:mm")}
            </span>
          </div>
        </div>

        {/* this is admin */}
        {user.isSavior && ticket.ticket.status !== "CL" && (
          <div className="bg-white rounded-lg p-5 mt-8">
            <div className="col-span-2 flex flex-col">
              <label>Subject:</label>
              <input
                placeholder="Enter title ... "
                value={dataSchema.title}
                onChange={(e) => {
                  dataSchemaHandler("title", e.target.value);
                }}
                className="border rounded-md my-2 text-lg py-1 px-2 outline-none"
                type={"text"}
              />
            </div>
            <div className="flex flex-col gap-y-1 mb-5">
              <label>Replay Message:</label>
              <textarea
                placeholder="Enter your message ..."
                value={dataSchema.body}
                onChange={(e) => {
                  dataSchemaHandler("body", e.target.value);
                }}
                className="border rounded-md py-1 px-2 min-h-[175px] outline-none"
              />
            </div>

            {replyLoadingBtn ? (
              <div
                className={`w-[120px] h-[45px] flex flex-row justify-center items-center bg-[#515BE0] rounded-[10px] mt-5`}
              >
                <div
                  style={{ borderTopColor: "transparent" }}
                  className="w-6 h-6 border-2 border-white border-solid rounded-full animate-spin"
                ></div>
              </div>
            ) : (
              <button
                onClick={postAnswer}
                className="bg-blue-700 hover:bg-blue-900 duration-200 text-white flex items-center justify-center gap-x-1 rounded-md w-[120px] h-[45px] mt-5"
              >
                <UploadIcon className="w-5" />
                Send
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SingleTicket;
