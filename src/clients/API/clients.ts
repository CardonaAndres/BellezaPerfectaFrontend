import Cookie from 'js-cookie';
import { SERVER_URL } from "../../common/configs/config";
import { Client } from '../ts/types';

export const getAllClientsPaginate = async (limit = 18, page = 1) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/clients/?limit=${limit}&page=${page}`,{
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

export const getClient = async (value : string, property : string) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/clients/one/?value=${value}&property=${property}`,{
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

export const registerClient = async (clientData : Client) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/clients/`,{
            method : 'POST', credentials : 'include', 
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, body : JSON.stringify(clientData)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error')

        return { status : true, data }
    
    } catch (err : any) {
        return { status : false, message : err.message }
    }   
}

export const updateClient = async (clientData : Client) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/clients/${clientData.client_ID}`,{
            method : 'PATCH', credentials : 'include', 
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, body : JSON.stringify(clientData)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error')

        return { status : true, data }
        
    } catch (err : any) {
        return { status : false, message : err.message }
    }   
}

export const deleteClient = async (client_ID : string) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/clients/${client_ID}`,{
            method : 'DELETE', credentials : 'include', 
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