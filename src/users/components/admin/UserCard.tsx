import { useState } from "react";
import { useUserAdminHook } from "../../hooks/admin/useUserAdminHook";
import { UserProfileProps } from "../../ts/common/types"
import { User, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { ModalForm } from "../common/ModalForm";

type Props = {
    user : UserProfileProps
}

const getRoleLabel = (roleId: number): string => {
    const roles = {
      1: 'Administrador',
      2: 'Trabajador',
    };

    return roles[roleId as keyof typeof roles] || 'Usuario';
};

const getRoleBorderColor = (roleId: number): string => {
    const colors = {
      1: 'border-red-500',
      2: 'border-amber-500',
    };
    return colors[roleId as keyof typeof colors] || 'border-amber-500';
};

export const UserCard = ({ user } : Props ) => {
  const [ modal, setModal ] = useState(false);
  const handleModal = () => setModal(!modal);

  const { loading, deleteUser } = useUserAdminHook();
    
  return (
    <div className={`bg-gray-900 border-l-4 ${getRoleBorderColor(user.role_ID)} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <div className="p-4">
        {/* Encabezado con ID y Rol */}
        <div className="flex justify-between items-center mb-3">
          <div className="bg-black px-3 py-1 rounded-full text-xs text-amber-500">
            ID: {user.user_ID}
          </div>
          <div className="flex items-center bg-black bg-opacity-50 px-3 py-1 rounded-full">
            <Shield size={14} className="text-amber-500 mr-1" />
            <span className="text-xs text-white">{getRoleLabel(user.role_ID)}</span>
          </div>
        </div>
        
        {/* Nombre del usuario */}
        <div className="flex items-center mb-4">
          <User size={22} className="text-amber-500 mr-2" />
          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
        </div>
        
        {/* Información de contacto */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-300">
            <Mail size={16} className="text-amber-500 mr-2" />
            <span className="truncate">{user.email}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            <Phone size={16} className="text-amber-500 mr-2" />
            <span>{user.cellphone}</span>
          </div>
          
          <div className="flex items-start text-gray-300">
            <MapPin size={16} className="text-amber-500 mr-2 mt-1 flex-shrink-0" />
            <span className="line-clamp-2">{user.address}</span>
          </div>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="flex border-t border-gray-800 divide-x divide-gray-800">
        <button disabled={loading} onClick={handleModal} className="flex-1 py-2 text-white hover:bg-gray-800 transition-colors duration-200 text-sm">
          Editar
        </button>
        <button disabled={loading} onClick={async () => await deleteUser(user.user_ID || '') } className="flex-1 py-2 text-white hover:bg-red-800 transition-colors duration-200 text-sm">
          Eliminar
        </button>
      </div>

      <ModalForm
        open={modal}
        onClose={handleModal}
        userData={user}
        isAdminPage={true}
      />
    </div>
  )
}

