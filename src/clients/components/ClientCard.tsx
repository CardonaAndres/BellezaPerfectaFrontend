import { User, Phone, MapPin, Hash, FileText, Home } from 'lucide-react';
import { Client } from '../ts/types';
import { useState } from 'react';
import { ClientModal } from './ClientModal';
import { useClientsHook } from '../hooks/useClientsHook';
import { Link } from 'react-router-dom';
import { router } from '../../common/configs/config';

export const ClientCard = ({ client }: { client: Client }) => {
  const { loading, deleteClient } = useClientsHook();
  const [ modal, setModal ] = useState(false);
  const handleModal = () => setModal(!modal);
  const client_ID = client.client_ID || ''

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-yellow-500 transition-all duration-300 shadow-lg">
      {/* Header de la tarjeta */}
      <div className="bg-black p-4 border-b border-yellow-500">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 rounded-full p-2">
              <User size={20} className="text-black" />
            </div>
            <h3 className="text-white font-semibold text-lg truncate">{client.name}</h3>
          </div>
          <div className="bg-yellow-500 bg-opacity-20 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">{client.document_type}</span>
          </div>
        </div>
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-4 space-y-3">
        {/* ID del cliente */}
        <div className="flex items-center">
          <div className="w-8">
            <Hash size={16} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">ID Cliente</p>
            <p className="text-white">{client.client_ID}</p>
          </div>
        </div>
        
        {/* Documento */}
        <div className="flex items-center">
          <div className="w-8">
            <FileText size={16} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Documento</p>
            <p className="text-white">{client.document_type} {client.client_ID}</p>
          </div>
        </div>
        
        {/* Teléfono */}
        <div className="flex items-center">
          <div className="w-8">
            <Phone size={16} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Teléfono</p>
            <p className="text-white">{client.cellphone}</p>
          </div>
        </div>
        
        {/* Ubicación */}
        <div className="flex items-center">
          <div className="w-8">
            <MapPin size={16} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Ubicación</p>
            <p className="text-white">{client.city}, {client.zone}</p>
          </div>
        </div>
        
        {/* Dirección */}
        <div className="flex items-center">
          <div className="w-8">
            <Home size={16} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-400 text-xs">Dirección</p>
            <p className="text-white">{client.address}</p>
            <p className="text-gray-400 text-xs mt-1">{client.neighborhood}</p>
          </div>
        </div>
      </div>
      
      {/* Footer de la tarjeta */}
      <div className="bg-black bg-opacity-50 p-3 flex justify-end space-x-2">
        <Link to={`${router.invoiceByClien}?client_ID=${client.client_ID}`} className="bg-transparent hover:bg-gray-800 text-white px-3 py-1 rounded border border-gray-700 text-sm transition-colors duration-300">
          Detalles
        </Link>
        <button onClick={async () => deleteClient(client_ID, () => {})} disabled={loading} className="bg-red-800 hover:bg-red-600 text-white px-3 py-1 rounded border border-gray-700 text-sm transition-colors duration-300">
          Eliminar
        </button>
        <button onClick={handleModal} className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm font-medium transition-colors duration-300">
          Editar
        </button>
      </div>

      <ClientModal open={modal} onClose={handleModal} clientData={client} />
    </div>
  );
};