"use client";

import { API } from "@/lib/api";
import { AdminType } from "@/types/AdminType";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLoader } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";

export const AdminCard = ({ admin }: { admin: AdminType }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleDeleteAdmin() {
    setLoading(true);
    API.delete("/api/admins", {
      params: { id: admin.id },
    }).then(() => {
      router.refresh();
      setLoading(true);
    });
  }

  const dateNow = new Date();

  return (
    <div className='flex py-2 border-b-2 justify-between'>
      <span>{admin.email}</span>
      <div className='flex gap-28'>
        <span className='font-bold'>{admin.create_at?.toDateString()}</span>
        {loading ? (
          <button className='bg-red-700 p-0.5 rounded flex items-center gap-2'>
            <BiLoader size={20} color='white' className='animate-spin' />
            <span className='text-white'>DELETE</span>
          </button>
        ) : (
          <button
            onClick={handleDeleteAdmin}
            className='bg-red-700 p-0.5 rounded hover:opacity-75 duration-150 flex items-center gap-2'
          >
            <TbTrash size={20} color='white' />
            <span className='text-white'>DELETE</span>
          </button>
        )}
      </div>
    </div>
  );
};
