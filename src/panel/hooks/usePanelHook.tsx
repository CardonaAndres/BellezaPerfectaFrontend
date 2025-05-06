import { useState } from "react";
import * as PanelAPI from '../API/panel';
import * as ProductAPI from '../../products/API/products';
import * as ClientsAPI from '../../clients/API/clients';
import { ErrorAlert } from "../../common/components/alerts/ErrorAlert";
import { Client } from "../../clients/ts/types";
import { InvoiceFormData } from "../ts/types";
import { SuccessAlert } from "../../common/components/alerts/SuccessAlert";
import { ConfirmAlert } from "../../common/components/alerts/ConfirmAlert";

type Product = {
    product_ID: string;
    name: string;
    price: number;
};

export const usePanelHook = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ products, setProducts  ] = useState<Product[] | []>([]);
    const [ clients, setClients ] = useState<Client[] | []>([]);
    const [ invoices, setInvoices ] = useState([]);
    const [ meta, setMeta ] = useState({
        total : 0,
        page : 0,
        limit : 0,
        last_page : 0
    });

    const getAllInvoices = async (limit = 18, page = 1) => {
        try {
            setLoading(true);
            const res = await PanelAPI.getAllInvoices(limit, page);
            if(!res.status) throw new Error(res.message);
            
            setMeta({...res.data.meta, last_page : res.data.meta.totalPages});
            setInvoices(res.data.invoices)
            
        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getAllInvoicesByClient = async (limit = 18, page = 1, client_ID : string) => {
        try {
            setLoading(true);
            const res = await PanelAPI.getAllInvoicesByClient(limit, page, client_ID)
            if(!res.status) throw new Error(res.message);
            
            setMeta({...res.data.meta, last_page : res.data.meta.totalPages});
            setInvoices(res.data.invoices)
            
        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getProducts = async () => {
        try {
            setLoading(true);
            const res = await ProductAPI.getAllProductsPaginate(100000, 1);
            if(!res.status) throw new Error(res.message);

            setProducts(res.data.products)
        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getClients = async () => {
        try {
            setLoading(true);
            const res = await ClientsAPI.getAllClientsPaginate(100000, 1);
            if(!res.status) throw new Error(res.message);

            const clientGeneric : Client = {
                client_ID : '1',
                document_type : 'CC',
                name : 'CLIENT GENERIC',
                city : 'BOGOTA',
                zone : 'ZONA 1',
                neighborhood : 'NEIGHBORHOOD GENERIC',
                address : 'ADDRESS GENERIC',
                cellphone : '3111111111'
            }

            setClients([...res.data.clients, clientGeneric]);
        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const createInvoice = async (onClose : () => void, invoiceData : InvoiceFormData) => {
        try {
            setLoading(false);
            const res = await PanelAPI.createInvoice(invoiceData);
            if(!res.status) throw new Error(res.message)

            onClose();
            SuccessAlert(res.data.message)   

        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const updateInvoice = async (onClose : () => void, updatedInvoice : InvoiceFormData) => {
        try {
            setLoading(true);
            const res = await PanelAPI.updateInvoice(updatedInvoice)
            if(!res.status) throw new Error(res.message)

            onClose();
            SuccessAlert(res.data.message)

        } catch (err : any) {
            onClose();
            ErrorAlert(err.message)
        } finally {
            setLoading(false);
        }
    }

    const deleteInvoice = async (
        isFormUpdatePage = false, 
        invoice_ID : number,
        onClose : () => void = () => {}
    ) => {
        try {
            setLoading(true);
            if(!isFormUpdatePage){
                const confirm = await ConfirmAlert('¿Deseas eliminar esta factura?');
                if(!confirm.isConfirmed){
                    SuccessAlert('Acción cancelada');
                    return
                }
            }

            const res = await PanelAPI.deleteInvoice(invoice_ID)
            if(!res.status) throw new Error(res.message)

            onClose();
            SuccessAlert(res.data.message);
            
        } catch (err : any) {
            onClose();
            ErrorAlert(err.message)
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        meta,
        invoices,
        getAllInvoices,
        getProducts,
        products,
        getClients,
        clients, 
        createInvoice,
        getAllInvoicesByClient,
        updateInvoice,
        deleteInvoice
    }
}


