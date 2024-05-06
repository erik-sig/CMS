"use client";

import { ProductType } from "@/types/ProductType";
import { API } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiEdit, BiLoader } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";

export const ProductCard = ({ product }: { product: ProductType }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    API.delete("/api/products", { params: { id: product.id } }).then(() => {
      router.refresh();
    });
  }

  return (
    <div className='text-lg flex items-center gap-2 '>
      <h1 className='text-lg flex-1'>{product.name}</h1>
      <Link href={`/products/${product.id}`}>
        <button className='bg-black p-0.5  rounded hover:opacity-75 duration-150 flex items-center gap-2'>
          <BiEdit size={20} color='white' />
          <span className='text-white'>EDIT</span>
        </button>
      </Link>
      {loading ? (
        <button className='bg-red-700 p-0.5 rounded flex items-center gap-2'>
          <BiLoader size={20} color='white' className='animate-spin' />
          <span className='text-white'>DELETE</span>
        </button>
      ) : (
        <button
          onClick={handleDelete}
          className='bg-red-700 p-0.5 rounded hover:opacity-75 duration-150 flex items-center gap-2'
        >
          <TbTrash size={20} color='white' />
          <span className='text-white'>DELETE</span>
        </button>
      )}
    </div>
  );
};
