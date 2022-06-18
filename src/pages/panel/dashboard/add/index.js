import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
//redux
import { useSelector } from "react-redux";
//service
import { PostTicket } from "../../../../services/ticket";
//component
import Layout from "../../../../components/page/panel/layout";
import Selection from "../../../../components/common/selection";
//svg
import { UploadIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const PriorityList = [
  {
    id: 1,
    title: "Low",
    value: "LO",
  },
  {
    id: 2,
    title: "Normal",
    value: "NO",
  },
  {
    id: 3,
    title: "Heigh",
    value: "HE",
  },
];

const SelectionList = [
  {
    id: 1,
    title: "Teachnical",
    value: "TE",
  },
  {
    id: 2,
    title: "Finance",
    value: "FI",
  },
  {
    id: 3,
    title: "Customer service ",
    value: "CU",
  },
];

function AddTicket() {
  const { user } = useSelector((state) => state);

  const [selectedPriority, setSelectedPriorityList] = useState({});
  const [selectedSection, setSelectedSelection] = useState({});

  const [dataSchema, setDataSchema] = useState({
    title: "",
    body: "",
    parent: "",
  });

  useEffect(() => {
    setDataSchema({
      ...dataSchema,
      id: user.id,
      token: user.token,
    });
  }, [user]);
  const router = useRouter();

  const goBackHandler = () => {
    router.back();
  };

  const dataSchemaHandler = (key, value) => {
    setDataSchema({
      ...dataSchema,
      [key]: value,
    });
  };

  const handleSelctedPriority = (id) => {
    setSelectedPriorityList(PriorityList.find((item) => item.id === id));
  };

  const handleSelectedSelection = (id) => {
    setSelectedSelection(SelectionList.find((item) => item.id === id));
  };

  const submitDataHandler = async () => {
    try {
      const { title, body, id, token } = dataSchema;
      console.log("userToken : ", token);
      const response = await PostTicket(
        {
          title,
          body,
          id,
          parent: 1,
          pariority: selectedPriority.value,
          section: selectedSection.value,
          status: "OP",
        },
        token
      );
      console.log("response : ", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="p-5 bg-[#F5F7FA] flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-semibold">Open new ticket</span>
            <p className="text-sm text-gray-500">
              <span className="text-blue-500">Users / Tickets </span>/ Create
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
        <div className="bg-white rounded-lg p-5 mt-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-x-5 w-full ">
            <div className="col-span-2 flex flex-col">
              <label>Subject:</label>
              <input
                value={dataSchema.title}
                onChange={(e) => {
                  dataSchemaHandler("title", e.target.value);
                }}
                className="border rounded-md my-2 text-lg py-1 px-2 outline-none"
                type={"text"}
              />
            </div>
            <div className="col-span-2 flex flex-col">
              <span>Priority</span>
              <Selection
                options={PriorityList}
                selectedOption={selectedPriority}
                handleOption={handleSelctedPriority}
              />
            </div>
            <div className="col-span-2 flex flex-col">
              <span>Section:</span>
              <Selection
                handleOption={handleSelectedSelection}
                options={SelectionList}
                selectedOption={selectedSection}
              />
            </div>
          </div>
          <div className="flex flex-col mb-5">
            <label>Message:</label>
            <textarea
              value={dataSchema.body}
              onChange={(e) => {
                dataSchemaHandler("body", e.target.value);
              }}
              className="border rounded-md py-1 px-2 min-h-[175px] outline-none"
            />
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
          <button
            onClick={submitDataHandler}
            className="bg-blue-700 hover:bg-blue-900 duration-200 text-white flex items-center gap-x-1 rounded-md px-4 py-2 mt-5"
          >
            <UploadIcon className="w-5" />
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default AddTicket;
