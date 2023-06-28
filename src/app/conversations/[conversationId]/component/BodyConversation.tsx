"use client";
import { FullMessageType } from "@/app/type";
import MessagesBox from "./MessagesBox";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useConversation from "@/app/hook/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface IBodyConversation {
  initialMessages: FullMessageType[];
}
const BodyConversation = (props: IBodyConversation) => {
  const { initialMessages = [] } = props;
  const { conversationId } = useConversation();
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();
    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessages: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessages) => {
          if (currentMessages.id === newMessages.id) {
            return newMessages;
          }
          return currentMessages;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("messages:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("messages:update", updateMessageHandler);
    };
  }, [conversationId]);
  
  console.log("data", messages);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessagesBox
          key={message.id}
          data={message}
          isLastMessage={i === messages?.length - 1}
        />
      ))}
      <div className="pt-24" ref={bottomRef}></div>
    </div>
  );
};

export default BodyConversation;
