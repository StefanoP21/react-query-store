import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: (product) => {
      const optimisticProduct: Product = { id: Math.random(), ...product };

      queryClient.setQueryData(
        ['products', { filterKey: product.category }],
        (oldData: Product[] | undefined) => {
          if (!oldData) return [optimisticProduct];
          return [...oldData, optimisticProduct];
        }
      );

      return { optimisticProduct };
    },
    onSuccess: (product, _variables, context) => {
      Swal.fire({
        title: 'Producto creado',
        icon: 'success',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      queryClient.removeQueries({
        queryKey: ['product', context?.optimisticProduct.id],
      });

      queryClient.setQueryData(
        ['products', { filterKey: product.category }],
        (oldData: Product[] | undefined) => {
          if (!oldData) return [product];

          return oldData.map((cacheProduct) => {
            return cacheProduct.id === context?.optimisticProduct.id
              ? product
              : cacheProduct;
          });
        }
      );
    },
  });

  return mutation;
};
