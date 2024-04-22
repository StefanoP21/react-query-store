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

      return { optimisticProduct }; // context
    },
    onSuccess: (product, _variables, context) => {
      Swal.fire({
        title: 'Producto creado',
        text: 'El producto ha sido creado exitosamente',
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
    onError: (error, variables, context) => {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      queryClient.setQueryData(
        ['products', { filterKey: variables?.category }],
        (oldData: Product[] | undefined) => {
          if (!oldData) return [];

          return oldData.filter(
            (cacheProduct) => cacheProduct.id !== context?.optimisticProduct.id
          );
        }
      );
    },
  });

  return mutation;
};
