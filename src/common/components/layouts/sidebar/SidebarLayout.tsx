import { useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { LoadingScreen } from '../../common/LoadingScreen';
import { Menu, X, ChevronRight, ChevronLeft, LogOut } from 'lucide-react';
import { SidebarItemsNavigationHook } from '../../../hooks/SidebarItemsNavigationHook';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  children?: ReactNode;
  logoText?: string;
}

export const SidebarLayout = ({ children, logoText = "Belleza Perfecta"}: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout, loading } = useAuth();
  const { menuItems } = SidebarItemsNavigationHook(location.pathname, user);

  // Función para determinar si está en móvil y ajustar el estado
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      if (isMobileView) setIsCollapsed(!isMobileOpen);
      
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isMobileOpen]);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
    isMobileOpen ? setIsCollapsed(true) : setIsCollapsed(false);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex h-screen bg-gradient-to-br from-black to-gray-900">
      {/* Overlay para móviles */}
      {isMobile && isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-20" 
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`${
          isCollapsed ? 'w-16' : 'w-72'
        } ${
          isMobile ? 'fixed z-30 h-full' : 'relative'
        } ${
          isMobile && !isMobileOpen ? '-translate-x-full' : 'translate-x-0'
        } transition-all duration-300 ease-in-out bg-gradient-to-b from-black to-gray-900 border-r border-gray-800 shadow-2xl`}
      >
        {/* Header del Sidebar */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black">
          {!isCollapsed && (
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                {logoText}
              </h1>
            </div>
          )}

          <button
            onClick={() => isMobile ? toggleMobileMenu() : setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-800 text-yellow-500 transition-colors"
            aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
          >
            {isMobile ? 
              <X size={20} className="text-yellow-500" /> : 
              (isCollapsed ? 
                <ChevronRight size={20} className="text-yellow-500" /> : 
                <ChevronLeft size={20} className="text-yellow-500" />
              )
            }
          </button>
        </div>

        {/* Menu Items */}
        <div className="py-5 px-2">
          <div className={`${!isCollapsed ? 'px-2 mb-3' : 'text-center mb-3'}`}>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {!isCollapsed ? 'Navegación' : ''}
            </span>
          </div>
          {menuItems.map((item, index) => (
            <Link to={item.route}
              key={index}
              className={`flex items-center px-3 py-3.5 my-1 cursor-pointer transition-all duration-200 rounded-xl group
                ${item.active 
                  ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 text-yellow-400' 
                  : 'text-gray-400 hover:bg-gray-800/70'}`}
            >
              <div className={`${
                item.active 
                  ? 'text-yellow-500 bg-yellow-500/20' 
                  : 'text-yellow-500/60 bg-gray-800/30 group-hover:bg-yellow-500/10 group-hover:text-yellow-500/80'
                } rounded-lg transition-all duration-200`}>
                {item.icon}
              </div>
              {!isCollapsed && (
                <span className={`ml-3 transition-colors duration-200 ${item.active ? 'font-medium' : ''}`}>
                  {item.name}
                </span>
              )}
              {!isCollapsed && item.active && (
                <div className="ml-auto flex items-center">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t border-gray-800/80 bg-gradient-to-t from-gray-900 to-transparent">
          <div 
            onClick={logout} 
            className="flex items-center px-2 py-4 cursor-pointer text-gray-400 hover:bg-gray-800/70 hover:text-yellow-500 transition-colors rounded-lg mx-2 my-2"
          >
            <div className="p-2 rounded-lg bg-gray-800/80 text-yellow-500/80 group-hover:bg-yellow-500/10">
              <LogOut size={18} />
            </div>
            {!isCollapsed && <span className="ml-3 text-sm">Cerrar Sesión</span>}
          </div>
        </div>
      </div>

      {/* Mobile Toggle Button */}
      {isMobile && !isMobileOpen && (
        <button
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-10 p-2 rounded-full bg-black/80 text-yellow-500 shadow-lg border border-yellow-500/50 hover:bg-gray-900 transition-all hover:scale-105 backdrop-blur-sm"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 overflow-auto ${isMobile ? 'w-full' : ''}`}>
        {/* Contenido Principal */}
        <div className="p-6 text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
}