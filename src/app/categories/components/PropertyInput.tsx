"use client";

import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { CategoryForm } from "./CategoriesForm";
import { MdCancel } from "react-icons/md";

interface PropertyInputProps {
  register: UseFormRegister<CategoryForm>;
  index: number;
  remove: UseFieldArrayRemove;
  errors:
    | Merge<
        FieldError,
        FieldErrorsImpl<{ propertyName: string; propertyValue: string }>
      >
    | undefined;
}

export function PropertyInput({
  register,
  index,
  remove,
  errors,
}: PropertyInputProps) {
  return (
    <>
      <div className='flex gap-2'>
        <input
          className='border-2 p-1 outline-indigo-700'
          type='text'
          placeholder='Property name...'
          {...register(`properties.${index}.propertyName`)}
        />
        <input
          className='border-2 p-1 outline-indigo-700'
          type='text'
          placeholder='Property value (use comma)'
          {...register(`properties.${index}.propertyValue`)}
        />
        <button type='button' onClick={() => remove(index)}>
          <MdCancel
            size={30}
            color='#b91c1c'
            className='hover:scale-105 duration-150 cursor-pointer'
          />
        </button>
      </div>
      <span className='text-red-700 font-medium'>
        {errors?.propertyName?.message || errors?.propertyValue?.message}
      </span>
    </>
  );
}
