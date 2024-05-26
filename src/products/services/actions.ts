import { type Product, type ProductForm, productsApi } from '..';

interface GetProductsOptions {
  filterKey?: string;
}

export const getProducts = async ({
  filterKey,
}: GetProductsOptions): Promise<Product[]> => {
  try {
    const filterUrl = filterKey ? `?category=${filterKey}` : '';
    const { data } = await productsApi.get<{
      ok: boolean;
      products: Product[];
    }>(`/products${filterUrl}`);

    if (typeof data !== 'object') {
      throw new Error('Invalid data type');
    }

    return data.products;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch products');
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data } = await productsApi.get<{ ok: boolean; product: Product }>(
      `/products/${id}`
    );

    if (typeof data !== 'object') {
      throw new Error('Invalid data type');
    }

    return data.product;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch product');
  }
};

export const createProduct = async (
  product: ProductForm
): Promise<ProductForm> => {
  try {
    const { data } = await productsApi.post<{
      ok: boolean;
      product: ProductForm;
    }>('/products', product);

    return data.product;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create product');
  }
};
