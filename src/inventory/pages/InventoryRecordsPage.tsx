import { useNavigate, useSearchParams } from "react-router-dom";
import { SidebarLayout } from "../../common/components/layouts/sidebar/SidebarLayout"
import { useInventoryHook } from "../hooks/useInventoryHook";
import { useEffect, useState } from "react";
import { router } from "../../common/configs/config";
import { LoadingScreen } from "../../common/components/common/LoadingScreen";
import { Pagination } from "../../common/components/common/Pagination";
import { Header } from "../components/Header";
import { Package } from "lucide-react";
import { RecordCard } from "../components/RecordCard";

export const InventoryRecordsPage = () => {
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate(); 
  const product_ID = searchParams.get("product_ID") || '0';

  const [page, setPage] = useState(() => {
    const storedPage = sessionStorage.getItem('inventoryPage');
    return storedPage ? parseInt(storedPage) : 1;
  });

  const [limit, setLimit] = useState(() => {
    const storedLimit = sessionStorage.getItem('inventoryLimit');
    return storedLimit ? parseInt(storedLimit) : 18;
  });

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    sessionStorage.setItem('inventoryLimit', newLimit.toString());
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    sessionStorage.setItem('inventoryPage', newPage.toString());
    window.scrollTo(0, 0);
  };

  const { 
    loading, 
    getAllProductRecords, 
    meta,
    records 
  } = useInventoryHook(product_ID);


  useEffect(() => {

    if(searchParams.get("product_ID") === null) 
      navigate(router.products)

    getAllProductRecords(limit, page);
    sessionStorage.setItem('inventoryPage', page.toString());

  }, [page, limit, product_ID, navigate]);

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
        <div className="bg-gray-900 border border-gray-800 rounded-lg mb-6 p-4">
          <div className="flex items-center mb-4">
            <Package size={24} className="text-amber-500 mr-2" />
            <h2 className="text-xl font-semibold text-white">Historial de Cambios</h2>
          </div>
        </div>

        {/* Línea de tiempo de registros */}
        <div className="bg-black rounded-lg shadow-lg overflow-hidden border border-gray-800">
          <div className="bg-gray-900 px-6 py-4 border-b border-gray-800">
            <h3 className="text-lg font-medium text-white">Historial de Movimientos</h3>
          </div>
          
          <div className="divide-y divide-gray-800">
            {records && records.length > 0 ? ( records.map((record, index) => (
                <RecordCard record={record} key={index} />
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                <Package size={40} className="mx-auto text-gray-600 mb-3" />
                <p>No hay registros de inventario para este producto</p>
              </div>
            )}
          </div>
          
          {records && records.length > 0 && (
            <div className="bg-gray-900 px-6 py-4 border-t border-gray-800">
              <Pagination
                currentPage={page}
                totalPages={meta.last_page}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </SidebarLayout>
  )
}