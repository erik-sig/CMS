import { CategoryType } from "@/types/CategoryType";
import { useState } from "react";
import {
  FieldError,
  FieldErrors,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface ChooseCategoryProps {
  categories: CategoryType[];
  register: UseFormRegister<any>;
  errors: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

export const ChooseCategory = ({
  categories,
  register,
  errors,
}: ChooseCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>();

  function handleFieldsChange(categoryID: string) {
    const filteredCategories = categories.filter(
      (category) => category.category_id === categoryID
    );
    setSelectedCategory(filteredCategories[0]);
  }

  return (
    <>
      <div className='flex flex-col'>
        <label className='text-indigo-700 font-medium mb-0.5'>Category</label>
        <select
          className='py-1 px-2 outline-indigo-700 border rounded'
          {...register("category_id")}
          onChange={(e) => handleFieldsChange(e.target.value)}
        >
          <option value={"none"}>None</option>
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gap-2'>
        {selectedCategory?.properties.map((property, index) => (
          <>
            <div key={property.propertyName} className='flex gap-2 mt-2'>
              <label className='text-indigo-700'>
                {property.propertyName.charAt(0).toUpperCase() +
                  property.propertyName.slice(1)}
                :
              </label>

              <select
                {...register(`properties.${index}`)}
                className='flex-1  outline-indigo-700 border-opacity-75'
              >
                {selectedCategory.properties[index].propertyValue
                  .split(",")
                  .map((value) => (
                    <>
                      <option key={value} className='border-none' value={value}>
                        {value}
                      </option>
                    </>
                  ))}
              </select>
            </div>
            <span className='text-red-700 font-medium'>
              {errors?.[index]?.message}
            </span>
          </>
        ))}
      </div>
    </>
  );
};
