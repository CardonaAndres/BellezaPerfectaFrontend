import { useState } from "react";
import * as UserCommonAPI from '../../API/common/userCommon';
import { registerUser } from "../../API/admin/userAdmin";
import { ErrorAlert } from "../../../common/components/alerts/ErrorAlert";
import { UserProfileProps } from "../../ts/common/types";
import { SuccessAlert } from "../../../common/components/alerts/SuccessAlert";
import { useAuth } from "../../../common/contexts/AuthContext";

export const useUserCommonHook = () => {
    const { logout } = useAuth();
    const [ loading, setLoading ] = useState(false);
    const [ user, setUser ] = useState<UserProfileProps>();

    const getProfile = async () => {
        try {
            setLoading(false);
            const res = await UserCommonAPI.me();

            if(!res.status) throw new Error(res.message);
            if(!res.data.user) throw new Error(res.message);

            setUser(res.data.user)

        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false)
        }
    }

    const updateOrRegisterUser = async (
        userData : UserProfileProps, 
        onClose : () => void, 
        isEditMode : boolean,
        isAdminMode : boolean = false
    ) => {
        try {
            const res = isEditMode 
            ? await UserCommonAPI.update(isAdminMode, userData, (userData.user_ID || ''))
            : await registerUser(userData)

            if(!res.status) throw new Error(res.message)

            onClose();
            if(isEditMode && !isAdminMode) logout()
            SuccessAlert( `${res.data.message} ${(isEditMode && !isAdminMode) ? ', la sesión será cerrada por seguridad' : ''}`)
               
        } catch (err : any) {
            onClose();
            ErrorAlert(err.message);
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        user,
        getProfile,
        updateOrRegisterUser
    }
}

