"use client";
import useRoutes from "@/app/hook/useRoutes";
import React from "react";
import MobileItem from "./MobileItem";
import useConversation from "@/app/hook/useConversation";

const MobileSidebar = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  console.log('isOpen', isOpen)
  if (isOpen) return null;

  return (
    <nav className="lg:hidden fixed w-full bottom-0 flex justify-between bg-white border-t-[1px] z-40 items-center">
      <ul className="flex items-center w-full">
        {routes.map((route) => (
          <MobileItem
            key={route.label}
            href={route.href}
            active={route.active}
            icon={route.icon}
            onClick={route.onClick}
          />
        ))}
      </ul>
    </nav>
  );
};

export default MobileSidebar;
