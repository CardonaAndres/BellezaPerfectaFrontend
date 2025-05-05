import Cookie from 'js-cookie';
import { SERVER_URL } from "../../../common/configs/config";
import { UserProfileProps } from '../../ts/common/types';

export const getAllUsers = async (limit = 18, page = 1) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/users/?limit=${limit}&page=${page}`,{
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

export const registerUser = async (userData : UserProfileProps) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/auth/register`,{
            method : 'POST', headers: {
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

export const deleteUser = async (user_ID : string) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/users/${user_ID}`,{
            method : 'DELETE', headers: {
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