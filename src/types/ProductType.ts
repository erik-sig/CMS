export interface ProductType {
  id: string;
  category_id: string | null;
  name: string;
  description: string;
  properties: string[];
  price: string;
  heroProduct: boolean;
}
