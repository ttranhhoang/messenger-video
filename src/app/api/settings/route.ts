import getCurrentUser from "@/app/action/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { name, image } = body;
    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    const updateInfoUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });
    return NextResponse.json(updateInfoUser);
  } catch (error: any) {
    console.log("Error settings modal", error);
    return new NextResponse("Invalid Error", { status: 500 });
  }
}
