import { useState } from "react";
import { GeneralProps } from "../../common/assets/ts/types"
import { ChevronDown, List, PackageSearch } from "lucide-react";
import { limitOptions } from "../../common/assets/ts/options";

export const Header = ({ meta, limit, page, onLimitChange }: GeneralProps) => {
    const [isLimitDropdownOpen, setIsLimitDropdownOpen] = useState(false);

    return (
        <div className="w-full bg-black text-white shadow-lg">
            <div className="bg-black border-b border-yellow-500">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                        <PackageSearch size={24} className="text-yellow-500 mr-2" />
                        <h1 className="text-yellow-500 font-bold text-xl">Registros Del Productos</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-white text-sm">
                            Registros Totales: 
                            <span className="text-yellow-500 font-semibold"> {meta.total}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-4">

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
        </div>
    )
}