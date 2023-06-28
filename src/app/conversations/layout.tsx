import SideBar from "@/components/SideBar";
import getConversations from "../action/getConversations";
import ConversationList from "./component/ConversationList";
import getListUsers from "../action/getListUsers";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const users = await getListUsers();
  console.log(
    "mess",
    conversations.map((item) => item)
  );
  return (
  
    <SideBar>
      <div className="h-full">
        <ConversationList initialItem={conversations} users={users} />
        {children}
      </div>
    </SideBar>
  );
}
