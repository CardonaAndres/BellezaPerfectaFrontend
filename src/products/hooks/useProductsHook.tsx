import { useState } from "react";
import * as ProductAPI  from '../API/products';
import { PaginationProps } from "../../common/assets/ts/types";
import { ErrorAlert } from "../../common/components/alerts/ErrorAlert";
import { Product } from "../ts/types";
import { SuccessAlert } from "../../common/components/alerts/SuccessAlert";
import { ConfirmAlert } from "../../common/components/alerts/ConfirmAlert";

export const useProductsHook = () => {
    const [ products, setProducts ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ meta, setMeta ] = useState({
        total : 0,
        page : 0,
        limit : 0,
        last_page : 16
    }); 

    const getAllProducts = async ({ page = 1, limit = 18 } : PaginationProps) => {
        try {
            setLoading(true);
            const res = await ProductAPI.getAllProductsPaginate(limit, page);
            if(!res.status) throw new Error(res.message)

            setMeta(res.data.meta);
            setProducts(res.data.products);
            
        } catch (err : any) {
            ErrorAlert(err.message)
        } finally {
            setLoading(false);
        }
    }

    const getProductsByProperty = async (value : string, property : string) => {
        try {
            setLoading(true);
            const res = await ProductAPI.getProductsByPropertyValue(value, property);

            if(!res.status) throw new Error(res.message);

            if(res.data.products.length < 1) 
                throw new Error('No se han encontrado productos')
            
            return res.data.products

        } catch (err : any) {
            ErrorAlert(err.message);
            return []
        } finally {
            setLoading(false);
        }
    }

    const registerOrUpdateProduct = async (
        productData : Product, onClose : () => void, isEditMode : boolean
    ) => {
        try {
            setLoading(true);
            const res = isEditMode ? await ProductAPI.updateProduct(productData) : await ProductAPI.registerProduct(productData)

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

    const deleteProduct = async (
        product_ID: string, 
        isFormPage : boolean = false,
        onClose: () => void = () => {console.log()},
    ) => {
        try {
            setLoading(true);
            if(!isFormPage) {
                const confirm = await ConfirmAlert('¿Seguro de eliminar este producto y todo lo relacionado con este?')

                if(!confirm.isConfirmed) {
                    SuccessAlert('Acción cancelada')
                    return;
                }
            }

            const res = await ProductAPI.deleteProduct(product_ID);
            if(!res.status) throw new Error(res.message);

            onClose();
            SuccessAlert(res.data.message)

        } catch (err : any) {
            onClose();
            ErrorAlert(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        products,
        meta,
        getAllProducts,
        registerOrUpdateProduct,
        deleteProduct,
        getProductsByProperty
    }
}
