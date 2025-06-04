import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { CalendarIcon, PlusCircle, Trash2, Save, X, ChevronDown, User, Search, Package } from 'lucide-react';
import { usePanelHook } from '../hooks/usePanelHook';
import { LoadingScreen } from '../../common/components/common/LoadingScreen';
import { Client } from '../../clients/ts/types';
import { InvoiceFormData } from '../ts/types';

// Opciones de pago
const paymentOptions = [
  'Efectivo',
  'Transferencia',
  'Tarjeta de Crédito',
  'Tarjeta de Débito',
  'Cheque',
  'Contraentrega',
  'Otro'
];

type Props = {
  onClose: () => void,
}

export const InvoiceCreateForm = ({ onClose }: Props) => {
  const { loading, clients, getClients, products, getProducts, createInvoice } = usePanelHook();
  const [_, setSelectedClient] = useState<Client | null>(null);
  const [isClientDropdownOpen, setIsClientDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [clientSearchQuery, setClientSearchQuery] = useState('');
  const [productSearchQueries, setProductSearchQueries] = useState<string[]>([]);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState<number | null>(null);
  
  // Configurar react-hook-form con valores iniciales para una nueva factura
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<InvoiceFormData>({
    defaultValues: {
      client_ID: '',
      date_end: new Date().toISOString().split('T')[0],
      type_payment: 'Efectivo',
      city: '',
      zone: '',
      neighborhood: '',
      address: '',
      cellphone: '',
      productsList: []
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productsList',
  });

  const watchClientId = watch('client_ID');

  useEffect(() => {
    getClients();
    getProducts();
  }, []);
  
  useEffect(() => {
    // Inicializar el array de búsquedas de productos cuando cambia el número de campos
    setProductSearchQueries(prev => {
      const newQueries = [...prev];
      while (newQueries.length < fields.length) {
        newQueries.push('');
      }
      return newQueries.slice(0, fields.length);
    });
  }, [fields.length]);
  
  // Actualizar campos del cliente cuando se selecciona uno
  useEffect(() => {
    if (watchClientId) {
      const client = clients.find(c => c.client_ID === watchClientId);
      if (client) {
        setSelectedClient(client);
        setValue('city', client.city);
        setValue('zone', client.zone);
        setValue('neighborhood', client.neighborhood);
        setValue('address', client.address);
        setValue('cellphone', client.cellphone);
      }
    }
  }, [watchClientId, clients, setValue]);
  
  // Actualizar precio del producto cuando se selecciona
  const handleProductChange = (index: number, productId: string) => {
    const product = products.find(p => p.product_ID === productId);
    if (product) {
      setValue(`productsList.${index}.price`, product.price);
    }
  };
  
  // Filtrar clientes según la búsqueda
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(clientSearchQuery.toLowerCase()) || 
    (client.client_ID || '1').toLowerCase().includes(clientSearchQuery.toLowerCase())
  );
  
  // Filtrar productos según la búsqueda para cada índice
  const getFilteredProducts = (index: number) => {
    const query = productSearchQueries[index] || '';
    return products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) || 
      product.product_ID.toLowerCase().includes(query.toLowerCase())
    );
  };
  
  // Manejar la actualización de búsqueda de productos
  const updateProductSearch = (index: number, value: string) => {
    setProductSearchQueries(prev => {
      const newQueries = [...prev];
      newQueries[index] = value;
      return newQueries;
    });
  };
  
  // Manejar envío del formulario
  const submitHandler = async (data: InvoiceFormData) => await createInvoice(onClose, data);
  
  // Calcular total de la factura
  const calculateTotal = () => {
    return fields.reduce((total, _, index) => {
      const quantity = watch(`productsList.${index}.quantity`) || 0;
      const price = watch(`productsList.${index}.price`) || 0;
      return total + (quantity * price);
    }, 0);
  };

  if(loading) return <LoadingScreen />

  return (
    <div className="bg-black rounded-lg shadow-lg border border-gray-800 overflow-hidden">
      <div className="border-b border-amber-500 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-amber-500 flex items-center">
          Nueva Factura
        </h2>
        <div className="flex items-center space-x-2">
          <button type="button" onClick={onClose}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
            disabled={loading}
          >
            <X size={16} className="mr-1" />
            Cancelar
          </button>
          <button 
            type="button" 
            className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg flex items-center"
            onClick={handleSubmit(submitHandler)}
            disabled={loading}
          >
            <Save size={16} className="mr-1" />
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
      
      <form className="p-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Primera columna - Información principal */}
          <div>
            <h3 className="text-amber-500 font-medium mb-4 border-b border-gray-800 pb-2">Información de Factura</h3>
            
            {/* Fecha */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Fecha de Factura
              </label>
              <div className="relative">
                <input
                  type="date" min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                  className="bg-gray-900 border border-gray-700 text-white w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  {...register('date_end', { required: 'La fecha es obligatoria' })}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon size={18} className="text-gray-400" />
                </div>
              </div>
              {errors.date_end && <p className="text-red-500 text-xs mt-1">{errors.date_end.message}</p>}
            </div>
            
            {/* Tipo de Pago */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Método de Pago
              </label>
              <div className="relative">
                <Controller
                  name="type_payment"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <div 
                        className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer"
                        onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
                      >
                        <span className="text-white">{field.value || 'Seleccione método de pago'}</span>
                        <ChevronDown size={18} className={`text-amber-500 transition-transform ${isPaymentDropdownOpen ? 'transform rotate-180' : ''}`} />
                      </div>
                      
                      {isPaymentDropdownOpen && (
                        <div className="absolute mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10">
                          {paymentOptions.map((option) => (
                            <div 
                              key={option} 
                              className="px-4 py-2 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
                              onClick={() => {
                                field.onChange(option);
                                setIsPaymentDropdownOpen(false);
                              }}
                            >
                              <span className="text-white">{option}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
            
            {/* Cliente con Búsqueda */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Cliente <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Controller
                  name="client_ID"
                  control={control}
                  rules={{ required: 'El cliente es obligatorio' }}
                  render={({ field }) => (
                    <div className="relative">
                      <div 
                        className={`bg-gray-900 border ${errors.client_ID ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer`}
                        onClick={() => setIsClientDropdownOpen(!isClientDropdownOpen)}
                      >
                        <div className="flex items-center">
                          <User size={18} className="text-amber-500 mr-2" />
                          <span className="text-white">
                            {field.value 
                              ? clients.find(c => c.client_ID === field.value)?.name || 'Seleccionar cliente'
                              : 'Seleccionar cliente'
                            }
                          </span>
                        </div>
                        <ChevronDown size={18} className={`text-amber-500 transition-transform ${isClientDropdownOpen ? 'transform rotate-180' : ''}`} />
                      </div>
                      
                      {isClientDropdownOpen && (
                        <div className="absolute mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                          {/* Campo de búsqueda para clientes */}
                          <div className="sticky top-0 bg-gray-800 p-2 border-b border-gray-700">
                            <div className="relative">
                              <input
                                type="text"
                                className="bg-gray-900 border border-gray-700 text-white w-full pl-8 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Buscar cliente por ID o nombre..."
                                value={clientSearchQuery}
                                onChange={(e) => setClientSearchQuery(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-gray-400" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Lista de clientes filtrados */}
                          {filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
                              <div 
                                key={client.client_ID} 
                                className="px-4 py-2 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
                                onClick={() => {
                                  field.onChange(client.client_ID);
                                  setIsClientDropdownOpen(false);
                                  setClientSearchQuery('');
                                }}
                              >
                                <div className="flex justify-between">
                                  <span className="text-white">{client.name}</span>
                                  <span className="text-gray-400 text-sm">{client.client_ID}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-gray-400 text-center">
                              No se encontraron clientes
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
              {errors.client_ID && <p className="text-red-500 text-xs mt-1">{errors.client_ID.message}</p>}
            </div>
          </div>
          
          {/* Segunda columna - Información de contacto */}
          <div>
            <h3 className="text-amber-500 font-medium mb-4 border-b border-gray-800 pb-2">Información de Contacto</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Ciudad */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Ciudad
                </label>
                <input
                  type="text"
                  className="bg-gray-900 border border-gray-700 text-white w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Ciudad"
                  {...register('city')}
                />
              </div>
              
              {/* Zona */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Zona
                </label>
                <input
                  type="text"
                  className="bg-gray-900 border border-gray-700 text-white w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Zona"
                  {...register('zone')}
                />
              </div>
            </div>
            
            {/* Barrio */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Barrio
              </label>
              <input
                type="text"
                className="bg-gray-900 border border-gray-700 text-white w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Barrio"
                {...register('neighborhood')}
              />
            </div>
            
            {/* Dirección */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Dirección
              </label>
              <input
                type="text"
                className="bg-gray-900 border border-gray-700 text-white w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Dirección"
                {...register('address')}
              />
            </div>
            
            {/* Teléfono */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Teléfono
              </label>
              <input
                type="text"
                className="bg-gray-900 border border-gray-700 text-white w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Teléfono"
                {...register('cellphone')}
              />
            </div>
          </div>
        </div>
        
        {/* Productos */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-amber-500 font-medium border-b border-gray-800 pb-2">Productos</h3>
            <button
              type="button"
              className="flex items-center text-amber-500 hover:text-amber-400 transition-colors duration-200"
              onClick={() => append({ product_ID: '', quantity: 1, price: 0 })}
            >
              <PlusCircle size={16} className="mr-1" />
              Agregar producto
            </button>
          </div>
          
          {/* Encabezado de tabla */}
          <div className="bg-gray-900 rounded-t-lg px-4 py-3 grid grid-cols-12 gap-4 border-b border-gray-800">
            <div className="col-span-5 text-sm font-medium text-gray-300">Producto</div>
            <div className="col-span-2 text-center text-sm font-medium text-gray-300">Cantidad</div>
            <div className="col-span-3 text-center text-sm font-medium text-gray-300">Precio Unitario</div>
            <div className="col-span-1 text-center text-sm font-medium text-gray-300">Total</div>
            <div className="col-span-1 text-center text-sm font-medium text-gray-300"></div>
          </div>
          
          {/* Filas de productos */}
          <div className="bg-gray-900 rounded-b-lg mb-6">
            {fields.map((field, index) => (
              <div 
                key={field.id} 
                className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-800 last:border-b-0 items-center"
              >
                {/* Producto con búsqueda */}
                <div className="col-span-5">
                  <Controller
                    name={`productsList.${index}.product_ID`}
                    control={control}
                    rules={{ required: 'Producto requerido' }}
                    render={({ field }) => (
                      <div className="relative">
                        <div 
                          className={`bg-gray-800 border ${errors.productsList?.[index]?.product_ID ? 'border-red-500' : 'border-gray-700'} text-white w-full px-4 py-2 rounded-lg flex items-center justify-between cursor-pointer`}
                          onClick={() => {
                            setIsProductDropdownOpen(prev => prev === index ? null : index);
                            // Cerrar otros dropdowns
                            if (isClientDropdownOpen) setIsClientDropdownOpen(false);
                            if (isPaymentDropdownOpen) setIsPaymentDropdownOpen(false);
                          }}
                        >
                          <div className="flex items-center">
                            <Package size={16} className="text-amber-500 mr-2" />
                            <span>
                              {field.value 
                                ? products.find(p => p.product_ID === field.value)?.name || 'Seleccionar producto'
                                : 'Seleccionar producto'
                              }
                            </span>
                          </div>
                          <ChevronDown size={16} className={`text-amber-500 transition-transform ${isProductDropdownOpen === index ? 'transform rotate-180' : ''}`} />
                        </div>
                        
                        {isProductDropdownOpen === index && (
                          <div className="absolute mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                            {/* Campo de búsqueda para productos */}
                            <div className="sticky top-0 bg-gray-800 p-2 border-b border-gray-700">
                              <div className="relative">
                                <input
                                  type="text"
                                  className="bg-gray-900 border border-gray-700 text-white w-full pl-8 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  placeholder="Buscar producto por ID o nombre..."
                                  value={productSearchQueries[index] || ''}
                                  onChange={(e) => updateProductSearch(index, e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Search size={16} className="text-gray-400" />
                                </div>
                              </div>
                            </div>
                            
                            {/* Lista de productos filtrados */}
                            {getFilteredProducts(index).length > 0 ? (
                              getFilteredProducts(index).map((product) => (
                                <div 
                                  key={product.product_ID} 
                                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer border-b border-gray-700 last:border-b-0"
                                  onClick={() => {
                                    field.onChange(product.product_ID);
                                    handleProductChange(index, product.product_ID);
                                    setIsProductDropdownOpen(null);
                                    updateProductSearch(index, '');
                                  }}
                                >
                                  <div className="flex justify-between">
                                    <span className="text-white">{product.name}</span>
                                    <span className="text-gray-400 text-sm">{product.product_ID}</span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-3 text-gray-400 text-center">
                                No se encontraron productos
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  />
                  {errors.productsList?.[index]?.product_ID && (
                    <p className="text-red-500 text-xs mt-1">{errors.productsList[index]?.product_ID?.message}</p>
                  )}
                </div>
                
                {/* Cantidad */}
                <div className="col-span-2">
                  <input
                    type="number"
                    className={`bg-gray-800 border ${errors.productsList?.[index]?.quantity ? 'border-red-500' : 'border-gray-700'} text-white w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-center`}
                    min="1"
                    {...register(`productsList.${index}.quantity`, { 
                      required: 'Requerido',
                      min: { value: 1, message: 'Mínimo 1' },
                      valueAsNumber: true
                    })}
                  />
                </div>
                
                {/* Precio */}
                <div className="col-span-3">
                  <input
                    type="number"
                    className={`bg-gray-800 border ${errors.productsList?.[index]?.price ? 'border-red-500' : 'border-gray-700'} text-white w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-center`}
                    min="0"
                    step="100"
                    {...register(`productsList.${index}.price`, { 
                      required: 'Requerido',
                      min: { value: 0, message: 'Debe ser positivo' },
                      valueAsNumber: true
                    })}
                  />
                </div>
                
                {/* Total por producto */}
                <div className="col-span-1 text-center font-medium text-amber-500">
                  ${((watch(`productsList.${index}.quantity`) || 0) * (watch(`productsList.${index}.price`) || 0)).toLocaleString()}
                </div>
                
                {/* Botón eliminar */}
                <div className="col-span-1 text-center">
                  <button type="button" className="text-gray-400 hover:text-red-500 transition-colors duration-200" onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Total */}
            <div className="flex justify-end py-4 px-6 border-t border-gray-700">
              <div className="w-64">
                <div className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-300">Subtotal:</span>
                  <span className="text-white font-medium">${calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 pt-3">
                  <span className="text-amber-500 font-medium">TOTAL:</span>
                  <span className="text-amber-500 font-bold text-xl">
                    ${(calculateTotal()).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};