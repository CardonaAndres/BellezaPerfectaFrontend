import '../../assets/css/alerts.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const SuccessAlert = (message:string = 'La operación fue completada correctamente.') => {
    MySwal.fire({
        title: <strong>¡Éxito!</strong>,
        html: <i> {message} </i>,
        icon: 'success',
        iconColor : '#FFD700',
        background: 'black', // negro profundo
        color: '#FFD700', // texto dorado
        confirmButtonColor: '#FFD700', // botón dorado
        confirmButtonText: 'Continuar',
        customClass: {
          popup: 'black-gold-alert',
          title: 'black-gold-title',
          htmlContainer: 'black-gold-text',
          confirmButton: 'black-gold-button'
        }
      });
};