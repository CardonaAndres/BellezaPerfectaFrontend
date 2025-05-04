import { modalStyles } from "../../common/assets/ts/styles";
import { Modal, Box } from '@mui/material';
import { Product } from "../ts/types";
import { ProductSearchGrid } from "./ProductSearchGrid";

type Props = {
    onClose : () => void,
    open : boolean,
    productsData ?: Product[]
}

export const ProductsSearchModal = ({ open, onClose, productsData } : Props) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={modalStyles}>
            <ProductSearchGrid onClose={onClose} products={productsData || []} />
        </Box>
    </Modal>
  )
}

