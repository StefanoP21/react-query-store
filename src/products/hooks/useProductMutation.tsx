import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { productActions } from '..';

export const useProductMutation = () => {
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: () => {
      Swal.fire({
        title: 'Producto creado',
        icon: 'success',
        timer: 1000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    },
  });

  return mutation;
};
