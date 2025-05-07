import './common/assets/css/index.css';
import { router } from './common/configs/config';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from './home/pages/HomePage';
import { AuthProvider } from './common/contexts/AuthContext';
import { LoginPage } from './auth/pages/LoginPage';
import { ProtectedRoute } from './auth/components/ProtectedRoute';
import { PanelPage } from './panel/pages/PanelPage';
import { ClientManagementPage } from './clients/pages/ClientManagementPage';
import { ProductsManagmentPage } from './products/pages/ProductsManagmentPage';
import { InventoryRecordsPage } from './inventory/pages/InventoryRecordsPage';
import { ProfilePage } from './users/pages/common/ProfilePage';
import { AccessControl } from './auth/components/AccessContro';
import { UserManagerPage } from './users/pages/admin/UserManagerPage';
import { InvoicesByClientPage } from './panel/pages/InvoicesByClientPage';
import { InvoicesByDates } from './panel/pages/InvoicesByDates';

function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={router.home} element={<HomePage />} /> 
          <Route path={router.login} element={<LoginPage />} /> 

          <Route element={<ProtectedRoute />}>
            <Route path={router.panel} element={<PanelPage />} /> 
            <Route path={router.clients} element={<ClientManagementPage/>} />
            <Route path={router.products} element={<ProductsManagmentPage />} />
            <Route path={router.inventoryRecords} element={<InventoryRecordsPage />} />
            <Route path={router.profile} element={<ProfilePage />} />
            <Route path={router.invoiceByClien} element={<InvoicesByClientPage />} />
            <Route path={router.InvoicesByDates} element={<InvoicesByDates />} />
            
            <Route element={<AccessControl />}>
              <Route path={router.users} element={<UserManagerPage />} />
            </Route>
          </Route> 
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
