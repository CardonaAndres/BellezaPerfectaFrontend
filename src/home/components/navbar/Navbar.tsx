import Logo from '../../../common/assets/imgs/Logo.jpg';
import { Link } from "react-router-dom";
import { router } from "../../../common/configs/config";
import { useAuth } from '../../../common/contexts/AuthContext';

export const Navbar = () => {
  const { isAuth } = useAuth();

  return (
    <nav className="px-4 sm:px-8 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center    space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-md flex items-center justify-center">
            <img src={Logo} alt="logo" />
          </div>
          <span className="text-lg sm:text-xl font-light tracking-widest">BELLEZA PERFECTA</span>
        </div>
        <div>
          <Link to={router.login} className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md text-sm font-medium transition duration-300">
            {isAuth ? 'Bienvenido' : 'Iniciar Sesión'}
          </Link>
        </div>
    </nav>
  )
}

