import prisma from "@/lib/prisma";
import FormProduct from "../components/FormProduct";

export default async function NewProduct() {
  const categories = await prisma.category.findMany();

  return <FormProduct categories={categories}></FormProduct>;
}
