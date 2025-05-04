import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const ErrorAlert = (message: string = '', title = '¡Error!') => {
  return MySwal.fire({
    title: `<p class="text-red-500 text-xl font-bold">${title}</p>`,
    html: `<p class="text-white">${message}</p>`,
    icon: 'error',
    iconColor : 'red',
    background: '#000000',
    color: '#ffffff',
    confirmButtonText: 'Aceptar',
    confirmButtonColor : 'red',
    customClass: {
      popup: 'rounded-lg shadow-xl',
      confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
    },
  });
  };