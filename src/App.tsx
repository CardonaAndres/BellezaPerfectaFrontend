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
      
          </Route>
          
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
