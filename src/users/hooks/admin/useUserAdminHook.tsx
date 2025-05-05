import { useState } from "react";
import * as UserAdminAPI from '../../API/admin/userAdmin';
import { ErrorAlert } from "../../../common/components/alerts/ErrorAlert";
import { UserProfileProps } from "../../ts/common/types";
import { ConfirmAlert } from "../../../common/components/alerts/ConfirmAlert";
import { SuccessAlert } from "../../../common/components/alerts/SuccessAlert";

export const useUserAdminHook = () => {
    const [ loading, setLoading ] = useState(false);
    const [ users, setUsers ] = useState<UserProfileProps[] | []>([]);
    const [ meta, setMeta ] = useState({
        total : 0,
        page : 0,
        limit : 0,
        last_page : 0
    });

    const getAllUsers = async (limit = 18, page = 1) => {
        try {   
            setLoading(true);
            const res = await UserAdminAPI.getAllUsers(limit, page);
            if(!res.status) throw new Error(res.message)
            setUsers(res.data.users);
            setMeta(res.data.meta);  
        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false)
        }
    }

    const deleteUser = async (user_ID : string) => {
        try {
            setLoading(true);

            const confirm = await ConfirmAlert('¿Deseas eliminar este usuario y su historial?');
            if(!confirm.isConfirmed){
                SuccessAlert('Acción cancelada correctamente')
                return;
            }

            const res = await UserAdminAPI.deleteUser(user_ID);
            if(!res.status) throw new Error(res.message);

            SuccessAlert(res.data.message);

        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        meta,
        users,
        getAllUsers,
        deleteUser
    }
}

