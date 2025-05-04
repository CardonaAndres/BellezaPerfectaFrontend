import { ShoppingBag, Tag, AlertCircle, Edit, Trash2, Info, Package } from 'lucide-react';
import { Product } from '../ts/types';
import { getStockStatus,formatDate, formatPrice } from '../ts/styles';
import { useState } from 'react';
import { ProductFormModal } from './ProductFormModal';
import { useProductsHook } from '../hooks/useProductsHook';

type ProductCardProps = {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const [ modal, setModal ] = useState<boolean>(false);
    const stockStatus = getStockStatus(product.stock, product.stock_min);
    const { loading, deleteProduct } = useProductsHook();

    const handleModal = () => setModal(!modal);

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
        {/* Cabecera */}
        <div className="px-4 py-3 bg-black border-b border-amber-500 flex justify-between items-center">
            <div className="flex items-center">
            <ShoppingBag size={16} className="text-amber-500 mr-2" />
            <h3 className="font-medium text-white truncate" title={product.name}>
                {product.name}
            </h3>
            </div>
            <div className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
            ID: {product.product_ID}
            </div>
        </div>

        {/* Cuerpo */}
        <div className="p-4">
            <div className="mb-3">
            <p className="text-gray-400 text-sm line-clamp-2" title={product.description}>
                {product.description}
            </p>
            </div>

            <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
                <Tag size={14} className="text-amber-500 mr-1" />
                <span className="text-amber-500 font-bold text-lg">
                {formatPrice(product.price)}
                </span>
            </div>
            <div className="flex items-center bg-gray-800 px-2 py-1 rounded-md">
                <div className={`w-2 h-2 rounded-full ${stockStatus.color} mr-2`} />
                <span className="text-xs text-gray-300">{stockStatus.text}</span>
            </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-400">
            <div className="flex items-center">
                <Package size={12} className="mr-1" />
                <span>Stock: <span className="text-white">{product.stock}</span></span>
            </div>
            <div className="flex items-center">
                <AlertCircle size={12} className="mr-1" />
                <span>Mín: <span className="text-white">{product.stock_min}</span></span>
            </div>
            <div className="flex items-center">
                <Info size={12} className="mr-1" />
                <span>IVA: <span className="text-white">{product.iva}%</span></span>
            </div>
            <div className="flex items-center">
                <span>Unidad: <span className="text-white">{product.unit_measure}</span></span>
            </div>
            </div>

            <div className="text-xs text-gray-500 mb-3">
            Creado el {formatDate(product.created_at || new Date().toDateString())}
            </div>

            <div className="flex justify-between mt-auto">
            <button className="text-gray-300 hover:text-white text-sm flex items-center bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-md transition-colors duration-300">
                <Info size={14} className="mr-1" />
                Detalles
            </button>
            <div className="flex gap-2">
                <button onClick={handleModal} className="text-amber-500 hover:text-amber-400 text-sm flex items-center bg-transparent hover:bg-gray-800 p-1 rounded-md transition-colors duration-300">
                <Edit size={16} />
                </button>
                <button disabled={loading} className="text-red-500 hover:text-red-400 text-sm flex items-center bg-transparent hover:bg-gray-800 p-1 rounded-md transition-colors duration-300" onClick={async () => await deleteProduct(product.product_ID || '')} >
                <Trash2 size={16} />
                </button>
            </div>
            </div>
        </div>

        <ProductFormModal open={modal} onClose={handleModal} productData={product} />
        </div>
    );
};
