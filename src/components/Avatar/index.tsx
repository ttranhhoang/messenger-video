"use client";
import { RootState } from "@/store";
import { User } from "@prisma/client";
import Image from "next/image";
import { useSelector } from "react-redux";

interface IAvatar {
  user?: User;
}
const Avatar = (props: IAvatar) => {
  const { user } = props;
  const members = useSelector((state: RootState) => state.members.members);
  const isActive = members.indexOf(user?.email!) !== -1;
  return (
    <div className="relative">
      <div className="relative inline-block w-7 h-7 md:h-8 md:w-8 rounded-full overflow-hidden">
        <Image
          src={user?.image ?? "/images/placeholder.jpg"}
          fill
          alt="avatar"
          crossOrigin=""
          priority
        />
      </div>
      {isActive ? (
        <span className="absolute block bg-green-500 w-2 h-2 rounded-full top-0 right-0 ring-2 ring-white" />
      ) : null}
    </div>
  );
};

export default Avatar;
