import { useQueryClient } from '@tanstack/react-query';
import { productActions } from '..';

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  const prefetchProduct = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['product', { id }],
      queryFn: () => productActions.getProductById(id),
    });
  };

  return prefetchProduct;
};
