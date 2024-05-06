import { ReactNode } from "react";

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className='w-full bg-white mt-4 mr-4 mb-4 rounded-2xl p-4'>
      {children}
    </main>
  );
};
