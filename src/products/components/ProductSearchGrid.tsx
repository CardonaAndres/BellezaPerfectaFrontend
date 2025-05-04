import { Product } from "../ts/types"
import { ProductCard } from "./ProductCard"
import { X } from "lucide-react"

type Props = {
    onClose: () => void,
    products: Product[]
}

export const ProductSearchGrid = ({ onClose, products }: Props) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-gray-950 border border-amber-500 rounded-lg w-full overflow-hidden shadow-xl">
        {/* Header del modal */}
        <div className="bg-black border-b border-amber-500 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-amber-500">Resultados de búsqueda</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white rounded-full p-1 transition-colors duration-200 hover:bg-gray-800"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Contador de resultados */}
        <div className="px-6 pt-4 pb-2 text-sm text-gray-300">
          Se encontraron <span className="text-amber-500 font-semibold">{products.length}</span> productos
        </div>
        
        {/* Contenido principal con scroll */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <div className="text-amber-500 text-lg mb-2">No se encontraron productos</div>
              <p>Intenta con otra búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.product_ID} product={product} />
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}