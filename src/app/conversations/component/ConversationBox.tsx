"use client";
import useOtherUser from "@/app/hook/useOtherUser";
import { FullConversationType } from "@/app/type";
import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface IConversationBox {
  data: FullConversationType;
  selected?: boolean;
}
const ConversationBox = (props: IConversationBox) => {
  const { data, selected } = props;
  const otherUser = useOtherUser(data);
  const router = useRouter();
  const session = useSession();

  const handleClick = () => {
    router.push(`/conversations/${data.id}`);
  };

  const lastMessages = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessages) return false;
    if (!userEmail) return false;
    const seenArray = lastMessages.seen || [];

    return seenArray.filter((item) => item.email === userEmail).length !== 0;
  }, [lastMessages, userEmail]);

  const lastMessagesText = useMemo(() => {
    if (lastMessages?.image) {
      return "Sent an image";
    }

    if (lastMessages?.body) {
      return lastMessages?.body;
    }

    return "Started a conversation";
  }, [lastMessages]);

  return (
    <div
      className={clsx(
        "flex items-center relative space-x-3 w-full p-2 rounded-lg hover:bg-neutral-100 cursor-pointer transition",
        selected ? "bg-neutral-100" : "bg-white"
      )}
      onClick={handleClick}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-900">
            {data.name || otherUser.name}
          </p>
          {lastMessages?.createdAt && (
            <p className="text-xs text-gray-400 font-light">
              {format(new Date(lastMessages.createdAt), "p")}
            </p>
          )}
        </div>
        <p
          className={clsx(
            "text-sm truncate",
            hasSeen ? "text-gray-500" : "text-black font-semibold"
          )}
        >
          {lastMessagesText}
        </p>
      </div>
    </div>
  );
};

export default ConversationBox;
