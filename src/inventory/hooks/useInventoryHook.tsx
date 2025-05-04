import { useState } from "react"
import * as InventoryAPI from '../API/inventory';
import { ErrorAlert } from "../../common/components/alerts/ErrorAlert";
import { RecordType } from "../ts/types";

export const useInventoryHook = (product_ID : string) => {
    const [ records, setRecords ] = useState<RecordType[]>([]);
    const [ loading, setLoading ] = useState(false);
    const [ meta, setMeta] = useState({
        total : 0,
        page : 0,
        limit : 0,
        last_page : 0
    });

    const getAllProductRecords = async (limit = 18, page = 1) => {
        try {
            setLoading(false);
            const res = await InventoryAPI.getInventoryRegister(product_ID, limit, page);
            if(!res.status) throw new Error(res.message)

            setMeta(res.data.meta);   
            setRecords(res.data.records);

        } catch (err : any) {
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        getAllProductRecords,
        meta,
        records
    }
}
