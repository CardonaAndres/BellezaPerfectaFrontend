import { modalStyles } from "../../common/assets/ts/styles";
import { Modal, Box } from '@mui/material';
import { Product } from "../ts/types";
import { ProductForm } from "./ProductForm";

type Props = {
    onClose : () => void,
    open : boolean,
    productData ?: Product
}

export const unitMeasureOptions = [
    { value: 'Unidad', label: 'Unidad' },
    { value: 'Kilogramo', label: 'Kilogramo (kg)' },
    { value: 'Gramo', label: 'Gramo (g)' },
    { value: 'Litro', label: 'Litro (L)' },
    { value: 'Mililitro', label: 'Mililitro (ml)' },
    { value: 'Metro', label: 'Metro (m)' },
    { value: 'Centímetro', label: 'Centímetro (cm)' },
    { value: 'Paquete', label: 'Paquete' },
    { value: 'Caja', label: 'Caja' },
    { value: 'Ctro', label: 'Ctro' },
];

export const ProductFormModal = ({ open, onClose, productData } : Props) => {

    const initialData : Product = {
        product_ID : productData?.product_ID || null,
        name: productData?.name || '',
        description: productData?.description || '',
        price: productData?.price || '',
        stock: productData?.stock || 0,
        stock_min: productData?.stock_min || 0,
        iva: productData?.iva || '',
        unit_measure: productData?.unit_measure || '',
    }


    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyles}>
                <ProductForm onClose={onClose} initialData={initialData} />
            </Box>
        </Modal>
    )
}