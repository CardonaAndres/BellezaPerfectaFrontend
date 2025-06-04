import { UserProfileProps } from "../../ts/common/types";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Save, UserPlus, User, Mail, Phone, MapPin, Key, ShieldCheck } from 'lucide-react';
import { useUserCommonHook } from "../../hooks/common/useUserCommonHook";

type Props = {
    onClose : () => void,
    initialData : UserProfileProps,
    isAdminPage ?: boolean
}

type Role = {
    role_ID: number;
    name: string;
}

const roles : Role[] = [
    {
        role_ID : 1,
        name : 'Administrador'
    },
    {
        role_ID : 2,
        name : 'Trabajador'
    }
];

export const UserForm = ({ onClose, initialData, isAdminPage = false } : Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const { loading, updateOrRegisterUser } = useUserCommonHook();
    const isEditMode = initialData.user_ID !== null

    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileProps>({
        defaultValues: {
         ...initialData
        }
      });

    const onSubmited = handleSubmit(async (userData : UserProfileProps) => {
        let userDataFilter

        if (isEditMode && userData.password === "") {
            const { password, ...userDataWithoutPassword } = userData;
            userDataFilter = userDataWithoutPassword;
        } else {
            userDataFilter = userData;
        }

        userDataFilter.role_ID = parseInt(String(userDataFilter.role_ID))

        await updateOrRegisterUser(userDataFilter, onClose, isEditMode, isAdminPage)
    }); 
   
    return (
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 shadow-xl overflow-hidden">
        {/* Header del formulario */}
        <div className="px-6 py-5 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black flex items-center">
          <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 mr-3">
            {isEditMode ? <User size={22} /> : <UserPlus size={22} />}
          </div>
          <h2 className="text-xl font-semibold text-yellow-500">
            {isEditMode ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
          </h2>
        </div>
  
        {/* Formulario */}
        <form onSubmit={onSubmited} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label htmlFor="user_ID" className="block text-sm font-medium text-gray-400 mb-1.5">
                  Documento <span className="text-yellow-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    id="user_ID"
                    disabled={isEditMode}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    {...register('user_ID')}
                  />
                </div>
              </div>
          
  
            {/* Nombre */}
            <div className="col-span-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1.5">
                Nombre Completo <span className="text-yellow-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="name"
                  placeholder="Ingresa el nombre completo"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500`}
                  {...register('name', { 
                    required: 'El nombre es obligatorio',
                    minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' }
                  })}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
  
            {/* Email */}
            <div className="col-span-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">
                Correo Electrónico <span className="text-yellow-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="ejemplo@correo.com"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500`}
                  {...register('email', { 
                    required: 'El correo electrónico es obligatorio',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Correo electrónico inválido'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
  
            {/* Teléfono */}
            <div className="col-span-1">
              <label htmlFor="cellphone" className="block text-sm font-medium text-gray-400 mb-1.5">
                Teléfono <span className="text-yellow-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  id="cellphone"
                  placeholder="Ingresa el número telefónico"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border ${errors.cellphone ? 'border-red-500' : 'border-gray-700'} rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500`}
                  {...register('cellphone', { 
                    required: 'El teléfono es obligatorio',
                    pattern: {
                      value: /^[0-9+-\s]+$/,
                      message: 'Número de teléfono inválido'
                    }
                  })}
                />
              </div>
              {errors.cellphone && (
                <p className="mt-1 text-xs text-red-500">{errors.cellphone.message}</p>
              )}
            </div>
  
            {/* Dirección */}
            <div className="col-span-full">
              <label htmlFor="address" className="block text-sm font-medium text-gray-400 mb-1.5">
                Dirección
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  id="address"
                  placeholder="Ingresa la dirección completa"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border ${errors.address ? 'border-red-500' : 'border-gray-700'} rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500`}
                  {...register('address')}
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
              )}
            </div>
  
            {/* Contraseña - No requerida en modo edición */}
            <div className="col-span-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1.5">
                Contraseña {!isEditMode && <span className="text-yellow-500">*</span>}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <Key size={18} />
                </div>
                <input type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder={isEditMode ? "Dejar en blanco para mantener" : "Ingresa la contraseña"}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-800/50 border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500`}
                  {...register('password', { 
                    required: !isEditMode ? 'La contraseña es obligatoria' : false,
                    minLength: {
                      value: 6,
                      message: 'La contraseña debe tener al menos 6 caracteres'
                    }
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
  
            {/* Rol */}
            {isAdminPage && (
                <div className="col-span-1">
                    <label htmlFor="role_ID" className="block text-sm font-medium text-gray-400 mb-1.5">
                    Rol <span className="text-yellow-500">*</span>
                    </label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <ShieldCheck size={18} />
                    </div>
                    <select id="role_ID"
                        className={`w-full pl-10 pr-4 py-3 bg-gray-800/50 border ${errors.role_ID ? 'border-red-500' : 'border-gray-700'} rounded-xl text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 focus:border-yellow-500 appearance-none`}
                        {...register('role_ID', { 
                        required: 'El rol es obligatorio',
                        validate: value => value > 0 || 'Debes seleccionar un rol'
                        })}
                    >
                        <option value={0}>Seleccionar rol</option>
                        {roles.map(role => (
                        <option key={role.role_ID} value={role.role_ID}>{role.name}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg 
                        className="h-5 w-5 text-gray-500" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor" 
                        aria-hidden="true"
                        >
                        <path 
                            fillRule="evenodd" 
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                        />
                        </svg>
                    </div>
                    </div>
                    {errors.role_ID && (
                    <p className="mt-1 text-xs text-red-500">{errors.role_ID.message}</p>
                    )}
                </div>
            )}

          </div>
  
          {/* Botones de acción */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  {isEditMode ? 'Actualizar Usuario' : 'Crear Usuario'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    )
}

