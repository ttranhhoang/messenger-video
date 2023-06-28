"use client";
import { User } from "@prisma/client";
import UserBox from "./UserBox";

interface IUsers {
  users: User[];
}
const UserList = (props: IUsers) => {
  const { users } = props;
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 w-full lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block left-0 lg:left-16">
      <div className="px-1.5">
        <div className="flex flex-col">
          <div className="text-xl font-bold text-neutral-800 py-4 px-1">
            People
          </div>
          {users.map((item) => (
            <UserBox key={item.id} user={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default UserList;
