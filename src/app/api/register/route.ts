import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    if (!name || !name || !password)
      return new NextResponse("Missing info", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);
    const createUser = await prisma?.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });
    return NextResponse.json(createUser);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
