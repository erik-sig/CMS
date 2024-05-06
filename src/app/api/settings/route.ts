import prisma from "@/lib/prisma";

import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const data = await req.json();
  console.log(data.shipping_price);
  try {
    await prisma.settings.update({
      where: { id: data.id },
      data: {
        shipping_price: data.shipping_price,
      },
    });
    return NextResponse.json(
      { message: "Settings updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error to updated a setting" },
      { status: 401 }
    );
  }
}
