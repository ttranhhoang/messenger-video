"use client";
import Avatar from "@/components/Avatar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface IUserBox {
  user: User;
}

const UserBox = (props: IUserBox) => {
  const { user } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleClick = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((data) => {
        console.log("data", data);
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setLoading(false));
  }, [user, router]);

  return (
    <>
      {loading && <LoadingSpinner />}
      <div
        className="relative w-full flex items-center bg-white cursor-pointer p-2 space-x-3 rounded-lg hover:bg-neutral-100 transition"
        onClick={handleClick}
      >
        <Avatar user={user} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
