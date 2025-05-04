import { Sparkles, Shield, Clock, Award } from 'lucide-react';
import { Navbar } from '../components/navbar/Navbar';
import { Hero } from '../components/hero/Hero';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar - Responsive */}
      <Navbar />

      {/* Main Section */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-16">
          {/* Feature 1 */}
          <div className="p-4 md:p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black hover:border-yellow-900 transition duration-300 group">
            <div className="mb-4 p-3 bg-yellow-500/10 rounded-lg w-12 h-12 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-yellow-500" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-yellow-400 transition duration-300">Diseño Intuitivo</h3>
            <p className="text-gray-400 text-sm md:text-base">Interfaz elegante y fácil de usar para optimizar todos tus procesos administrativos.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="p-4 md:p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black hover:border-yellow-900 transition duration-300 group">
            <div className="mb-4 p-3 bg-yellow-500/10 rounded-lg w-12 h-12 flex items-center justify-center">
              <Shield className="h-5 w-5 text-yellow-500" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-yellow-400 transition duration-300">Seguridad Total</h3>
            <p className="text-gray-400 text-sm md:text-base">Protección avanzada para todos los datos sensibles de tu empresa y clientes.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="p-4 md:p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black hover:border-yellow-900 transition duration-300 group">
            <div className="mb-4 p-3 bg-yellow-500/10 rounded-lg w-12 h-12 flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-yellow-400 transition duration-300">Eficiencia</h3>
            <p className="text-gray-400 text-sm md:text-base">Automatización de tareas para ahorrar tiempo y minimizar errores en la gestión.</p>
          </div>
          
          {/* Feature 4 */}
          <div className="p-4 md:p-6 rounded-xl border border-gray-800 bg-gradient-to-b from-gray-900 to-black hover:border-yellow-900 transition duration-300 group">
            <div className="mb-4 p-3 bg-yellow-500/10 rounded-lg w-12 h-12 flex items-center justify-center">
              <Award className="h-5 w-5 text-yellow-500" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-yellow-400 transition duration-300">Exclusividad</h3>
            <p className="text-gray-400 text-sm md:text-base">Sistema personalizado a las necesidades específicas de Belleza Perfecta.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}