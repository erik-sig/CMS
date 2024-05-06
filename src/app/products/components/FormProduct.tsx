"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { TextInput } from "@/app/components/TextInput/TextInput";
import { CategoryType } from "@/types/CategoryType";
import { ChooseCategory } from "./ChooseCategory";
import { API } from "@/lib/api";
import { useState } from "react";
import { BiLoader } from "react-icons/bi";

const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name must exist..." }),
  description: z.string().min(1, { message: "Description must exist..." }),
  properties: z
    .array(z.string().min(1, { message: "Property must exist... " }))
    .optional(),
  category_id: z.string(),
  price: z.string().min(1, { message: "Price must exist..." }),
});

export type ProductForm = z.infer<typeof ProductSchema>;

export default function FormProduct({
  categories,
}: {
  categories: CategoryType[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(ProductSchema),
  });

  async function handleNewProductSubmit(data: ProductForm) {
    setLoading(true);
    await API.post("/api/products", {
      name: data.name,
      description: data.description,
      price: data.price,
      properties: data.properties,
      category_id: data.category_id,
      heroProduct: false,
    }).then(() => {
      setLoading(false);
      router.replace("/products");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleNewProductSubmit)}
      className='flex flex-col gap-2'
    >
      <TextInput
        register={register}
        placeholder='Product name...'
        name='name'
        error={errors.name?.message}
        label='Product name'
      />
      <TextInput
        register={register}
        placeholder='Product description...'
        name='description'
        error={errors.description?.message}
        label='Product description'
      />

      <ChooseCategory
        categories={categories}
        register={register}
        errors={errors.properties}
      ></ChooseCategory>

      <TextInput
        register={register}
        placeholder='Product price...'
        name='price'
        error={errors.price?.message}
        label='Price'
      />
      {!loading ? (
        <button
          className='p-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-500 duration-150'
          type='submit'
        >
          Save
        </button>
      ) : (
        <button
          className='p-2 bg-indigo-700 text-white rounded-lg duration-150 cursor-not-allowed flex justify-center'
          type='button'
        >
          <BiLoader size={24} color='white' className='animate-spin' />
        </button>
      )}
    </form>
  );
}
