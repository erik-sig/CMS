import { CategoryType } from "@/types/CategoryType";
import { useEffect, useState } from "react";
import {
  FieldError,
  Merge,
  UseFormRegister,
  UseFormResetField,
} from "react-hook-form";
import { ProductType } from "@/types/ProductType";

interface ChooseCategoryProps {
  categories: CategoryType[];
  register: UseFormRegister<any>;
  errors: Merge<FieldError, (FieldError | undefined)[]> | undefined;
  product: ProductType;
  resetField: UseFormResetField<{
    name: string;
    description: string;
    category_id: string;
    price: string;
    properties?: string[] | undefined;
  }>;
}

export const EditProductCategory = ({
  categories,
  register,
  resetField,
  errors,
  product,
}: ChooseCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>();

  useEffect(() => {
    setSelectedCategory(
      categories.find(
        (category) => category.category_id === product.category_id
      )
    );
  }, []);

  function handleFieldsChange(categoryID: string) {
    resetField("properties", { defaultValue: [] });
    const filteredCategories = categories.filter(
      (category) => category.category_id === categoryID
    );
    setSelectedCategory(filteredCategories[0]);
  }

  return (
    <>
      <div className='flex flex-col'>
        <label className='text-indigo-700  mb-0.5'>Category</label>
        <select
          {...register("category_id", {
            value: product.category_id === null ? "none" : product.category_id,
          })}
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
          <div key={property.propertyName} className='flex gap-2 mt-2'>
            <label className='text-indigo-700'>
              {property.propertyName.charAt(0).toUpperCase() +
                property.propertyName.slice(1)}
              :
            </label>

            <select
              {...register(`properties.${index}`, {
                value: product.properties?.[index],
              })}
              className='flex-1  outline-indigo-700 border-opacity-75'
            >
              {selectedCategory.properties[index].propertyValue
                .split(",")
                .map((value) => (
                  <option key={value} className='border-none' value={value}>
                    {value}
                  </option>
                ))}
            </select>
            <span className='text-red-700 font-medium'>
              {errors?.[index]?.message}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
