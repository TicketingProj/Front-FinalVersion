import moment from "moment-jalaali";
import Link from "next/link";
//redux
import { useSelector } from "react-redux";
//custom hook
import useStatus from "../../../../../../helper/useStatus";
import UsePriority from "../../../../../../helper/usePriority";
//SVG
import { EyeIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/outline";
import { ArchiveIcon } from "@heroicons/react/outline";

function TicketItem({ index, ticketItem, deleteHandler, addFileHandler }) {
  moment.loadPersian({ usePersianDigits: false });

  const { user } = useSelector((state) => state);

  return (
    <tr
      className={`grid grid-cols-12 min-w-full ${
        index % 2 === 0 ? "bg-gray-100" : "bg-transparent"
      }`}
    >
      <td className="mx-1.5 my-3 col-span-2 text-center">{index + 1}</td>
      <td className="mx-1.5 my-3 col-span-2 text-center truncate">
        {ticketItem.title}
      </td>
      <td className="mx-1.5 my-3 col-span-2 text-center">
        {UsePriority(ticketItem.pariority)}
      </td>
      <td className="mx-1.5 my-3 col-span-2 text-center">
        {useStatus(ticketItem.status)}
      </td>
      <td className="mx-1.5 my-3 col-span-2 text-center">
        {moment(ticketItem.createdAt).format("YYYY/MM/DD")}
      </td>
      <td className="mx-1.5 my-3 col-span-2 text-center flex items-center gap-x-2.5 justify-center">
        <Link href={`/panel/dashboard/ticket/${ticketItem.id}`}>
          <a className="bg-blue-500 text-white py-0.5 px-3 border border-blue-500 hover:bg-transparent hover:text-blue-500 duration-200 h-full rounded-md">
            <EyeIcon className="w-5" />
          </a>
        </Link>
        {user.isSavior ? (
          <button
            onClick={() => deleteHandler(ticketItem.id)}
            className="bg-red-500 text-white py-0.5 px-3 h-full border border-red-500 hover:bg-transparent hover:text-red-500 duration-200 rounded-md"
          >
            <TrashIcon className="w-5" />
          </button>
        ) : (
          <button
            onClick={() => addFileHandler(ticketItem.id)}
            className="bg-yellow-500 text-white py-0.5 px-3 h-full border border-yellow-500 hover:bg-transparent hover:text-yellow-500 duration-200 rounded-md"
          >
            <ArchiveIcon className="w-5" />
          </button>
        )}
      </td>
    </tr>
  );
}

export default TicketItem;
