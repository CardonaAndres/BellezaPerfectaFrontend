import Cookie from 'js-cookie';
import { SERVER_URL } from "../../common/configs/config";

export const getInventoryRegister = async (product_ID: string, limit = 18, page = 1) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/inventory/${product_ID}/?limit=${limit}&page=${page}`,{
            method : 'GET', credentials : 'include', 
            headers: { 
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