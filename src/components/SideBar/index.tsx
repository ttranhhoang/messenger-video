import React from "react";
import DesktopSideBar from "./Desktop/DesktopSideBar";
import MobileSidebar from "./Mobile/MobileSidebar";
import getCurrentUser from "@/app/action/getCurrentUser";

export default async function SideBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSideBar currentUser={currentUser!} />
      <MobileSidebar />
      <main className="lg:pl-16 h-full">{children}</main>
    </div>
  );
}
