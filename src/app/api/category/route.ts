import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  const data = await req.json();

  try {
    await prisma.category.create({
      data: {
        name: data.name,
        properties: data.properties,
      },
    });
    return NextResponse.json(
      { message: "Category created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error to create a category" },
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

  const categoryID = searchParams.get("id");

  try {
    await prisma.product.updateMany({
      where: { category_id: categoryID as string },
      data: {
        properties: [],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error to deleted properties of product from the category" },
      { status: 401 }
    );
  }

  try {
    await prisma.category.delete({
      where: {
        category_id: categoryID as string,
      },
    });
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error to delete a category" },
      { status: 401 }
    );
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  const { id, name, properties } = await req.json();

  try {
    await prisma.category.update({
      where: {
        category_id: id as string,
      },
      data: {
        name,
        properties,
      },
    });
    return NextResponse.json(
      { message: "Category updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error to update a category" },
      { status: 401 }
    );
  }
}
