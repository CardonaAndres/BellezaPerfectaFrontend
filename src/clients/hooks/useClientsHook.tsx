import { ErrorAlert } from '../../common/components/alerts/ErrorAlert';
import * as ClientAPI from '../API/clients';
import { useState } from "react";
import { Client } from '../ts/types';
import { SuccessAlert } from '../../common/components/alerts/SuccessAlert';
import { ConfirmAlert } from '../../common/components/alerts/ConfirmAlert';
import { PaginationProps } from '../../common/assets/ts/types';


export const useClientsHook = () => {
    const [ loading, setLoading ] = useState(false);
    const [ clients, setClients ] = useState([]);
    const [ meta, setMeta ] = useState({
        total : 0,
        page : 0,
        limit : 0,
        last_page : 0
    });

    const getAllClientsPaginate = async ({ page = 1, limit = 18 } : PaginationProps) => {
        try {
            setLoading(true);
            const res = await ClientAPI.getAllClientsPaginate(limit, page);
            if(!res.status) throw new Error(res.message)
               
            const { meta, clients} = res.data;   

            setClients(clients)
            setMeta(meta)

        } catch (err : any) {
            ErrorAlert(err.message)
        } finally {
            setLoading(false)
        }
    }

    const getClientByProperty = async (property : string, value : string) => {
        try {
            const res = await ClientAPI.getClient(value, property);
            if(!res.status) throw new Error(res.message)
            return res.data.client

        } catch (err : any) {
            ErrorAlert(err.message);
            return false;
        } finally {
            setLoading(false)
        }
    }

    const registerOrUpdateClient = async (isEditing : boolean, onClose : () => void, data : Client) => {
        try {
            setLoading(true);
            const res = isEditing ? await ClientAPI.updateClient(data) : await ClientAPI.registerClient(data);

            if(!res.status) throw new Error(res.message)
            
            onClose();
            SuccessAlert(res.data.message)    

        } catch (err : any) {
            onClose();
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const deleteClient = async (client_ID : string, onClose : Function, isFormPage = false) => {
        try {
            if(!isFormPage){
                const confirm = await ConfirmAlert('¿Deseas eliminar este cliente y su historial?');
                if(!confirm.isConfirmed){
                    SuccessAlert('Acción cancelada correctamente')
                    return;
                }

            }

            const res = await ClientAPI.deleteClient(client_ID);
            if(!res.status) throw new Error(res.message);

            if(isFormPage) onClose()
            SuccessAlert(res.data.message)

        } catch (err : any) {
            if(isFormPage) onClose()
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        clients,
        meta,
        getAllClientsPaginate,
        getClientByProperty,
        registerOrUpdateClient,
        deleteClient
    }
}


