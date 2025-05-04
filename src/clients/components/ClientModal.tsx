import { modalStyles } from "../../common/assets/ts/styles";
import { Modal, Box } from '@mui/material';
import { ClientForm } from "./ClientForm";
import { Client } from "../ts/types";

type Props = {
    onClose : () => void,
    open : boolean,
    clientData ?: Client
}

export const ClientModal = ({ onClose, open, clientData } : Props) => {
    const initialData : Client = {
        client_ID : clientData?.client_ID || null,
        document_type : clientData?.document_type || '',
        name : clientData?.name || '',
        city : clientData?.city || '',
        zone : clientData?.zone || '',
        neighborhood : clientData?.neighborhood || '',
        address : clientData?.address || '',
        cellphone : clientData?.cellphone || ''
    }   

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <ClientForm initialData={initialData} onClose={onClose} />
            </Box>
        </Modal>
    )
}


