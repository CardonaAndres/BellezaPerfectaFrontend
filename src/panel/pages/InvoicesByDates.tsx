import { useSearchParams, useNavigate } from "react-router-dom";
import { LoadingScreen } from "../../common/components/common/LoadingScreen";
import { SidebarLayout } from "../../common/components/layouts/sidebar/SidebarLayout";
import { usePanelHook } from "../hooks/usePanelHook";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../../common/components/alerts/ErrorAlert";
import { router } from "../../common/configs/config";
import { Pagination } from "../../common/components/common/Pagination";
import { Header } from "../components/Header";
import { InvoiceCard } from "../components/InvoiceCard";
import { FileText, Calendar, DollarSign, BarChart3, TrendingUp, ShoppingCart, Download } from "lucide-react";

export const InvoicesByDates = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const startDate = searchParams.get("startDate");
  const { 
    loading, 
    meta, 
    getAllInvoicesByDates, 
    invoices, 
    summary, 
    dailySales, 
    downloadAllInvoices 
  } = usePanelHook();
  
  const onDownload = async () => await downloadAllInvoices(invoices)

  const endDate = searchParams.get("endDate") ? (() => {
    const paramDate = new Date((searchParams.get("endDate") || new Date()));
    paramDate.setDate(paramDate.getDate() + 1); // Suma 1 día a la fecha proporcionada
    return paramDate.toISOString().split('T')[0];
  })() : (() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); 
    return today.toISOString().split('T')[0];
  })();
  
  const [page, setPage] = useState(() => {
    const storedPage = sessionStorage.getItem('invoicesDatePage');
    return storedPage ? parseInt(storedPage) : 1;
  });
  
  const [limit, setLimit] = useState(() => {
    const storedLimit = sessionStorage.getItem('invoicesDateLimit');
    return storedLimit ? parseInt(storedLimit) : 18;
  });
  
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    sessionStorage.setItem('invoicesDateLimit', newLimit.toString());
  };
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    sessionStorage.setItem('invoicesDatePage', newPage.toString());
    window.scrollTo(0, 0);
  };

  // Formatear fechas para mostrar en el encabezado del dashboard
  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    if(!startDate){
      ErrorAlert('Por favor, poner la fecha de inicio');
      navigate(router.panel);
    }  

    getAllInvoicesByDates(
      limit, page, (startDate || new Date(Date.now()-86400000).toISOString().split('T')[0]), endDate
    );
  }, [page, limit, navigate]);

  if(loading) return <LoadingScreen />;

  // Verificar si tenemos datos de resumen y ventas diarias
  const hasSummaryData = summary && summary.totalSales !== undefined;
  const hasDailySalesData = dailySales && dailySales.length > 0;

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
          {/* Dashboard de ventas */}
          {hasSummaryData && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BarChart3 size={24} className="text-amber-500 mr-2" />
                  <h2 className="text-xl font-semibold text-amber-500">
                    Resumen de Ventas
                  </h2>
                </div>
                <button onClick={onDownload} className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg flex items-center transition-colors duration-300">
                  <Download size={18} className="mr-2 text-yellow-500" />
                  <span>Descargar historial completo</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Tarjeta de ventas totales */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-300 font-medium">Ventas Totales</h3>
                    <div className="bg-green-900 p-2 rounded-full">
                      <DollarSign size={20} className="text-green-500" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-amber-500">
                    {formatCurrency(summary.totalSales)}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">Ingresos en el período seleccionado</p>
                </div>
                
                {/* Tarjeta de número de facturas */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-300 font-medium">Facturas Emitidas</h3>
                    <div className="bg-amber-900 p-2 rounded-full">
                      <FileText size={20} className="text-amber-500" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-amber-500">
                    {summary.invoiceCount}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">Total de facturas generadas</p>
                </div>
                
                {/* Tarjeta de ticket promedio */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-300 font-medium">Ticket Promedio</h3>
                    <div className="bg-blue-900 p-2 rounded-full">
                      <TrendingUp size={20} className="text-blue-500" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-amber-500">
                    {formatCurrency(summary.averageTicket)}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">Valor promedio por factura</p>
                </div>
              </div>

              {/* Ventas diarias */}
              {hasDailySalesData && (
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 shadow-lg mb-6">
                  <div className="flex items-center mb-4">
                    <Calendar size={20} className="text-amber-500 mr-2" />
                    <h3 className="text-lg font-medium text-gray-300">Ventas Diarias</h3>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Facturas
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Total Ventas
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {dailySales.map((day, index) => (
                          <tr key={index} className="hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {formatDisplayDate(day.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              <div className="flex items-center">
                                <FileText size={16} className="text-gray-400 mr-2" />
                                {day.invoiceCount}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-amber-500">
                              {formatCurrency(day.total)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Encabezado de la sección de facturas */}
          <div className="flex items-center mb-4">
            <ShoppingCart size={24} className="text-amber-500 mr-2" />
            <h2 className="text-xl font-semibold text-amber-500">Facturas</h2>
          </div>
          
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
  );
};