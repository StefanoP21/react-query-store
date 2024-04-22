import { type Product, type ProductForm, productsApi } from '..';

interface GetProductsOptions {
  filterKey?: string;
}

const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  await sleep(1);

  const filterUrl = filterKey ? `?category=${filterKey}` : '';
  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`);

  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  await sleep(1);

  const { data } = await productsApi.get<Product>(`/products/${id}`);

  return data;
};

export const createProduct = async (
  product: ProductForm
): Promise<ProductForm> => {
  await sleep(4);

  const { data } = await productsApi.post<ProductForm>('/products', product);

  return data;
};
