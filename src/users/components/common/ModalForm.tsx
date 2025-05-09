import { modalStyles } from "../../../common/assets/ts/styles";
import { Modal, Box } from '@mui/material';
import { UserProfileProps } from "../../ts/common/types";
import { UserForm } from "./UserForm";

type Props = {
    onClose : () => void,
    open : boolean,
    isAdminPage ?: boolean,
    userData ?: UserProfileProps
}

export const ModalForm = ({ onClose, open, userData, isAdminPage = false } : Props) => {

    const initialData : UserProfileProps = {
        user_ID : userData?.user_ID || null,
        name : userData?.name || '',
        email : userData?.email || '',
        cellphone : userData?.cellphone || '',
        password : '',
        address : userData?.address || '',
        role_ID : userData?.role_ID || 2
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <UserForm onClose={onClose} initialData={initialData} isAdminPage={isAdminPage} />
            </Box>
        </Modal>
    )
}

