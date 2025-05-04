import Cookie from 'js-cookie';
import { SERVER_URL } from "../../common/configs/config";
import { Product } from '../ts/types';

export const getAllProductsPaginate = async (limit = 18, page = 1) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/products/?limit=${limit}&page=${page}`,{
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

export const getProductsByPropertyValue = async (value : string, property : string) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/products/find/?value=${value}&property=${property}`,{
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

export const registerProduct = async (productData : Product) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/products/`,{
            method : 'POST', credentials : 'include', 
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, body : JSON.stringify(productData)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error')

        return { status : true, data }   
    } catch (err : any) {
        return { status : false, message : err.message }
    }   
}

export const updateProduct = async (productData : Product) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/products/${productData.product_ID}`,{
            method : 'PATCH', credentials : 'include', 
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, body : JSON.stringify(productData)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error')

        return { status : true, data }   
    } catch (err : any) {
        return { status : false, message : err.message }
    }   
}

export const deleteProduct = async (product_ID : string) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/products/${product_ID}`,{
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