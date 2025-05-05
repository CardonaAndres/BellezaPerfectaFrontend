import { useEffect, useState } from 'react';
import { SidebarLayout } from '../../../common/components/layouts/sidebar/SidebarLayout'
import { useUserAdminHook } from '../../hooks/admin/useUserAdminHook';
import { LoadingScreen } from '../../../common/components/common/LoadingScreen';
import { Header } from '../../components/admin/Header';
import { Pagination } from '../../../common/components/common/Pagination';
import { UserCard } from '../../components/admin/UserCard';
import { User } from 'lucide-react';

export const UserManagerPage = () => {
  const { loading, meta, users, getAllUsers } = useUserAdminHook();

  const [page, setPage] = useState(() => {
    const storedPage = sessionStorage.getItem('usersPage');
    return storedPage ? parseInt(storedPage) : 1;
  });

  const [limit, setLimit] = useState(() => {
    const storedLimit = sessionStorage.getItem('usersLimit');
    return storedLimit ? parseInt(storedLimit) : 18;
  });

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    sessionStorage.setItem('usersLimit', newLimit.toString());
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    sessionStorage.setItem('usersPage', newPage.toString());
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getAllUsers(limit, page)
  }, [limit, page]);

  if(loading) return <LoadingScreen />

  return (
    <SidebarLayout>
      <Header
        meta={meta}
        limit={limit}
        page={page}
        onLimitChange={handleLimitChange}
      />

      <div className="container mx-auto px-4 py-6">
   
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user.user_ID} user={user} />
            ))}
          </div>
        
          {users.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <User size={48} className="text-amber-500 mb-3" />
              <p>No se encontraron usuarios</p>
            </div>
          )}
    
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
  )
}

