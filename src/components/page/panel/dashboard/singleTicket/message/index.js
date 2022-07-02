import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
//pic
import defaulUser from "./../../../../../../../public/assets/img/user.png";
import inbox from "./../../../../../../../public/assets/img/inbox.png";

function TicketMessage({ isReplay, user, files, message, createdAt }) {
  moment.loadPersian({ usePersianDigits: false });
  return (
    <div
      className={`flex items-start ${
        isReplay ? "flex-row-reverse" : "flex-row"
      } gap-x-2 m-2.5 sm:m-5 p-1 sm:p-5`}
    >
      <img
        className="w-8 h-8 sm:w-14 sm:h-14 rounded-full"
        src={
          user && user.avatar
            ? `http://optivas.ir${user.avatar}`
            : defaulUser.src
        }
      />
      <div className="flex-grow flex flex-col gap-y-2">
        <div
          className={`${
            isReplay ? "rounded-tr-3xl" : "rounded-tl-3xl"
          } rounded-md bg-white shadow-sm p-4`}
        >
          <div
            className={`w-full flex items-center justify-between  ${
              isReplay ? "flex-row-reverse" : "flex-row"
            } pb-2 border-b`}
          >
            <span className="text-base sm:text-lg font-semibold">
              {user && user.fullName}
              {isReplay && (
                <span className="text-sm text-gray-500"> (admin) </span>
              )}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500">
              {moment(createdAt).format("YYYY/MM/DD  hh:mm")}
            </span>
          </div>
          <p className="text-sm sm:text-base py-2">{message}</p>
        </div>
        {files && files.length > 0 ? (
          <div className="rounded-md bg-white shadow-sm p-4">
            <a
              target={"_blank"}
              download
              href={`http://optivas.ir${files[0].file}`}
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
  );
}

export default TicketMessage;
