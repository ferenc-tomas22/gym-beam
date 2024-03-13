export type ProductsData = {
  filters: Filter[];
  items: Product[];
};

export type Product = {
  id: number;
  sku: string;
  name: string;
  price: number;
  formatted_price: string;
  product_url: string;
  image: string;
  thumbnail: string;
  small_image: string;
  reviews_count: number;
  rating_summary: number;
  saleable: boolean;
  form_inputs: string;
  form_action: string;
  labels: [];
};

export type Filter = {
  name: string;
  code: string;
  global_name: string;
  display_mode: string;
  type: string;
  position: string;
  options?: Option[];
};

export type Option = {
  name: string;
  slug: string;
  value: string;
  count: number;
};
