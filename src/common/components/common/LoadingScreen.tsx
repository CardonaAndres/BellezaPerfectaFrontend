import { useEffect, useState } from 'react';
import Logo from '../../assets/imgs/Logo.jpg';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  
  // Simulación de progreso de carga
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + Math.random() * 10, 100);
        if (newProgress === 100) {
          clearInterval(timer);
        }
        return newProgress;
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Círculo decorativo superior */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        
        {/* Círculo decorativo inferior */}
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
        
        {/* Línea decorativa */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
      </div>
      
      {/* Logo container con animación de pulse */}
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping opacity-20"></div>
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center relative z-10">
          {/* Placeholder para logo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
            <img src={Logo} alt="Logo" className='rounded-3xl' />
          </div>
        </div>
      </div>
      
      {/* Texto de carga */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-light text-white mb-2">
          <span className="font-normal">Belleza</span> Perfecta
        </h2>
        <p className="text-yellow-500 text-sm sm:text-base">
          Sistema Administrativo
        </p>
      </div>
      
      {/* Barra de progreso */}
      <div className="w-64 sm:w-80 mb-4 relative">
        <div className="overflow-hidden h-1 text-xs flex bg-gray-800 rounded-full">
          <div 
            style={{ width: `${progress}%` }} 
            className="animate-pulse shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-yellow-400 to-yellow-500"
          ></div>
        </div>
        
        {/* Porcentaje de carga */}
        <div className="mt-2 flex justify-between items-center text-xs text-gray-400">
          <span>Cargando recursos</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      
      {/* Mensajes de carga */}
      <div className="h-6 text-center">
        <p className="text-gray-500 text-xs">
          {progress < 30 && "Iniciando sistema..."}
          {progress >= 30 && progress < 60 && "Cargando datos..."}
          {progress >= 60 && progress < 90 && "Preparando interfaz..."}
          {progress >= 90 && "¡Estamos listos!"}
        </p>
      </div>
      
      {/* Elemento decorativo rotador */}
      <div className="absolute bottom-10 right-10 hidden sm:block">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-yellow-500/20 rounded-md animate-spin"></div>
          <div className="absolute inset-1 border-2 border-yellow-500/40 rounded-md animate-spin" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-2 border-2 border-yellow-500/60 rounded-md animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }}></div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-gray-600 text-center">
        <p>© {new Date().getFullYear()} Belleza Perfecta</p>
      </div>
    </div>
  );
}