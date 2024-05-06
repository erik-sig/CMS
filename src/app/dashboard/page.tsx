import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();

  return (
    <section className='grid justify-center grid-cols-1 md:grid-cols-3 items-center gap-10 mt-10 p-5'>
      <div className='p-6 rounded bg-gray-100 flex flex-col items-center hover:scale-110 hover:bg-gray-200 duration-150 cursor-pointer'>
        <strong className='text-2xl md:text-3xl text-indigo-700'>
          Products
        </strong>
        <span className='text-2xl font-bold'>{products.length}</span>
      </div>
      <div className='p-6 rounded  bg-gray-100 flex flex-col items-center hover:scale-110 hover:bg-gray-200 duration-150 cursor-pointer'>
        <strong className='text-2xl md:text-3xl text-indigo-700'>
          Categories
        </strong>
        <span className='text-2xl font-bold'>{categories.length}</span>
      </div>
      <div className='p-6 rounded  bg-gray-100 flex flex-col items-center hover:scale-110 hover:bg-gray-200 duration-150 cursor-pointer'>
        <strong className='text-2xl md:text-3xl text-indigo-700'>Orders</strong>
        <span className='text-2xl font-bold'>0</span>
      </div>
    </section>
  );
}
