import { useState } from "react";
import { GeneralProps, SearchFormData } from "../../common/assets/ts/types"
import { ChevronDown, List, Plus, Search, PackageSearch } from "lucide-react";
import { useForm } from "react-hook-form";
import { limitOptions } from "../../common/assets/ts/options";
import { useProductsHook } from "../hooks/useProductsHook";
import { ProductFormModal } from "./ProductFormModal";
import { Product } from "../ts/types";
import { ProductsSearchModal } from "./ProductsSearchModal";

type ProductProperty = {
    id: string;
    name: string;
};

const productsProperties: ProductProperty[] = [
    { id: 'product_ID', name: 'Codigo Del Producto' },
    { id: 'name', name: 'Nombre Del Producto' },
    { id: 'price', name: 'Precio Del Producto' },
    { id: 'stock', name: 'Stock Del Producto' },
    { id: 'iva', name: 'IVA Del Producto' },
    { id: 'unit_measure', name: 'Unidad De Medida Del Producto' },
];
  
export const Header = ({ meta, limit, page, onLimitChange }: GeneralProps) => {
    const { loading, getProductsByProperty } = useProductsHook();
    const [ modal, setModal] = useState(false);
    const [ modalSearch, setModalSearch] = useState(false);
    const [ products, setProducts] = useState<Product[] | []>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLimitDropdownOpen, setIsLimitDropdownOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<ProductProperty | null>(null);
    const { register, handleSubmit, setValue } = useForm<SearchFormData>({
        defaultValues: {
            searchTerm: '',
            searchProperty: ''
        }
    });

    const handleModal = () => setModal(!modal);
    const handleModalSearch = () => setModalSearch(!modalSearch);

    const handleSearch = async (data: SearchFormData) => {
        const searchData = {
            value: data.searchTerm,
            property: selectedProperty ? selectedProperty.id : ''
        };

        const res = await getProductsByProperty(searchData.value, searchData.property);
        if(res.length < 1) return;

        setProducts(res)
        handleModalSearch();
        
            
    };

    const handlePropertySelect = (property: ProductProperty) => {
        setSelectedProperty(property);
        setValue('searchProperty', property.id);
        setIsDropdownOpen(false);
    };

    return (
        <div className="w-full bg-black text-white shadow-lg">
            <div className="bg-black border-b border-yellow-500">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                        <PackageSearch size={24} className="text-yellow-500 mr-2" />
                        <h1 className="text-yellow-500 font-bold text-xl">Gestión de Productos</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-white text-sm">
                            Productos totales: 
                            <span className="text-yellow-500 font-semibold">{meta.total}</span>
                        </div>
                        <button onClick={() => {setProducts([]); handleModal();}} className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg flex items-center transition-colors duration-300">
                            <Plus size={18} className="mr-1" />
                            <span>Añadir Producto</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-4">
                <form onSubmit={handleSubmit(handleSearch)}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Buscador */}
                        <div className="relative w-full md:w-2/3 flex">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                className="bg-gray-900 border border-gray-700 text-white w-full pl-10 pr-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                {...register('searchTerm')}
                            />
                            <button type="submit" disabled={loading} className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-r-lg flex items-center transition-colors duration-300">
                                <Search size={18} className="mr-1" />
                                <span>Buscar</span>
                            </button>
                        </div>

                        {/* Selector de propiedad */}
                        <div className="relative w-full md:w-1/3">
                            <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span className="text-gray-300">
                                    {selectedProperty ? selectedProperty.name : 'Filtrar por propiedad'}
                                </span>
                                <ChevronDown size={18} className={`text-yellow-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                            </div>
                            <input type="hidden" {...register('searchProperty')} />

                            {isDropdownOpen && (
                                <div className="absolute mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10">
                                    {productsProperties.map((property) => (
                                        <div
                                            key={property.id}
                                            className={`px-4 py-2 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0 ${selectedProperty?.id === property.id ? 'bg-gray-800 text-yellow-500' : 'text-white'}`}
                                            onClick={() => handlePropertySelect(property)}
                                        >
                                            <span>{property.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                {/* Selector de límite por página */}
                <div className="flex items-center justify-end mt-4">
                    <div className="flex items-center">
                        <span className="text-gray-300 mr-2 text-sm">Mostrar:</span>
                        <div className="relative">
                            <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-1 flex items-center cursor-pointer" 
                            onClick={() => setIsLimitDropdownOpen(!isLimitDropdownOpen)}>
                                <List size={16} className="text-yellow-500 mr-2" />
                                <span className="text-white">{limit}</span>
                                <ChevronDown size={14} className={`text-yellow-500 ml-2 transition-transform ${isLimitDropdownOpen ? 'transform rotate-180' : ''}`} />
                            </div>

                            {isLimitDropdownOpen && (
                                <div className="absolute right-0 mt-1 w-24 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10">
                                    {limitOptions.map((option) => (
                                        <div key={option}
                                            className={`px-3 py-1 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0 ${option === limit ? 'bg-gray-800 text-yellow-500' : 'text-white'}`}
                                            onClick={() => onLimitChange(option)}
                                        >
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <span className="text-gray-300 ml-2 text-sm">clientes por página</span>
                    </div>
                </div>

                {/* Info de paginación */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
                    <div>
                        Mostrando <span className="text-white">{Math.min((page - 1) * limit + 1, meta.total)}-{Math.min(page * limit, meta.total)}</span> de <span className="text-white">{meta.total}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2">Página {page} de {Math.ceil(meta.total / limit)}</span>
                    </div>
                </div>
            </div>
                            
                          
             
            <ProductFormModal open={modal} onClose={handleModal} />
            <ProductsSearchModal open={modalSearch} onClose={handleModalSearch} productsData={products} />               

        </div>
    )
}