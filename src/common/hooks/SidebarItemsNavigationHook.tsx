import { Home, UserSquare2, PackageSearch, Users, UserPen } from 'lucide-react';
import { router } from '../configs/config';

export const SidebarItemsNavigationHook = (pathname: string, user: any) => {
  const baseItems = [
    { 
      name: 'Panel', 
      icon: <Home size={20} />, 
      active: router.panel === pathname,
      route: router.panel 
    },
    { 
      name: 'Gestión De Clientes', 
      icon: <UserSquare2 size={20} />, 
      active: router.clients === pathname,
      route: router.clients 
    },
    { 
      name: 'Gestión De Productos', 
      icon: <PackageSearch size={20} />, 
      active: router.products === pathname,
      route: router.products 
    },
    { 
      name: 'Mi Perfil', 
      icon: <UserPen size={20} />, 
      active: router.profile === pathname,
      route: router.profile 
    },
  ];

  const adminItems = [
    { 
      name: 'Gestión De Usuarios', 
      icon: <Users size={20} />, 
      active: router.users === pathname, 
      route: router.users 
    },
  ];

  const menuItems = user?.role_ID === 1 ? [...baseItems, ...adminItems] : baseItems;

  return {
    menuItems
  };
};
