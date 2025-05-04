import Cookie from 'js-cookie';
import { SERVER_URL } from "../../../common/configs/config";
import { UserProfileProps } from '../../ts/common/types';

export const me = async () => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/users/me`,{
            method : 'GET', headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error')

        return { status : true, data }

    } catch (err : any) {
        return { status : false, message : err.message }
    }
}

export const update = async (isAdminMode : boolean, userData : UserProfileProps, user_ID ?: string) => {
    try {
        const token = Cookie.get('token');
        const URL = isAdminMode ? `` : `?user_ID=${user_ID}`;
        
        const res = await fetch(`${SERVER_URL}/users/${URL}`,{
            method : 'PATCH', headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, body : JSON.stringify(userData)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error')

        return { status : true, data }

    } catch (err : any) {
        return { status : false, message : err.message }
    }
}