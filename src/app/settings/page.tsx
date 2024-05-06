import prisma from "@/lib/prisma";
import SettingsOptions from "./components/SettingsOptions";

export default async function Settings() {
  const products = await prisma.product.findMany();

  const settings = await prisma.settings.findFirst();
  console.log(settings);

  if (!products || !settings) return;

  return (
    <div>
      <SettingsOptions
        products={products}
        settings={settings}
      ></SettingsOptions>
    </div>
  );
}
