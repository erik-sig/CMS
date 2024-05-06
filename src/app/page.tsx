import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <h1>
      Welcome,<span className='text-lg font-bold'>{session?.user.name}!</span>
    </h1>
  );
}
