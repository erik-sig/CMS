import prisma from "@/lib/prisma";
import EditFormProduct from "../components/EditFormProduct";

export default async function ({ params: id }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: id,
  });
  console.log(product);
  const categories = await prisma.category.findMany({});
  console.log(categories);
  if (!categories || !product) return;
  return (
    <div>
      <h1 className='border-b-2 mb-5'>Edit product</h1>
      <EditFormProduct product={product} categories={categories} />
    </div>
  );
}
