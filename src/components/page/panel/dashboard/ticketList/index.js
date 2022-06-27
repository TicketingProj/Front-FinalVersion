import React, { useState } from "react";
//redux
import { useSelector } from "react-redux";
//service
import { GetSingleTickets } from "../../../../../services/ticket";
import { DeleteTicket } from "../../../../../services/ticket";
import { AddFileToTicket } from "../../../../../services/ticket";
//component
import TicketWrapper from "./ticketWrapper";
import TicketItem from "./ticketItem";
import DeleteTicketModal from "./ticketItem/deleteTicketModal";
import FileModal from "./ticketItem/fileModal";

function TicketList({ getListOfTicket, tickets }) {
  const { user } = useSelector((state) => state);
  const [deletemodalSchema, setDeleteModalSchema] = useState({
    isOpen: false,
    id: 0,
  });

  const [isSearchingFile, setIsSearchingFile] = useState(false);
  const [fileModalSchema, setFileModalSchema] = useState({
    prevFile: null,
    isOpen: false,
    id: 0,
  });

  const [isDeleteLoadingBtn, setIsDeleteLoadingBtn] = useState(false);
  const [isFileLoadingBtn, setIsFileLoadingBtn] = useState(false);

  const deleteModalHandler = (id) => {
    setDeleteModalSchema({
      isOpen: true,
      id,
    });
  };

  const fileModalHandler = (id) => {
    //get ticket to check have file
    getTikcet(id);
  };

  const getTikcet = async (_id) => {
    setIsSearchingFile(true);
    try {
      const response = await GetSingleTickets(user.token, _id);
      if (response.status === 202) {
        setFileModalSchema({
          isOpen: true,
          id: _id,
          prevFile: response.data.files,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsSearchingFile(false);
  };

  const addFileHandler = async (reqCondition, file) => {
    if (!reqCondition) {
      setFileModalSchema({
        isOpen: false,
      });
      return;
    }
    setIsFileLoadingBtn(true);
    try {
      const response = await AddFileToTicket({
        token: user.token,
        id: fileModalSchema.id,
        file,
      });
      if (response.status === 201) {
        setFileModalSchema({
          isOpen: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsFileLoadingBtn(false);
  };

  const deleteHandler = async (reqCondition) => {
    if (!reqCondition) {
      setDeleteModalSchema({
        isOpen: false,
      });
      return;
    }
    setIsDeleteLoadingBtn(true);
    try {
      const response = await DeleteTicket(user.token, deletemodalSchema.id);
      if (response.status === 204) {
        setDeleteModalSchema({
          isOpen: false,
        });
        getListOfTicket();
      }
    } catch (error) {
      console.log(error);
    }
    setIsDeleteLoadingBtn(false);
  };

  return (
    <>
      <TicketWrapper>
        {tickets.map((item, index) => (
          <TicketItem
            key={item.id}
            index={index}
            ticketItem={item}
            addFileHandler={fileModalHandler}
            deleteHandler={deleteModalHandler}
          />
        ))}
      </TicketWrapper>
      {deletemodalSchema.isOpen && (
        <DeleteTicketModal
          modalHandler={deleteHandler}
          isDeleteLoadingBtn={isDeleteLoadingBtn}
        />
      )}
      {fileModalSchema.isOpen && (
        <FileModal
          prevFile={fileModalSchema.prevFile}
          isSearching={isSearchingFile}
          isLoadingBtn={isFileLoadingBtn}
          modalHandler={addFileHandler}
        />
      )}
    </>
  );
}

export default TicketList;
