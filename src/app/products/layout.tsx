import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1 className='w-fit text-xl text-indigo-700 font-bold mb-5 border-b-2 border-indigo-700'>
        Products
      </h1>

      {children}
    </div>
  );
}
