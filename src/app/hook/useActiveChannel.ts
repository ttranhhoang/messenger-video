import { useEffect, useState } from "react";

import { add, remove, set } from "@/store/memberSlice";
import { Channel, Members } from "pusher-js";
import { useDispatch } from "react-redux";
import { pusherClient } from "../libs/pusher";

const useActiveChannel = async () => {
  const dispatch = useDispatch();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }

    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );
      dispatch(set(initialMembers));
      console.log("bind set", initialMembers);
    });

    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      dispatch(add(member.id));
      console.log("bind add");
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      dispatch(remove(member.id));
    });
    console.log("active channel", activeChannel);
    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messenger");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, dispatch]);
};
export default useActiveChannel;
