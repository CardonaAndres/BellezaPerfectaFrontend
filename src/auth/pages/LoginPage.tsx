import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, User, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { login } from '../ts/AuthTypes';
import { useAuth } from '../../common/contexts/AuthContext';
import { LoadingScreen } from '../../common/components/common/LoadingScreen';
import { useNavigate } from 'react-router-dom';
import { router } from '../../common/configs/config';

export const LoginPage = () => {
  const { isAuth, loading, login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues : {
      user_ID : '', password : ''
    }
  });

  const onSubmit = async (data : login) => {
    setIsSubmitting(true);
    try {
      await login(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if(isAuth) navigate(router.panel);
  }, [isAuth, navigate])

  if(loading) return <LoadingScreen />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col">
      {/* Top decorative element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>

      {/* Background decorations */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-700 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-600 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>
            
            <div className="p-8">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-2">Bienvenido</h1>
                <p className="text-gray-400">Ingresa tus credenciales para acceder</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Document Number Field */}
                <div className="space-y-2">
                  <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-300">
                    Número de Documento
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400" />
                    </div>
                    <input
                      id="user_ID"
                      type="text"
                      {...register("user_ID", { 
                        required: "El número de documento es requerido",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Ingresa solo números"
                        }
                      })}
                      className={`w-full pl-12 pr-4 py-4 bg-gray-800 bg-opacity-50 backdrop-blur-sm border ${
                        errors.user_ID ? 'border-red-500' : 'border-gray-700'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-white transition-all duration-300`}
                      placeholder="Ingresa tu número de documento"
                    />
                    <div className="absolute inset-0 rounded-xl border border-transparent group-focus-within:border-gradient-to-r group-focus-within:from-yellow-500 group-focus-within:to-pink-500 opacity-0 group-focus-within:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.user_ID && (
                    <div className="flex items-center mt-1 text-red-400 text-xs">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      <span>{errors.user_ID.message}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Contraseña
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", { 
                        required: "La contraseña es requerida",
                        minLength: {
                          value: 6,
                          message: "La contraseña debe tener al menos 6 caracteres"
                        }
                      })}
                      className={`w-full pl-12 pr-12 py-4 bg-gray-800 bg-opacity-50 backdrop-blur-sm border ${
                        errors.password ? 'border-red-500' : 'border-gray-700'
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 text-white transition-all duration-300`}
                      placeholder="Ingresa tu contraseña"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-gray-500 hover:text-pink-400 focus:outline-none transition-colors duration-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <div className="absolute inset-0 rounded-xl border border-transparent group-focus-within:border-gradient-to-r group-focus-within:from-yellow-500 group-focus-within:to-pink-500 opacity-0 group-focus-within:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.password && (
                    <div className="flex items-center mt-1 text-red-400 text-xs">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      <span>{errors.password.message}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-4 px-4 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 hover:from-yellow-600 hover:via-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">Procesando...</span>
                    ) : (
                      <span className="flex items-center">
                        Iniciar Sesión
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </button>
                </div>
              </form>       
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Belleza Perfecta. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};