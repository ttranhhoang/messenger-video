import getSession from "./getSession";
import prisma from "@/app/libs/prismadb";

export default async function getListUsers() {
  const session = await getSession();
  if (!session?.user?.email) return [];
  try {
    const listUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return listUsers;
  } catch (error: any) {
    return [];
  }
}
