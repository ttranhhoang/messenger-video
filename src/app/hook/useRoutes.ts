import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat, HiUser } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import useConversation from "./useConversation";

function useRoutes() {
  const pathName = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: HiChat,
        active: pathName === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUser,
        active: pathName === "/users",
      },
      {
        label: "Logout",
        href: "#",
        icon: HiArrowLeftOnRectangle,
        onClick: () => signOut({ redirect: true, callbackUrl: "/login" }),
      },
    ],
    [pathName, conversationId]
  );
  return routes;
}
export default useRoutes;
