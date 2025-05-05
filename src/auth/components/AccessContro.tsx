import { useAuth } from "../../common/contexts/AuthContext";
import { LoadingScreen } from "../../common/components/common/LoadingScreen";
import { Outlet } from "react-router-dom";
import { UserProfileProps } from "../../users/ts/common/types";

export const AccessControl = () => {
    const { user, loading } = useAuth() as { 
        user : UserProfileProps | null; loading : boolean 
    }

    if(loading || !user ) return <LoadingScreen />
      
    return (user && user.role_ID === 1) ? <Outlet /> : <LoadingScreen />
}