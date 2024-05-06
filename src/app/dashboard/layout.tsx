import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className='flex items-center'>
        <h1 className='text-lg flex-1'>
          Welcome,
          <span className='font-bold text-indigo-700'>
            {" " + session?.user.email}!
          </span>
        </h1>
        <div className='flex items-center bg-gray-300 rounded-xl'>
          <Image
            className='rounded-l-xl'
            src={session?.user.image as string}
            alt='Admin image'
            width={40}
            height={40}
            priority
            quality={100}
          ></Image>
          <span className='font-medium px-2'>{session?.user.name}</span>
        </div>
      </div>

      {children}
    </>
  );
}
