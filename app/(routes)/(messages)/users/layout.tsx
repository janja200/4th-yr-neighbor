import Sidebar from "@/components/messages/sidebar/sidebar";
import UserList from "./components/UserList";
import getUsers from "@/actions/messages/getUsers";

export default async function UsersLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}