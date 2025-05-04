import Cookies from 'js-cookie';
import { router } from '../../common/configs/config';
import { LoadingScreen } from '../../common/components/common/LoadingScreen';
import { useAuth } from '../../common/contexts/AuthContext';
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isAuth, loading } = useAuth();

    const cookies = Cookies.get();
    const isAuthCookie = cookies?.isAuth === "true"; 
    const token = cookies?.token;

    if (loading) return <LoadingScreen />;
    
    if (!isAuth && !isAuthCookie && !loading && !token) return <Navigate to={router.home} replace />;

    return <Outlet />;
};