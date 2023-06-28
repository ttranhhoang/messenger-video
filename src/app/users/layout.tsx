import SideBar from "@/components/SideBar";
import React from "react";
import getListUsers from "../action/getListUsers";
import UserList from "./component/UserList";
export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const listUsers = await getListUsers();
  console.log("list", listUsers);

  return (
   
    <SideBar>
      <div className="h-full">
        <UserList users={listUsers} />
        {children}
      </div>
    </SideBar>
  );
}
