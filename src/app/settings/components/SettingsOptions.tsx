"use client";

import { EditInput } from "@/app/components/EditInput/EditInput";
import { API } from "@/lib/api";
import { ProductType } from "@/types/ProductType";
import { SettingsType } from "@/types/SettingsType";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ShippingPriceSchema = z.object({
  featured_product_id: z.string().optional(),

  shippingPrice: z
    .string()
    .min(1, { message: "Please enter shipping price..." }),
});

type ShippingPriceType = z.infer<typeof ShippingPriceSchema>;

interface SettingsOptionsProps {
  products: ProductType[];
  settings: SettingsType;
}

export default function SettingsOptions({
  products,
  settings,
}: SettingsOptionsProps) {
  const [successToSave, setSuccessToSave] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingPriceType>({
    resolver: zodResolver(ShippingPriceSchema),
  });
  const router = useRouter();

  async function handleSubmitSettings(data: ShippingPriceType) {
    console.log(data);
    await API.put("/api/settings", {
      id: settings.id,
      shipping_price: data.shippingPrice,
    }).then(() => {
      setSuccessToSave(true);
      setTimeout(() => {
        setSuccessToSave(false);
      }, 2500);
      router.refresh();
    });
    if (data.featured_product_id) {
      await API.put("/api/products", {
        id: data.featured_product_id,
        heroProduct: true,
      });
    }
  }
  return (
    <section>
      <form
        onSubmit={handleSubmit(handleSubmitSettings)}
        className='flex flex-col gap-5'
      >
        <div>
          {products.length !== 0 ? (
            <div className='flex flex-col'>
              <label className='text-indigo-700 font-medium'>
                Featured Product
              </label>
              <select
                {...register("featured_product_id")}
                className='py-1 px-2 outline-indigo-700 border rounded'
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <span className='text-lg font-bold'>
              NO PRODUCTS REGISTERED YET...
            </span>
          )}
        </div>
        <EditInput
          value={settings.shipping_price}
          label='Shipping price'
          name='shippingPrice'
          placeholder='Shipping price...'
          register={register}
          error={errors.shippingPrice?.message}
        ></EditInput>
        {successToSave ? (
          <button
            className='p-2 bg-indigo-700 text-white rounded-lg mb-5 duration-150 mt-2 cursor-not-allowed'
            type='button'
          >
            <span className='animate-ping'>Settings Saved!</span>
          </button>
        ) : (
          <button
            className='p-2 bg-indigo-700 text-white rounded-lg mb-5 hover:bg-indigo-500 duration-150 mt-2'
            type='submit'
          >
            Save settings
          </button>
        )}
      </form>
    </section>
  );
}
