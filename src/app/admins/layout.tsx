import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1 className='text-xl text-indigo-700 mb-5 font-bold border-b-2 border-indigo-700 w-fit'>
        Admins
      </h1>
      {children}
    </div>
  );
}
