"use client";
import useRoutes from "@/app/hook/useRoutes";
import Avatar from "@/components/Avatar";
import { User } from "@prisma/client";
import DesktopItem from "./DesktopItem";
import { useState } from "react";
import SettingModal from "@/app/conversations/[conversationId]/component/SettingModal";

interface IDesktopSideBar {
  currentUser: User;
}
const DesktopSideBar = (props: IDesktopSideBar) => {
  const { currentUser } = props;
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // console.log("curr", { currentUser: currentUser });

  return (
    <>
      <SettingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentUser={currentUser}
      />
      <div className="h-full hidden lg:bg-white lg:border-r-[1px] lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-16 xl:px-6 lg:overflow-y-auto lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul className="flex flex-col items-center space-y-1">
            {routes.map((route) => (
              <DesktopItem
                key={route.label}
                label={route.label}
                href={route.href}
                active={route.active}
                icon={route.icon}
                onClick={route.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-center items-center">
          <div
            className="cursor-pointer hover:opacity-75 transition"
            onClick={() => setIsOpen(true)}
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSideBar;
