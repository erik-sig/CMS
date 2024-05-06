"use client";

import { useForm } from "react-hook-form";

import { API } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ProductType } from "@/types/ProductType";
import { EditInput } from "@/app/components/EditInput/EditInput";
import { CategoryType } from "@/types/CategoryType";
import { ProductForm } from "./FormProduct";
import { EditProductCategory } from "./EditProductCategory";
import { BiLoader } from "react-icons/bi";
import { useState } from "react";

interface EditFormProductProps {
  product: ProductType;
  categories: CategoryType[];
}

export default function EditFormProduct({
  product,
  categories,
}: EditFormProductProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<ProductForm>({});

  console.log(product);

  async function handleEditProductSubmit(data: ProductForm) {
    const id = product?.id;
    setLoading(true);
    await API.put("/api/products", {
      id,
      name: data.name,
      description: data.description,
      price: data.price,
      properties: data.properties,
      category_id: data.category_id,
      heroProduct: product.heroProduct,
    }).then(() => {
      router.replace("/products");
      router.refresh();
    });
  }
  return (
    <form
      onSubmit={handleSubmit(handleEditProductSubmit)}
      className='flex flex-col gap-2'
    >
      <EditInput
        label='Product Name'
        name='name'
        register={register}
        placeholder='Product name...'
        error={errors.name?.message}
        value={product?.name}
      ></EditInput>

      <EditInput
        label='Description'
        name='description'
        register={register}
        placeholder='Description name...'
        error={errors.description?.message}
        value={product?.description}
      ></EditInput>

      <EditProductCategory
        resetField={resetField}
        product={product}
        categories={categories}
        register={register}
        errors={errors.properties}
      ></EditProductCategory>

      <EditInput
        label='Price'
        name='price'
        register={register}
        placeholder='Product price...'
        error={errors.price?.message}
        value={product?.price}
      ></EditInput>

      {!loading ? (
        <button
          className='p-2 flex-1 bg-indigo-700 text-white rounded-lg hover:bg-indigo-500 duration-150'
          type='submit'
        >
          Edit
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
