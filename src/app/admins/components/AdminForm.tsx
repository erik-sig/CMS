"use client";

import { TextInput } from "@/app/components/TextInput/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { API } from "@/lib/api";
import { useRouter } from "next/navigation";
import { AdminType } from "@/types/AdminType";
import { BiLoader } from "react-icons/bi";
import { useState } from "react";

const AdminFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter a google email..." })
    .refine((string) => string.includes("gmail.com"), {
      message: "Please enter a google email...",
    }),
});

type AdminFormType = z.infer<typeof AdminFormSchema>;

export const AdminForm = ({ admins }: { admins: AdminType[] }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AdminFormType>({
    resolver: zodResolver(AdminFormSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleAdminSubmit(data: AdminFormType) {
    const AlreadyExist = admins.filter((admin) => admin.email === data.email);
    setLoading(true);
    if (AlreadyExist.length === 0) {
      await API.post("/api/admins", {
        email: data.email,
      }).then(() => {
        router.refresh();
      });
    } else {
      alert("This email is already registered!");
    }
    setLoading(false);
  }
  return (
    <form
      className='flex flex-col gap-2 items-start '
      onSubmit={handleSubmit(handleAdminSubmit)}
    >
      <TextInput
        label='Admin Google Email'
        name='email'
        placeholder='Google email...'
        register={register}
        error={errors.email?.message}
      ></TextInput>
      {loading ? (
        <button
          type='button'
          className='p-2 bg-indigo-700 text-white rounded-lg mb-5 hover:bg-indigo-500 duration-150 mt-2 w-36 h-10 flex justify-center items-center'
        >
          <BiLoader size={20} color='white' className='animate-spin' />
        </button>
      ) : (
        <button
          type='submit'
          className='p-2 bg-indigo-700 text-white rounded-lg mb-5 hover:bg-indigo-500 duration-150 mt-2 w-36 h-10'
        >
          Add new admin
        </button>
      )}
    </form>
  );
};
