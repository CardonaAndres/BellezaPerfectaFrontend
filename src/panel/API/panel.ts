import Cookie from 'js-cookie';
import { SERVER_URL } from "../../common/configs/config";
import { InvoiceFormData } from '../ts/types';

export const getAllInvoicesWithoutPaginate = async () => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/invoices/history`,{
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

export const getAllInvoices = async (limit = 18, page = 1) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/invoices?limit=${limit}&page=${page}`,{
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

export const getAllInvoicesByDates = async (
    limit = 18, page = 1, startDate : string, endDate : string
) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/reports/sales-by-period/?limit=${limit}&page=${page}&startDate=${startDate}&endDate=${endDate}`,{
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

export const getAllInvoicesByClient = async (limit = 18, page = 1, client_ID : string) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(
            `${SERVER_URL}/invoices/client/${client_ID}/?limit=${limit}&page=${page}`,{
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

export const getInvoiceByID = async (invoice_ID : number) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/invoices/${invoice_ID}`,{
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

export const createInvoice = async (invoiceData : InvoiceFormData) => {
    try {
        const token = Cookie.get('token');
        const {invoice_ID, ...invoiceDataFilter } = invoiceData;

        const res = await fetch(`${SERVER_URL}/invoices`,{
            method : 'POST', credentials : 'include', 
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, body : JSON.stringify(invoiceDataFilter)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error')

        return { status : true, data }   
    } catch (err : any) {
        return { status : false, message : err.message }
    }   
}

export const updateInvoice = async (invoiceData : InvoiceFormData) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/invoices/${invoiceData.invoice_ID}`,{
            method : 'PATCH', credentials : 'include', 
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, body : JSON.stringify(invoiceData)
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data.message || 'Internal Server Error')

        return { status : true, data }   
    } catch (err : any) {
        return { status : false, message : err.message }
    }   
}

export const deleteInvoice = async (invoice_ID : number) => {
    try {
        const token = Cookie.get('token');

        const res = await fetch(`${SERVER_URL}/invoices/${invoice_ID}`,{
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