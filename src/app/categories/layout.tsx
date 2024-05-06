import { ReactNode } from "react";
import CategoriesForm from "./components/CategoriesForm";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1 className='text-xl text-indigo-700 font-bold mb-5 border-b-2 border-indigo-700 w-fit'>
        Categories
      </h1>
      {children}
    </div>
  );
}
