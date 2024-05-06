import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface ProductInputProps {
  register: UseFormRegister<any>;
  name: string;
  placeholder: string | undefined;
  error?: string;
  label: string;
  value: string;
}

export const EditInput = ({
  register,
  name,
  placeholder,
  error,
  label,
  value,
}: ProductInputProps) => {
  return (
    <>
      <div className='flex flex-col'>
        <label className='text-indigo-700'>{label}:</label>
        <input
          className='border rounded py-1 px-2 outline-indigo-700'
          {...register(name, {
            value: value,
          })}
          placeholder={placeholder}
          type='text'
        />
        <span className='text-red-700 font-medium'>{error}</span>
      </div>
    </>
  );
};
