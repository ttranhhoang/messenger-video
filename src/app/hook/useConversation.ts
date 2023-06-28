import { useMemo } from "react";
import { useParams } from "next/navigation";
export default function useConversation() {
  const params = useParams();

  // hook use for checking conversationId on route
  // if conversationId show menu mobile
  const conversationId = useMemo(() => {
    if (!params?.conversationId) return "";

    return params.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
}
