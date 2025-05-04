import Logo from '../../../common/assets/imgs/Logo.jpg';

export const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center mb-12 sm:mb-20">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Sistema
              <span className="text-yellow-500"> Admin</span>
              <br />
              <span className="relative">
                Inteligente
                <svg className="absolute -bottom-2 sm:-bottom-3 left-0 w-full" height="10" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 5C50 -1 150 11 200 5" stroke="yellow" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl mb-6 sm:mb-10 max-w-lg">
              Simplifica tu gestión interna con una plataforma diseñada exclusivamente para Belleza Perfecta.
            </p>
          </div>
          <div className="w-full lg:w-1/2 relative">
            {/* Abstract Geometric Element - Responsive */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Glow Effects */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-yellow-500/20 rounded-full blur-3xl"></div>
              
              {/* Geometric Shapes - Adjusted for mobile */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-5 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 border border-gray-800 rounded-xl bg-gray-900/50 backdrop-blur-sm"></div>
                <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-64 h-40 sm:h-64 border border-yellow-900/30 rounded-full bg-yellow-900/5"></div>
                <div className="absolute bottom-5 sm:bottom-10 right-10 sm:right-20 w-32 sm:w-52 h-32 sm:h-52 border border-gray-800 rounded-3xl bg-gray-900/50 backdrop-blur-sm transform rotate-12"></div>
                
                {/* Central Element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 sm:w-48 h-36 sm:h-48 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full flex items-center justify-center border border-yellow-500/30">
                  {/* Animated Rings */}
                  <div className="absolute inset-0 border-4 border-yellow-500/20 rounded-full animate-ping opacity-20"></div>
                  <div className=" bg-black/80 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-800">
                    <img src={Logo} alt="Logo" loading="lazy" className="rounded-[50%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}


