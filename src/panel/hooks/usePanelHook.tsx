import Cookies from "js-cookie";
import { useState } from "react";
import * as PanelAPI from '../API/panel';
import * as ProductAPI from '../../products/API/products';
import * as ClientsAPI from '../../clients/API/clients';
import { ErrorAlert } from "../../common/components/alerts/ErrorAlert";
import { Client } from "../../clients/ts/types";
import { dailySaleType, Invoice, InvoiceFormData } from "../ts/types";
import { SuccessAlert } from "../../common/components/alerts/SuccessAlert";
import { ConfirmAlert } from "../../common/components/alerts/ConfirmAlert";
import { InvoicesFormats } from "../classes/InvoicesFormats";

type Product = {
    product_ID: string;
    name: string;
    price: number;
};

export const usePanelHook = () => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ products, setProducts  ] = useState<Product[] | []>([]);
    const [ dailySales, setDailySales] = useState<dailySaleType[] | []>();
    const [ clients, setClients ] = useState<Client[] | []>([]);
    const [ invoices, setInvoices ] = useState([]);
    const [ meta, setMeta ] = useState({
        total : 0,
        page : 0,
        limit : 0,
        last_page : 0
    });
    const [ summary, setSummary ] = useState({
        totalSales: 0,
        invoiceCount: 0,
        averageTicket: 0
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

    const getAllInvoicesByDates = async (limit = 18, page = 1, startDate : string, endDate : string) => {
        try {
            setLoading(true);
            const res = await PanelAPI.getAllInvoicesByDates(limit, page, startDate, endDate);
            if(!res.status) throw new Error(res.message);
            
            setMeta(res.data.meta);
            setInvoices(res.data.rawData);
            setSummary(res.data.summary);
            setDailySales(res.data.dailySales)

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

    const getInvoiceByID = async (invoice_ID : number) => {
        try {
            setLoading(true);
            const res = await PanelAPI.getInvoiceByID(invoice_ID);
            if(!res.status) throw new Error(res.message)
            return res.data.invoice
        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const downloadInvoiceAsPDF = async (invoice : Invoice) => {
        try {
            setLoading(true);
            await InvoicesFormats.downloadInvoiceAsPDF(invoice);
        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const downloadAllInvoices = async (invoices: Invoice[] = [] ) => {
        const durationInDays = 10 / (24 * 60);
        let invoicesData : Invoice[] | [];
        
        try {

            if (invoices.length >= 1) {
                invoicesData = invoices;
            } else {
                const { getHistory } = Cookies.get();

                if(getHistory){
                    throw new Error(
                     'Por favor, esperar 10 minutos para volver a descargar el historial completo'
                    )
                }
                    
                const res = await PanelAPI.getAllInvoicesWithoutPaginate();
                if (!res.status) throw new Error(res.message);
                invoicesData = res.data.invoices; 

                Cookies.set('getHistory', 'true', { expires: durationInDays });
            }
            
            await InvoicesFormats.exportInvoicesToExcel(invoicesData)

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
        deleteInvoice,
        getInvoiceByID,
        downloadInvoiceAsPDF,
        downloadAllInvoices,
        getAllInvoicesByDates,
        dailySales,
        summary
    }
}