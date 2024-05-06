"use client";

import { TbTrash } from "react-icons/tb";
import { CategoryType } from "@/types/CategoryType";
import { API } from "@/lib/api";
import { useRouter } from "next/navigation";
import { BiEdit, BiLoader } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";

export function CategoryCard({ category }: { category: CategoryType }) {
  const router = useRouter();
  const [loadingCard, setLoadingCard] = useState(false);

  async function handleDeleteCategory() {
    setLoadingCard(true);
    await API.delete("/api/category", {
      params: { id: category.category_id },
    }).then(() => {
      router.refresh();
      setLoadingCard(false);
    });
  }

  return (
    <div className='flex flex-col py-2 border-b-2'>
      <div className='text-lg pl-1 flex items-center gap-2'>
        <span className='flex-1 truncate'>{category.name}</span>
        <Link href={`/categories/${category.category_id}`}>
          <button className='bg-black p-0.5  rounded hover:opacity-75 duration-150 flex items-center gap-2'>
            <BiEdit size={20} color='white' />
            <span className='text-white'>EDIT</span>
          </button>
        </Link>
        {loadingCard ? (
          <button className='bg-red-700 p-0.5 rounded flex items-center gap-2'>
            <BiLoader size={20} color='white' className='animate-spin' />
            <span className='text-white'>DELETE</span>
          </button>
        ) : (
          <button
            onClick={handleDeleteCategory}
            className='bg-red-700 p-0.5 rounded hover:opacity-75 duration-150 flex items-center gap-2'
          >
            <TbTrash size={20} color='white' />
            <span className='text-white'>DELETE</span>
          </button>
        )}
      </div>
    </div>
  );
}
