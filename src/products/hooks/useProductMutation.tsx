import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (product) => {
      Swal.fire({
        title: 'Producto creado',
        icon: 'success',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      queryClient.setQueryData(
        ['products', { filterKey: product.category }],
        (oldData: Product[]) => {
          if (!oldData) return [product];
          return [...oldData, product];
        }
      );
    },
  });

  return mutation;
};
