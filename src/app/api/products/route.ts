import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not Authorized" }, { status: 401 });
  }

  const { name, description, price, category_id, properties, heroProduct } =
    await req.json();
  console.log(name, description, price, category_id, properties);
  try {
    await prisma.product.create({
      data: {
        name,
        description,
        price,
        category_id: category_id === "none" ? null : category_id,
        properties,
        heroProduct: heroProduct,
      },
    });
    return NextResponse.json(
      { message: "Product created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error to create a product" },
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

  const productID = searchParams.get("id");

  try {
    await prisma.product.delete({
      where: {
        id: productID as string,
      },
    });
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error to delete a product" },
      { status: 401 }
    );
  }
}

export async function PUT(req: Request) {
  const { id, name, description, properties, category_id, price, heroProduct } =
    await req.json();

  if (heroProduct === true) {
    try {
      await prisma.product.updateMany({
        data: {
          heroProduct: false,
        },
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Error to update all product to FALSE" },
        { status: 401 }
      );
    }
  }

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        properties,
        price,
        category_id: category_id === "none" ? null : category_id,
        heroProduct,
      },
    });
    return NextResponse.json(
      { message: "Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error to update a product" },
      { status: 401 }
    );
  }
}
