"use client";

import { Path, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface ProductInputProps {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string | undefined;
  error?: string;
  label: string;
}

export const TextInput = ({
  register,
  name,
  placeholder,
  error,
  label,
}: ProductInputProps) => {
  return (
    <>
      <div className='flex flex-col'>
        <label className='text-indigo-700 font-medium'>{label}:</label>
        <input
          className='border rounded py-1 px-2 outline-indigo-700'
          {...register(name)}
          placeholder={placeholder}
          type='text'
        />
        <span className='text-red-700 font-medium'>{error}</span>
      </div>
    </>
  );
};
