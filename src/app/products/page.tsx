import prisma from "@/lib/prisma";

import { ProductCard } from "./components/ProductCard";
import Link from "next/link";

export default async function Products() {
  const products = await prisma.product.findMany();

  return (
    <section className='flex flex-col'>
      <Link href='/products/new'>
        <button className='p-2 bg-indigo-700 text-white rounded-lg mb-5 hover:bg-indigo-500 duration-150'>
          Add product
        </button>
      </Link>

      <span className='border-b-2 opacity-85 text-sm'>PRODUCTS</span>
      {products.length === 0 ? (
        <span className='text-lg font-bold mt-2'>
          NO PRODUCTS REGISTERED YET...
        </span>
      ) : (
        <div className='flex flex-col gap-2 mt-2'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
