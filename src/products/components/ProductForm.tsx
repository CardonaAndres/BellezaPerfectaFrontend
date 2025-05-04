import { Product } from "../ts/types";
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ShoppingBag, Save, X, AlertCircle, Package, Tag, Info, Hash, ChevronsUpDown, Trash } from 'lucide-react';
import { unitMeasureOptions } from "./ProductFormModal";
import { useProductsHook } from "../hooks/useProductsHook";

type ProductFormProps = {
    initialData?: Product;
    onClose: () => void;
};

export const ProductForm = ({ initialData, onClose }: ProductFormProps) => {
    const isEditMode = !!initialData?.product_ID;
    const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
    const { loading, registerOrUpdateProduct, deleteProduct } = useProductsHook();
    
    const { register, handleSubmit, control, formState: { errors }, watch } = useForm<Product>({
        defaultValues: {...initialData} 
    });
    
    const selectedUnit = watch('unit_measure');

    const onSubmited = handleSubmit(async (productData: Product) => {
        await registerOrUpdateProduct(productData, onClose, isEditMode);
    });

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl w-full max-w-3xl mx-auto">
            {/* Header del formulario */}
            <div className="bg-black border-b border-amber-500 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <ShoppingBag size={20} className="text-amber-500 mr-3" />
                    <h2 className="text-xl font-semibold text-white">
                        {isEditMode ? 'Editar Producto' : 'Nuevo Producto'}
                    </h2>
                </div>
                <button 
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Formulario */}
            <form onSubmit={onSubmited} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Código de producto */}
                    <div className="col-span-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center">
                            <Hash size={16} className="mr-1" />
                            Código de Producto
                        </label>
                        <input type="text" {...register('product_ID', { 
                                required: "Este campo es obligatorio",
                                pattern: {
                                    value: /^[0-9a-zA-Z-_]+$/,
                                    message: "Solo números, letras, guiones y guiones bajos"
                                }
                            })}
                            disabled={isEditMode}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-70 disabled:cursor-not-allowed"
                            placeholder="Ej: PROD123"
                        />
                        {errors.product_ID && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.product_ID.message}
                            </p>
                        )}
                    </div>

                    {/* Nombre del producto */}
                    <div className="col-span-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center">
                            <ShoppingBag size={16} className="mr-1" />
                            Nombre del Producto
                        </label>
                        <input
                            type="text"
                            {...register('name', { 
                                required: "El nombre es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Mínimo 3 caracteres"
                                }
                            })}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Nombre del producto"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Descripción */}
                    <div className="col-span-2">
                        <label className="text-gray-400 text-sm mb-2 flex items-center">
                            <Info size={16} className="mr-1" />
                            Descripción
                        </label>
                        <textarea
                            {...register('description', { 
                                required: "La descripción es obligatoria" 
                            })}
                            rows={3}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="Descripción detallada del producto"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Precio */}
                    <div className="col-span-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center">
                            <Tag size={16} className="mr-1" />
                            Precio
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">€</span>
                            <input
                                type="number"
                                {...register('price', { 
                                    required: "El precio es obligatorio",
                                    valueAsNumber: true,
                                    min: {
                                      value: 0,
                                      message: "El precio no puede ser menor a 0"
                                    }
                                })}
                                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="0.00"
                            />
                        </div>
                        {errors.price && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    {/* IVA */}
                    <div className="col-span-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center">
                            <Info size={16} className="mr-1" />
                            IVA (%)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                {...register('iva', { 
                                    required: "El IVA es obligatorio",
                                    valueAsNumber: true, // si usas React Hook Form con input type="number"
                                    min: {
                                      value: 0,
                                      message: "El IVA no puede ser negativo"
                                    },
                                    
                                })}
                                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                placeholder="21.00" defaultValue={0}
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">%</span>
                        </div>
                        {errors.iva && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.iva.message}
                            </p>
                        )}
                    </div>

                    {/* Stock */}
                    <div className="col-span-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center">
                            <Package size={16} className="mr-1" />
                            Stock Actual
                        </label>
                        <input
                            type="number"
                            {...register('stock', { 
                                required: "El stock es obligatorio",
                                min: {
                                    value: 0,
                                    message: "El stock no puede ser negativo"
                                },
                                valueAsNumber: true
                            })}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="0"
                        />
                        {errors.stock && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.stock.message}
                            </p>
                        )}
                    </div>

                    {/* Stock Mínimo */}
                    <div className="col-span-1">
                        <label className="text-gray-400 text-sm mb-2 flex items-center">
                            <AlertCircle size={16} className="mr-1" />
                            Stock Mínimo
                        </label>
                        <input
                            type="number"
                            {...register('stock_min', { 
                                required: "El stock mínimo es obligatorio",
                                min: {
                                    value: 0,
                                    message: "El stock mínimo no puede ser negativo"
                                },
                                valueAsNumber: true
                            })}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            placeholder="0"
                        />
                        {errors.stock_min && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.stock_min.message}
                            </p>
                        )}
                    </div>

                    {/* Unidad de Medida */}
                    <div className="col-span-2">
                        <label className="text-gray-400 text-sm mb-2 flex items-center">
                            <Package size={16} className="mr-1" />
                            Unidad de Medida
                        </label>
                        <Controller
                            name="unit_measure"
                            control={control}
                            rules={{ required: "Seleccione una unidad de medida" }}
                            render={({ field }) => (
                                <div className="relative">
                                    <div
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
                                        onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                                    >
                                        <span>{selectedUnit || "Seleccione una unidad"}</span>
                                        <ChevronsUpDown size={16} className="text-amber-500" />
                                    </div>
                                    
                                    {isUnitDropdownOpen && (
                                        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                            {unitMeasureOptions.map((option) => (
                                                <div
                                                    key={option.value}
                                                    className={`px-4 py-2 cursor-pointer ${selectedUnit === option.value ? 'bg-gray-700 text-amber-500' : 'text-white hover:bg-gray-700'}`}
                                                    onClick={() => {
                                                        field.onChange(option.value);
                                                        setIsUnitDropdownOpen(false);
                                                    }}
                                                >
                                                    {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        />
                        {errors.unit_measure && (
                            <p className="text-red-500 text-xs mt-1 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {errors.unit_measure.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end mt-8 space-x-3">
                     <button type="button" onClick={onClose} disabled={loading}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                        >
                        <X size={18} className="mr-2" />
                        Cancelar
                    </button>
                    {isEditMode && (
                        <button type="button" disabled={loading}
                        onClick={async () => await deleteProduct(initialData.product_ID || '', true, onClose)} 
                        className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center"
                        >
                        <Trash size={18} className="mr-2" />
                        Eliminar
                        </button>
                    )}
                    <button type="submit" disabled={loading}
                        className="px-6 py-2 bg-amber-500 text-black font-medium rounded-lg hover:bg-amber-600 transition-colors flex items-center"
                    >
                        <Save size={18} className="mr-2" />
                        {isEditMode ? 'Guardar Cambios' : 'Crear Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
};