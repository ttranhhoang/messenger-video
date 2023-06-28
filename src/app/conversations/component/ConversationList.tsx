"use client";
import useConversation from "@/app/hook/useConversation";
import { FullConversationType } from "@/app/type";
import { User } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import ModalGroupChat from "@/components/Modal/ModalGroupChat";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface IConversationList {
  initialItem: FullConversationType[];
  users: User[];
  title?: string;
}
const ConversationList = (props: IConversationList) => {
  const { initialItem, users, title } = props;
  const [items, setItems] = useState(initialItem);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();
  const { isOpen, conversationId } = useConversation();
  // console.log("ac", items);

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;
    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }
          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((item) => item.id !== conversation.id)];
      });
      if (conversationId === conversation.id) router.push("/conversations");
    };
    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);
  return (
    <>
      <ModalGroupChat
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        users={users}
      />
      <aside
        className={clsx(
          "fixed inset-y-0 pb-20 lg:pb-0 w-full lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block left-0 lg:left-16",
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-1.5">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-neutral-800 py-4 px-1">
              Messages
            </div>
            <div
              className="rounded-full bg-gray-100 hover:opacity-75 cursor-pointer p-2 text-gray-600 transition"
              onClick={() => setIsOpenModal(true)}
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
