import logo from "../assets/call-center-service.png";


const Header = () => {
  return (
    <>
      <header className="fixed w-full">
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <a href="/" className="flex items-center">
              <img src={logo} className="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                MyAgent
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <a
                href="#about"
                className="text-gray-800 
                                                   dark:text-white 
                                                   hover:bg-gray-50 focus:ring-4 
                                                   focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 
                                                   lg:py-2.5 sm:mr-2 
                                                   dark:hover:bg-gray-700 
                                                   focus:outline-none 
                                                   dark:focus:ring-gray-800"
              >
                About
              </a>

              <a
                href="#demo"
                className="text-white
                             bg-purple-700
                             hover:bg-purple-800
                             focus:ring-4
                             focus:ring-purple-300
                             font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0
                             dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
              >
                Demo
              </a>


            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
