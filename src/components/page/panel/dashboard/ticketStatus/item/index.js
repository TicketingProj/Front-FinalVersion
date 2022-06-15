function StatusItem({ title, bgColor, count, svg }) {
  return (
    <div
      className={`${bgColor} text-white flex items-center justify-between p-5 rounded-md`}
    >
      <div className="flex flex-col">
        <span className="text-2xl mb-2">{title}</span>
        <span className="text-xl">{count}</span>
      </div>
      {svg}
    </div>
  );
}

export default StatusItem;
