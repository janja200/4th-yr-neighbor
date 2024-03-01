
import Sidebar from "@/components/messages/sidebar/sidebar";
import ConversationList from "./components/ConversationList";
import getUsers from "@/actions/messages/getUsers";
import getConversations from "@/actions/messages/getConversations";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (

    <Sidebar>
      <div className="h-full">
        <ConversationList 
          users={users} 
          title="Messages" 
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
