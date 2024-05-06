"use client";

import { signIn, useSession } from "next-auth/react";
import { ReactNode } from "react";
import { FiLoader } from "react-icons/fi";

export const Container = ({ children }: { children: ReactNode }) => {
  const { status } = useSession();

  async function handleLogin() {
    await signIn("google");
  }

  return (
    <>
      {status === "unauthenticated" ? (
        <div className='h-dvh w-dvw bg-indigo-700 flex justify-center'>
          <button
            className='m-auto w-48 bg-white rounded-2xl p-2 text-center cursor-pointer hover:opacity-70'
            onClick={handleLogin}
          >
            Login with Google
          </button>
        </div>
      ) : status === "loading" ? (
        <div className='h-dvh w-dvw bg-indigo-700 flex justify-center items-center'>
          <FiLoader className='animate-spin' color='white' size={100} />
        </div>
      ) : (
        <div className='h-dvh w-dvw bg-indigo-700 flex'>{children}</div>
      )}
    </>
  );
};
