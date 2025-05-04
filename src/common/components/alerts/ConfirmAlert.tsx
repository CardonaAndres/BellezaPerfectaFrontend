import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const ConfirmAlert = async ( message = "¿Estás seguro de realizar esta acción?") => {

  return MySwal.fire({
    title: "Confirmación",
    text: message,
    icon: "warning",
    iconColor : 'yellow',
    background: "#000",
    color: "#fff",
    showCancelButton: true,
    confirmButtonColor: "#28a745", // Verde moderno
    cancelButtonColor: "#d9534f", // Rojo moderno
    confirmButtonText: "Sí, confirmar",
    cancelButtonText: "Cancelar",
    customClass: {
      popup: "swal-confirm-popup",
      title: 'swal-title',
      icon: 'swal-icon',
      confirmButton: 'swal-confirm-button',
      cancelButton: 'swal-cancel-button',
    },
  })

}