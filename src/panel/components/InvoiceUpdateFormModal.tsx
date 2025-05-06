import { modalStyles } from "../../common/assets/ts/styles";
import { Modal, Box } from '@mui/material';
import { InvoiceUpdateForm } from "./InvoiceUpdateForm";

type Props = {
    open : boolean
    onClose : () => void
    invoice : any
}

export const InvoiceUpdateFormModal = ({ open, onClose, invoice } : Props) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <InvoiceUpdateForm onClose={onClose} invoice={invoice} />
        </Box>
    </Modal>
  )
}


