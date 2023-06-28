"use client";
import { FullMessageType } from "@/app/type";
import Avatar from "@/components/Avatar";
import ModalImage from "@/components/Modal/ModalImage";
import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IMessagesBox {
  data: FullMessageType;
  isLastMessage?: boolean;
}
const MessagesBox = (props: IMessagesBox) => {
  const { data, isLastMessage } = props;
  const [openImage, setOpenImage] = useState<boolean>(false);
  const session = useSession();
  const isOwner = session.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((item) => item.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx(
    "flex gap-3 p-4 items-center",
    isOwner && "justify-end"
  );
  const avatar = clsx("flex", isOwner && "order-2");
  const body = clsx("flex flex-col gap-1", isOwner && "items-end");
  const messages = clsx(
    "text-sm w-fit overflow-hidden",
    isOwner ? "bg-sky-500 text-white" : "bg-gray-100",
    data?.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm font-medium text-gray-500">
            {data.sender.name}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={messages}>
          <ModalImage
            isOpen={openImage}
            src={data?.image}
            onClose={() => setOpenImage(false)}
          />
          {data.image ? (
            <Image
              alt="Image"
              src={data.image}
              height="288"
              width="288"
              className="object-contain transition translate cursor-pointer hover:scale-110"
              onClick={() => setOpenImage(true)}
            />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLastMessage && isOwner && seenList.length > 0 && (
          <div className="text-xs text-gray-500 font-normal">
            Seen by {seenList}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesBox;
