import getCurrentUser from "@/app/action/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParamsSeen {
  conversationId: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: IParamsSeen }
) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    if (!currentUser?.email || !currentUser?.id)
      return new NextResponse("Unauthorized", { status: 401 });
    //Find conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });
    if (!conversation) return new NextResponse("Invalid ID", { status: 400 });

    //Find last messages
    const lastMessages =
      conversation.messages[conversation.messages.length - 1];
    if (!lastMessages) return NextResponse.json(conversation);
    // Update seen of last messages
    const updatedMessages = await prisma.message.update({
      where: {
        id: lastMessages.id,
      },
      include: {
        seen: true,
        sender: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    await pusherServer.trigger(currentUser.email, "conversation:update", {
      id: conversationId,
      messages: [updatedMessages],
    });
    if (lastMessages.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherServer.trigger(
      conversationId,
      "messages:update",
      updatedMessages
    );

    return NextResponse.json(updatedMessages);
  } catch (error: any) {
    console.log("seeen ERROR", error);
    return new NextResponse("Invalid Error", { status: 500 });
  }
}
