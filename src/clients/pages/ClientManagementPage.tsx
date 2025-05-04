import { useEffect, useState } from 'react';
import { SidebarLayout } from '../../common/components/layouts/sidebar/SidebarLayout';
import { useClientsHook } from '../hooks/useClientsHook';
import { LoadingScreen } from '../../common/components/common/LoadingScreen';
import { Header } from '../components/Header';
import { ClientsGrid } from '../components/ClientsGrid';
import { Pagination } from '../../common/components/common/Pagination';

export const ClientManagementPage = () => {
  const { loading, getAllClientsPaginate, meta, clients } = useClientsHook();

  const [page, setPage] = useState(() => {
    const storedPage = sessionStorage.getItem('clientsPage');
    return storedPage ? parseInt(storedPage) : 1;
  });

  const [limit, setLimit] = useState(() => {
    const storedLimit = sessionStorage.getItem('clientsLimit');
    return storedLimit ? parseInt(storedLimit) : 18;
  });

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    sessionStorage.setItem('clientsLimit', newLimit.toString());
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    sessionStorage.setItem('clientsPage', newPage.toString());
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getAllClientsPaginate({ page, limit });
    sessionStorage.setItem('clientsPage', page.toString());
  }, [page, limit]);

  if (loading) return <LoadingScreen />;

  return (
    <SidebarLayout logoText='Gestión De Clientes'>
      <Header
        meta={meta}
        limit={limit}
        page={page}
        onLimitChange={handleLimitChange}
      />

      <div className="container mx-auto px-4 py-6">
        <ClientsGrid clients={clients} />

        <div className="flex justify-between items-center mt-8 mb-4 text-sm text-gray-400">
          <div>
            Mostrando <span className="text-white">{Math.min((page - 1) * limit + 1, meta.total)}-{Math.min(page * limit, meta.total)}</span> de <span className="text-white">{meta.total}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Página {page} de {meta.last_page}</span>
          </div>
        </div>
        
        {/* Componente de paginación */}
        <Pagination 
          currentPage={page}
          totalPages={meta.last_page}
          onPageChange={handlePageChange}
          className="mt-4"
        />
      </div>
    </SidebarLayout>
  );
};
