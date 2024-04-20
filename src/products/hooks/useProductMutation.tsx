import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productActions } from '..';

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (data) => {
      Swal.fire({
        title: 'Producto creado',
        icon: 'success',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      queryClient.invalidateQueries({
        queryKey: ['products', { filterKey: data.category }],
      });
    },
  });

  return mutation;
};
