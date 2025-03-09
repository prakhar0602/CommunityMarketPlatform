import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const users = useSelector((state)=>state.User.user);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#2C2638] shadow-md' : 'bg-[#2C2638]/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-400 flex items-center justify-center">
                {/* Shopping Bag Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2C2638]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-purple-300">EcoMarket</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search items..." 
                className="py-1 pl-8 pr-4 rounded-full border border-purple-700 bg-[#3A3245] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent w-64"
              />
              {/* Search Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2.5 top-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Navigation Links */}
            <Link to="/browse" className="text-gray-200 hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium">
              Browse
            </Link>
            <Link to="/impact" className="text-gray-200 hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium">
              Impact
            </Link>

            {/* User Menu */}
            {users!=undefined ? (
              <div className="flex items-center space-x-2">
                <Link to="/messages" className="p-2 rounded-full hover:bg-[#3A3245] relative">
                  {/* Message Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  <span className="absolute top-0 right-0 h-4 w-4 bg-purple-400 rounded-full text-xs text-[#2C2638] flex items-center justify-center font-bold">3</span>
                </Link>
                <Link to="/dashboard" className="p-2 rounded-full hover:bg-[#3A3245]">
                  {/* Chart Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </Link>
                <Link to="/profile" className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-300">
                  <div className="h-8 w-8 rounded-full bg-[#3A3245] flex items-center justify-center">
                    {/* User Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/auth" className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600">
                  Login / Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-purple-300 focus:outline-none">
              {isOpen ? (
                // X Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Menu Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#3A3245] shadow-lg">
            {/* Mobile Search */}
            <div className="relative mx-2 my-3">
              <input 
                type="text" 
                placeholder="Search items..." 
                className="w-full py-2 pl-8 pr-4 rounded-lg border border-purple-800 bg-[#2C2638] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              {/* Search Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2.5 top-3 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            
            <Link 
              to="/browse" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-purple-300 hover:bg-[#2C2638]"
              onClick={() => setIsOpen(false)}
            >
              Browse
            </Link>
            <Link 
              to="/impact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-purple-300 hover:bg-[#2C2638]"
              onClick={() => setIsOpen(false)}
            >
              Impact
            </Link>
            
            {users!=undefined ? (
              <>
                <Link 
                  to="/messages" 
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-purple-300 hover:bg-[#2C2638]"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Message Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                  Messages
                  <span className="ml-2 h-5 w-5 bg-purple-400 rounded-full text-xs text-[#2C2638] flex items-center justify-center font-bold">3</span>
                </Link>
                <Link 
                  to="/dashboard" 
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-purple-300 hover:bg-[#2C2638]"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Chart Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  Impact Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-purple-300 hover:bg-[#2C2638]"
                  onClick={() => setIsOpen(false)}
                >
                  {/* User Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="mt-2 block text-center bg-purple-500 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-purple-600 mx-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login / Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;