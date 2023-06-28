import getCurrentUser from "@/app/action/getCurrentUser";
import { FullConversationType } from "@/app/type";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
  conversationId: string;
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();
    const existingConverstaion = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    if (!currentUser?.id)
      return new NextResponse("Unauthorized", { status: 401 });
    if (!existingConverstaion)
      return new NextResponse("Invalid Id", { status: 400 });

    const deleteConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    existingConverstaion.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(
          user.email,
          "conversation:remove",
          existingConverstaion
        );
      }
    });
    return NextResponse.json(deleteConversation);
  } catch (error: any) {
    console.log("error Delete conversation modal", error);
    return new NextResponse("Invalid Error", { status: 500 });
  }
}
