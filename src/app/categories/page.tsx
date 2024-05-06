import prisma from "@/lib/prisma";
import { CategoryCard } from "./components/CategoriesCard";
import CategoriesForm from "./components/CategoriesForm";

export default async function Categories() {
  const categories = await prisma.category.findMany();
  return (
    <section className='flex flex-col'>
      <CategoriesForm />

      <span className='border-b-2 opacity-85 text-sm'>CATEGORIES</span>

      <div className='flex flex-col'>
        {categories.map((category) => (
          <CategoryCard key={category.category_id} category={category} />
        ))}
      </div>
    </section>
  );
}
