//component
import StatusItem from "./item";

//svg
import { MailOpenIcon } from "@heroicons/react/solid";
import { ChatIcon } from "@heroicons/react/solid";
import { ReplyIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";

const status = [
  {
    id: 1,
    title: "Opened",
    bgColor: "bg-blue-800",
    count: 0,
    svg: <MailOpenIcon className="w-12 sm:w-16 opacity-50" />,
  },
  {
    id: 2,
    title: "Answered",
    bgColor: "bg-green-800",
    count: 0,
    svg: <ChatIcon className="w-12 sm:w-16 opacity-50" />,
  },
  {
    id: 3,
    title: "Closed",
    bgColor: "bg-red-800",
    count: 0,
    svg: <XIcon className="w-12 sm:w-16 opacity-50" />,
  },
];

function TicketStatus() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
      {status.map((item) => (
        <StatusItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export default TicketStatus;
