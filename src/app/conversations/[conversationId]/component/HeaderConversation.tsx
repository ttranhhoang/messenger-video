"use client";
import useOtherUser from "@/app/hook/useOtherUser";
import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import { RootState } from "@/store";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import { useSelector } from "react-redux";
import ProfileDrawer from "./ProfileDrawer";

interface IHeader {
  conversation: Conversation & {
    users: User[];
  };
}
const HeaderConversation = (props: IHeader) => {
  const { conversation } = props;
  const otherUser = useOtherUser(conversation);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const members = useSelector((state: RootState) => state.members.members);
  const isActive = members.indexOf(otherUser.email!) !== -1;
  console.log("members", members);
  const statusText = useMemo(() => {
    if (conversation.isGroup) return `${conversation.users.length} members`;
    return isActive ? "Active" : "Offline";
  }, [conversation, isActive]);
  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
      <div className="flex justify-between items-center shadow-sm border-b-[1px] w-full bg-white px-4 py-2 lg:px-3">
        <div className="flex items-center gap-3">
          <Link
            href="/conversations"
            className="block lg:hidden cursor-pointer text-sky-500 hover:text-sky-600 transition"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              {conversation.name || otherUser.name}
            </div>
            <div className="text-xs font-normal text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <HiEllipsisHorizontal
          size={32}
          className="text-sky-500 hover:text-sky-600 cursor-pointer transition"
          onClick={() => setOpenDrawer(true)}
        />
      </div>
    </>
  );
};

export default HeaderConversation;
