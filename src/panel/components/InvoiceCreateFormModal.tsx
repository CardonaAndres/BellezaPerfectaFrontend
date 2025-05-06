import { modalStyles } from "../../common/assets/ts/styles";
import { Modal, Box } from '@mui/material';
import { InvoiceCreateForm } from "./InvoiceCreateForm";

type Props = {
    onClose : () => void,
    open : boolean,
}

export const InvoiceCreateFormModal = ({ onClose, open } : Props) => {

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <InvoiceCreateForm onClose={onClose} />
            </Box>
        </Modal>
    )
}

