import prisma from "@/lib/prisma";
import { AdminForm } from "./components/AdminForm";
import { AdminCard } from "./components/AdminCard";

export default async function Admins() {
  const admins = await prisma.admins.findMany();

  return (
    <section>
      <AdminForm admins={admins} />
      <div className='mt-5'>
        <span className='border-b-2 opacity-85 text-sm'>
          ADMINS WITH GOOGLE EMAIL
        </span>
        {admins.map((admin) => (
          <AdminCard admin={admin} />
        ))}
      </div>
    </section>
  );
}
