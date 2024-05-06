"use client";

import { TextInput } from "@/app/components/TextInput/TextInput";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { PropertyInput } from "./PropertyInput";
import { API } from "@/lib/api";
import { BiLoader } from "react-icons/bi";
import { CategoryType } from "@/types/CategoryType";
import { CategoryForm } from "./CategoriesForm";

export default function CategoriesForm({
  category,
}: {
  category: CategoryType;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<CategoryForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handlePropertyFields();
  }, []);

  function handlePropertyFields() {
    category.properties.map((field, index) => {
      append({
        propertyName: category.properties[index].propertyName,
        propertyValue: category.properties[index].propertyValue,
      });
    });
  }

  async function handleSubmitNewCategorie(data: CategoryForm) {
    setLoading(true);
    await API.put("/api/category", {
      id: category.category_id,
      name: data.categoryName,
      properties: data.properties,
    }).then(() => {
      router.replace("/categories");
      router.refresh();
    });
  }

  function addNewProperty() {
    append({
      propertyName: "",
      propertyValue: "",
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitNewCategorie)}>
        <div className='flex flex-col'>
          <label className='text-indigo-700'>Category Name</label>
          <input
            className='border rounded py-1 px-2 outline-indigo-700'
            type='text'
            {...register("categoryName", {
              value: category.name,
              onChange: (e) => setValue("categoryName", e.target.value),
              required: "Category name is required...",
            })}
            placeholder={category?.name}
          />
          <span className='text-red-700 font-medium'>
            {errors.categoryName?.message}
          </span>
        </div>

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
            className='p-2 bg-indigo-700 text-white rounded-lg mb-5 hover:bg-indigo-500 duration-150 mt-2 h-10 w-12 flex justify-center'
          >
            <BiLoader size={25} color='white' className='animate-spin' />
          </button>
        ) : (
          <button
            type='submit'
            className='p-2 bg-indigo-700 text-white rounded-lg mb-5 hover:bg-indigo-500 duration-150 mt-2 h-10 w-12'
          >
            Edit
          </button>
        )}
      </form>
    </>
  );
}
