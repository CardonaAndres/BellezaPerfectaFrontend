import { useEffect, useState } from "react"
import { SidebarLayout } from "../../common/components/layouts/sidebar/SidebarLayout"
import { usePanelHook } from "../hooks/usePanelHook";
import { LoadingScreen } from "../../common/components/common/LoadingScreen";
import { Header } from "../components/Header";
import { InvoiceCard } from '../components/InvoiceCard';
import { FileText } from "lucide-react";
import { Pagination } from "../../common/components/common/Pagination";

export const PanelPage = () => {
  const { getAllInvoices, loading, meta, invoices } = usePanelHook();

  const [page, setPage] = useState(() => {
    const storedPage = sessionStorage.getItem('invoicesPage');
    return storedPage ? parseInt(storedPage) : 1;
  });

  const [limit, setLimit] = useState(() => {
    const storedLimit = sessionStorage.getItem('invoicesLimit');
    return storedLimit ? parseInt(storedLimit) : 18;
  });

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    sessionStorage.setItem('invoicesLimit', newLimit.toString());
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    sessionStorage.setItem('invoicesPage', newPage.toString());
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getAllInvoices(limit, page)
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

      <div className="bg-black min-h-screen pb-8">
        <div className="container mx-auto px-4 py-6">          
          {/* Grid de facturas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <InvoiceCard key={index} invoice={invoice} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FileText size={48} className="text-gray-700 mx-auto mb-4" />
                <h3 className="text-gray-500 text-lg">No hay facturas disponibles</h3>
                <p className="text-gray-600 mt-2">Crea una nueva factura para comenzar</p>
              </div>
            )}
          </div>
        </div>
        
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
