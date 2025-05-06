import { useForm } from 'react-hook-form';
import { useClientsHook } from '../hooks/useClientsHook';
import { Client } from '../ts/types';
import { Save, X, User, FileText, MapPin, Phone, Home, Hash, FileCheck, Trash, MapPinned } from 'lucide-react';
import { Link } from 'react-router-dom';
import { router } from '../../common/configs/config';

type ClientFormProps = {
  initialData?: Client;
  onClose: () => void;
};

export const ClientForm = ({ initialData, onClose, }: ClientFormProps) => {
  const { loading, registerOrUpdateClient, deleteClient } = useClientsHook();  
  const { register, handleSubmit, formState: { errors }} = useForm<Client>({
    defaultValues: { ...initialData }
  });
  
  const client_ID = initialData?.client_ID || '';
  const isEditing = initialData?.client_ID !== null;
  const submitHandler = async (data: Client) => await registerOrUpdateClient(isEditing, onClose, data)

  return (
    <div className="bg-black text-white rounded-lg shadow-xl border border-gray-800 w-full max-w-2xl mx-auto">
      <div className="border-b border-yellow-500 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-yellow-500 flex items-center">
          <User className="mr-2" size={20} />
          {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit(submitHandler)} className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Tipo de documento */}
          <div className="col-span-1">
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
              <FileCheck className="mr-2 text-yellow-500" size={16} />
              Tipo de Documento
            </label>
            <input
              type="text"
              {...register('document_type', { required: 'Este campo es requerido' })}
              className="bg-gray-900 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese el tipo de documento"
            />
            {errors.document_type && (
              <p className="text-red-500 text-xs mt-1">{errors.document_type.message}</p>
            )}
          </div>
          
          {/* Número de documento */}
          <div className="col-span-1">
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
              <Hash className="mr-2 text-yellow-500" size={16} />
              Número de Documento
            </label>
            <input type="text" {...register('client_ID', { 
                required: 'Este campo es requerido'
              })} disabled={isEditing} 
              className="bg-gray-900 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese el número de documento"
            />
            {errors.client_ID && (
              <p className="text-red-500 text-xs mt-1">{errors.client_ID.message}</p>
            )}
          </div>
          
          {/* Nombre completo */}
          <div className="col-span-2">
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
              <FileText className="mr-2 text-yellow-500" size={16} />
              Nombre Completo
            </label>
            <input
              type="text"
              {...register('name', { required: 'Este campo es requerido' })}
              className="bg-gray-900 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese el nombre completo"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          
          {/* Ciudad */}
          <div className="col-span-1">
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
              <MapPin className="mr-2 text-yellow-500" size={16} />
              Ciudad
            </label>
            <input
              type="text"
              {...register('city', { required: 'Este campo es requerido' })}
              className="bg-gray-900 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese la ciudad"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>
          
          {/* Barrio */}
          <div className="col-span-1">
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
              <Home className="mr-2 text-yellow-500" size={16} />
              Barrio
            </label>
            <input
              type="text"
              {...register('neighborhood', { required: 'Este campo es requerido' })}
              className="bg-gray-900 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese el barrio"
            />
            {errors.neighborhood && (
              <p className="text-red-500 text-xs mt-1">{errors.neighborhood.message}</p>
            )}
          </div>

          {/* Zona */}
          <div className="col-span-2">
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
              <MapPinned className="mr-2 text-yellow-500" size={16} />
              Zona
            </label>
            <input type="text" {...register('zone', { required: 'Este campo es requerido' })}
              className="bg-gray-900 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese la zona"
            />
            {errors.zone && (
              <p className="text-red-500 text-xs mt-1">{errors.zone.message}</p>
            )}
          </div>
          
          {/* Dirección */}
          <div className="col-span-1">
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
              <MapPin className="mr-2 text-yellow-500" size={16} />
              Dirección
            </label>
            <input
              type="text"
              {...register('address', { required: 'Este campo es requerido' })}
              className="bg-gray-900 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese la dirección"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
            )}
          </div>
          
          {/* Teléfono */}
          <div className="col-span-1">
            <label className="text-gray-300 text-sm font-medium mb-2 flex items-center">
              <Phone className="mr-2 text-yellow-500" size={16} />
              Teléfono
            </label>
            <input
              type="text"
              {...register('cellphone', { 
                required: 'Este campo es requerido',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Solo se permiten números'
                }
              })}
              className="bg-gray-900 text-white w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Ingrese el número telefónico"
            />
            {errors.cellphone && (
              <p className="text-red-500 text-xs mt-1">{errors.cellphone.message}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 border-t border-gray-700 pt-4">
          {isEditing &&     
              <button type="button" onClick={async () => await deleteClient(client_ID, onClose, true) }
                className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
              >
                <Trash size={16} className="mr-1" />
                Eliminar
              </button>
            }
            {isEditing &&     
              <Link to={`${router.invoiceByClien}?client_ID=${client_ID}`} type="button"  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center"
              >
                Detalles
              </Link>
            }
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
          >
            <X size={16} className="mr-1" />
            Cancelar
          </button>
          <button type="submit" disabled={loading}
            className="px-4 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 transition-colors flex items-center disabled:opacity-50"
          >
            <Save size={16} className="mr-1" />
            {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};