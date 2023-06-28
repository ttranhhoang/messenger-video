import { getConversationById } from "@/app/action/getConversationById";
import { getMessages } from "@/app/action/getMessages";
import Avatar from "@/components/Avatar";
import EmptyState from "@/components/EmptyState";
import HeaderConversation from "./component/HeaderConversation";
import BodyConversation from "./component/BodyConversation";
import FormConversation from "./component/FormConversation";

interface IParams {
  conversationId: string;
}
const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="h-full lg:pl-80">
        <div className="flex flex-col h-full">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="flex flex-col h-full">
        <HeaderConversation conversation={conversation} />
        <BodyConversation initialMessages={messages} />
        <FormConversation />
      </div>
    </div>
  );
};

export default ConversationId;
