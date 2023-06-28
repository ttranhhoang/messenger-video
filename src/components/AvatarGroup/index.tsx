"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface IAvatarGroup {
  users: User[];
}
const AvatarGroup = (props: IAvatarGroup) => {
  const { users = [] } = props;
  const sliceUsers = users.slice(0, 3);
  const positionAvatar = {
    0: "top left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <div className="relative w-11 h-11">
      {sliceUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block overflow-hidden rounded-full h-[21px] w-[21px] ${positionAvatar[index as keyof typeof positionAvatar]}`}
        >
          <Image
            fill
            src={user?.image || "/images/placeholder.jpg"}
            alt="Avatar Group"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
