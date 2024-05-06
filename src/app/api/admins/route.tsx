import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  const { email } = await req.json();
  console.log(email);

  try {
    await prisma.admins.create({
      data: { email },
    });

    return NextResponse.json(
      { message: "Admin created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create admin" },
      { status: 401 }
    );
  }
}
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const adminId = searchParams.get("id");

  try {
    await prisma.admins.delete({
      where: {
        id: adminId as string,
      },
    });

    return NextResponse.json(
      { message: "Admin created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create admin" },
      { status: 401 }
    );
  }
}
