import { type Product, productsApi } from '..';

interface GetProductsOptions {
  filterKey?: string;
}

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const getProducts = async ({ filterKey }: GetProductsOptions) => {
  await sleep(1);

  const filterUrl = filterKey ? `?category=${filterKey}` : '';
  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`);

  return data;
};
