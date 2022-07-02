import React, { useState, useEffect } from "react";
//component
import StatusItem from "./item";
import Selection from "../../../../common/selection";
//svg
import { SearchIcon } from "@heroicons/react/outline";
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
    value: "PR",
  },
  {
    id: 4,
    title: "Close",
    value: "CL",
  },
];

const PriorityList = [
  {
    id: 1,
    title: "All",
    value: "All",
  },
  {
    id: 2,
    title: "Low",
    value: "LO",
  },
  {
    id: 3,
    title: "Normal",
    value: "NO",
  },
  {
    id: 4,
    title: "High",
    value: "HI",
  },
];

const SelectionList = [
  {
    id: 1,
    title: "All",
    value: "All",
  },
  {
    id: 2,
    title: "Teachnical",
    value: "TE",
  },
  {
    id: 3,
    title: "Finance",
    value: "FI",
  },
];

function TicketStatus({ getList }) {
  const [search, setSearch] = useState("");

  const [selectedStatus, setSelectedStatus] = useState({
    id: 1,
    title: "All",
    value: "All",
  });
  const [selectedPriority, setSelectedPriorityList] = useState({
    id: 1,
    title: "All",
    value: "All",
  });
  const [selectedSection, setSelectedSelection] = useState({
    id: 1,
    title: "All",
    value: "All",
  });

  const [searchFeild, setSearchFeild] = useState("title");

  const selectedStatusHandler = (id) => {
    setSelectedStatus(TicketStatusList.find((item) => item.id === id));
  };

  const handleSelctedPriority = (id) => {
    setSelectedPriorityList(PriorityList.find((item) => item.id === id));
  };

  const handleSelectedSelection = (id) => {
    setSelectedSelection(SelectionList.find((item) => item.id === id));
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const getFiltredList = () => {
    let filter = "?";
    if (selectedStatus.title !== "All") {
      filter += `status=${selectedStatus.value}&`;
    }
    if (selectedSection.title !== "All") {
      filter += `section=${selectedSection.value}&`;
    }
    if (selectedPriority.title !== "All") {
      filter += `pariority=${selectedPriority.value}&`;
    }
    if (search.trim().length > 0) {
      filter += `${searchFeild}=${search}`;
    }
    getList(filter);
  };

  return (
    <div className="p-3 my-5 border rounded-md shadow-sm">
      <span className="text-xl font-semibold">filter</span>
      <div className="grid md:grid-cols-3 grid-cols-1 ">
        <div className="flex items-center justify-center gap-x-2 mx-2">
          <span className="text-lg">Status </span>
          <div className="w-52">
            <Selection
              handleOption={selectedStatusHandler}
              options={TicketStatusList}
              selectedOption={selectedStatus}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-2 mx-2">
          <span className="text-lg">Priority </span>
          <div className="w-52">
            <Selection
              handleOption={handleSelctedPriority}
              options={PriorityList}
              selectedOption={selectedPriority}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-2 mx-2">
          <span className="text-lg">Section </span>
          <div className="w-52">
            <Selection
              handleOption={handleSelectedSelection}
              options={SelectionList}
              selectedOption={selectedSection}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col sm:flex-row gap-x-2 mt-2">
        <div className="flex items-center gap-x-2">
          <label className="text-lg">Search </label>
          <input
            placeholder="what you are looking for ... "
            value={search}
            onChange={searchHandler}
            className="border rounded-md my-2 text-lg py-1 px-2 outline-none placeholder:text-base w-full"
            type={"text"}
          />
        </div>
        <div className="flex items-center bg-white w-fit rounded-lg">
          <button
            onClick={() => {
              setSearchFeild("title");
            }}
            className={`${
              searchFeild === "title" ? "bg-blue-500 text-white" : ""
            } px-2 py-1 rounded-lg duration-200`}
          >
            title
          </button>
          <button
            onClick={() => {
              setSearchFeild("body");
            }}
            className={`${
              searchFeild === "body" ? "bg-blue-500 text-white" : ""
            } px-2 py-1 rounded-lg duration-200`}
          >
            body
          </button>
        </div>
      </div>
      <button
        onClick={getFiltredList}
        className="bg-blue-600 hover:bg-blue-900 flex items-center gap-x-1.5 duration-200 text-lg text-white rounded-md px-5 py-1.5"
      >
        search
        <SearchIcon className="w-5" />
      </button>
    </div>
  );
}

export default TicketStatus;
