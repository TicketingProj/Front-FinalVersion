function TicketWrapper({ children }) {
  return (
    <div className="overflow-auto shadow-md mt-8 ">
      <table className="min-w-[800px] w-full shadow-md rounded-md bg-white">
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
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default TicketWrapper;
