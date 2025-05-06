import { Search, ChevronDown, List, Plus, Calculator } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GeneralProps } from '../../common/assets/ts/types';
import { limitOptions } from '../../common/assets/ts/options';
import { InvoiceCreateFormModal } from './InvoiceCreateFormModal';
import { useLocation } from 'react-router-dom';
import { router } from '../../common/configs/config';

export const Header = ({ meta, limit, page, onLimitChange }: GeneralProps) => {
    const location = useLocation();
    const [ modalOpen, setModalOpen ] = useState(false);
    const [isLimitDropdownOpen, setIsLimitDropdownOpen] = useState(false);
    const { register, handleSubmit,  } = useForm({});

    const handleModal = () : void => setModalOpen(!modalOpen);

    return (
        <div className="w-full bg-black text-white shadow-lg">
            {/* Navbar superior */}
            <div className="bg-black border-b border-yellow-500">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                        <Calculator size={24} className="text-yellow-500 mr-2" />
                        <h1 className="text-yellow-500 font-bold text-xl">Facturación</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-white text-sm">
                            Facturas totales: <span className="text-yellow-500 font-semibold">{meta.total}</span>
                        </div>
                        {(location.pathname !== router.invoiceByClien) && (
                            <button onClick={handleModal} className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-lg flex items-center transition-colors duration-300"
                            >
                                <Plus size={18} className="mr-1" />
                                <span>Nueva Factura</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Header con filtros y buscador */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Buscador */}
                    {(location.pathname !== router.invoiceByClien) && (
                        <div className="relative w-full flex">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input type="text" placeholder="Buscar factura..."
                                className="bg-gray-900 border border-gray-700 text-white w-full pl-10 pr-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-yellow-500"
                                {...register('invoice_ID')}
                            />
                            <button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 rounded-r-lg flex items-center transition-colors duration-300" >
                                <Search size={18} className="mr-1" />
                                <span>Buscar</span>
                            </button>
                        </div>
                    )}
                </div>
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

            <InvoiceCreateFormModal open={modalOpen} onClose={handleModal}  />
        </div>
    );
};