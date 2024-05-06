"use client";

import { TextInput } from "@/app/components/TextInput/TextInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { PropertyInput } from "./PropertyInput";
import { API } from "@/lib/api";
import { BiLoader } from "react-icons/bi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CategoryFormSchema = z.object({
  categoryName: z
    .string({ required_error: "Category name is required" })
    .min(1, { message: "Category name is required" }),
  properties: z
    .array(
      z.object({
        propertyName: z
          .string({ required_error: "Property name is required" })
          .min(1, { message: "Property name is required" }),
        propertyValue: z
          .string({ required_error: "Property value is required" })
          .min(1, { message: "Property value is required" }),
      })
    )
    .optional(),
});

export type CategoryForm = z.infer<typeof CategoryFormSchema>;

export default function CategoriesForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CategoryForm>({
    resolver: zodResolver(CategoryFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "properties",
    control,
  });

  async function handleSubmitNewCategorie(data: CategoryForm) {
    setLoading(true);
    await API.post("/api/category", {
      name: data.categoryName,
      properties: data.properties,
    }).then(() => {
      reset();
      setLoading(false);
      router.refresh();
    });
  }
  function addNewProperty() {
    append({ propertyName: "", propertyValue: "" });
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitNewCategorie)}>
        <TextInput
          register={register}
          name='categoryName'
          placeholder='Create new category...'
          label='Create new category'
          error={errors.categoryName?.message}
        />

        <button
          type='button'
          onClick={addNewProperty}
          className='p-2 bg-gray-800 text-white rounded-lg hover:bg-indigo-500 duration-150 mt-2 mb-2'
        >
          Add new property
        </button>

        <div className='flex flex-col gap-2'>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <PropertyInput
                  key={field.id}
                  register={register}
                  index={index}
                  remove={remove}
                  errors={errors.properties?.[index]}
                />
              </div>
            );
          })}
        </div>
        {loading ? (
          <button
            type='button'
            className='p-2 bg-indigo-700 text-white rounded-lg mb-5 hover:bg-indigo-500 duration-150 mt-2 w-14 h-10 flex justify-center items-center'
          >
            <BiLoader size={20} color='white' className='animate-spin' />
          </button>
        ) : (
          <button
            type='submit'
            className='p-2 bg-indigo-700 text-white rounded-lg mb-5 hover:bg-indigo-500 duration-150 mt-2 w-14 h-10'
          >
            Save
          </button>
        )}
      </form>
    </>
  );
}
