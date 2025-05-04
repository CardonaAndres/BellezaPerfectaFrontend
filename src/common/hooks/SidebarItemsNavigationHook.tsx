import { router } from '../configs/config';
import { Home, UserSquare2, PackageSearch } from 'lucide-react';

export const SidebarItemsNavigationHook = (pathname : string) => {
    const menuItems = [
        { 
            name: 'Panel', 
            icon: <Home size={20} />, 
            active: router.panel == pathname,
            route : router.panel 
        },
        { 
            name: 'Gestión De Clientes', 
            icon: <UserSquare2 size={20} />, 
            active: router.clients == pathname,
            route : router.clients 
        },
        { 
          name: 'Gestión De Productos', 
          icon: <PackageSearch size={20} />, 
          active: router.products == pathname,
          route : router.products 
      },
    ];

  return {
    menuItems
  }
}

