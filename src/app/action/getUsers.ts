import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";
export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });
    const getUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: currentUser.email,
        },
      },
    });
    return NextResponse.json(getUsers);
  } catch (error: any) {
    console.log("Error get users", error);
    return []
  }
}
