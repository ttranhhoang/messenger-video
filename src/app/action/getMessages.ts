import prisma from "@/app/libs/prismadb";

export async function getMessages(conversationId: string) {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        conversationId: conversationId,
      },
      include: {
        seen: true,
        sender: true,
      },
    });
    return messages;
  } catch (error: any) {
    return [];
  }
}
