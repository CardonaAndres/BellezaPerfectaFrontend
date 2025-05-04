import { useEffect, useState } from "react";
import { SidebarLayout } from "../../../common/components/layouts/sidebar/SidebarLayout"
import { useUserCommonHook } from "../../hooks/common/useUserCommonHook"
import { LoadingScreen } from "../../../common/components/common/LoadingScreen";
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';
import { ModalForm } from "../../components/common/ModalForm";

const getRoleDetails = (roleId: number) => {
  switch(roleId) {
    case 1:
      return { name: 'Administrador', color: 'text-white', bg: 'bg-amber-500' };
    case 2:
      return { name: 'Empleado', color: 'text-blue-500', bg: 'bg-blue-500' };
    default:
      return { name: 'Usuario', color: 'text-gray-500', bg: 'bg-gray-500' };
  }
};

export const ProfilePage = () => {
  const { loading, user, getProfile } = useUserCommonHook();
  const [ modal, setModal ] = useState(false);

  const handleModal = () => setModal(!modal);

  useEffect(() => { getProfile() }, []);

  if(loading || !user) return <LoadingScreen />

  const roleDetails = getRoleDetails(user.role_ID);
  
  return (
    <SidebarLayout logoText="Mi Perfil">
       <div className="bg-black text-white rounded-lg shadow-xl overflow-hidden border border-gray-800">
          {/* Header con información básica y acciones */}
          <div className="bg-gradient-to-r from-gray-900 to-black p-6 border-b border-amber-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-20 w-20 rounded-full bg-gray-800 flex items-center justify-center border-2 border-amber-500">
                  <User size={40} className="text-amber-500" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  <div className="flex items-center mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleDetails.bg} bg-opacity-20 ${roleDetails.color}`}>
                      {roleDetails.name}
                    </span>
                    <span className="ml-3 text-gray-400 text-sm">ID: {user.user_ID}</span>
                  </div>
                </div>
              </div>
              
              <button onClick={handleModal} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300 border border-amber-500"
              >
                <Edit size={16} className="mr-2 text-amber-500" />
                <span>Editar Perfil</span>
              </button>
            </div>
          </div>
      
          {/* Contenido principal */}
          <div className="p-6">
            {/* Información de contacto */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-amber-500 font-medium mb-4 flex items-center">
                  <Mail size={18} className="mr-2" />
                  Información de Contacto
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail size={16} className="text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-gray-400 text-sm">Correo Electrónico</p>
                      <p className="text-white">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={16} className="text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-gray-400 text-sm">Teléfono</p>
                      <p className="text-white">{user.cellphone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin size={16} className="text-gray-400 mt-1 mr-3" />
                    <div>
                      <p className="text-gray-400 text-sm">Dirección</p>
                      <p className="text-white">{user.address}</p>
                    </div>
                  </div>
                </div>
              </div>  
            </div>
          </div>

          <ModalForm onClose={handleModal} open={modal} userData={user} />
       </div>
    </SidebarLayout>
  )
}