"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React, { useState } from "react";
import { BiBarChart, BiCart, BiHome } from "react-icons/bi";

import { FaChartBar, FaGear } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

export const Header = () => {
  const pathName = usePathname();

  const active = "bg-white text-indigo-700";

  async function handleLogout() {
    await signOut();
  }

  return (
    <header className='h-full w-64 text-white pl-4 pt-4 '>
      <h2 className='text-xl p-2'>E-commerce Admin</h2>

      <nav className='flex flex-col mt-4 gap-2 '>
        <Link
          href='/dashboard'
          className={`flex items-center gap-2 hover:bg-white hover:text-indigo-700 rounded-l-lg p-1 cursor-pointer ${
            pathName === "/dashboard" ? active : ""
          }`}
        >
          <BiHome size={32}></BiHome>
          Dashboard
        </Link>
        <Link
          href='/products'
          className={`flex items-center gap-2 hover:bg-white hover:text-indigo-700 rounded-l-lg p-1 cursor-pointer ${
            pathName === "/products" ? active : ""
          }`}
        >
          <BiCart size={32}></BiCart>
          Products
        </Link>
        <Link
          href='/categories'
          className={`flex items-center gap-2 hover:bg-white hover:text-indigo-700 rounded-l-lg p-1 cursor-pointer ${
            pathName === "/categories" ? active : ""
          }`}
        >
          <FaChartBar size={32} />
          Categories
        </Link>
        <Link
          href='/orders'
          className={`flex items-center gap-2 hover:bg-white hover:text-indigo-700 rounded-l-lg p-1 cursor-pointer ${
            pathName === "/orders" ? active : ""
          }`}
        >
          <BiBarChart size={32}></BiBarChart>
          Orders
        </Link>
        <Link
          href='/admins'
          className={`flex items-center gap-2 hover:bg-white hover:text-indigo-700 rounded-l-lg p-1 cursor-pointer ${
            pathName === "/admins" ? active : ""
          }`}
        >
          <FaChartBar size={32} />
          Admins
        </Link>
        <Link
          href='/settings'
          className={`flex items-center gap-2 hover:bg-white hover:text-indigo-700 rounded-l-lg p-1 cursor-pointer ${
            pathName === "/settings" ? active : ""
          }`}
        >
          <FaGear size={32} />
          Settings
        </Link>
        <div
          onClick={handleLogout}
          className='flex items-center gap-2 hover:bg-white hover:text-indigo-700 rounded-l-lg p-1 cursor-pointer mt-5'
        >
          <MdLogout size={32} />
          Logout
        </div>
      </nav>
    </header>
  );
};
