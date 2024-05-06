import prisma from "@/lib/prisma";
import CategoryEditForm from "../components/CategoryEditForm";

export default async function ({ params: id }: { params: { id: string } }) {
  const category = await prisma.category.findFirst({
    where: { category_id: id.id },
  });

  if (category == null) {
    return;
  }

  return (
    <div>
      <CategoryEditForm category={category} />
    </div>
  );
}
