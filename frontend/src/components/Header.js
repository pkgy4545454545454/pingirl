import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Menu, X, ShoppingCart, Building2, User, UserCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { useNotificationWebSocket } from '../hooks/useWebSocket';

const Header = () => {
  const { items: cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { user, logout, isAuthenticated, isEnterprise } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    isConnected: wsConnected,
    unreadCount: wsUnreadCount,
  } = useNotificationWebSocket();

  const [apiUnreadCount, setApiUnreadCount] = useState(0);
  const unreadCount = wsConnected ? wsUnreadCount : apiUnreadCount;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { path: '/', label: 'Annonces' },

  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pink-200 backdrop-blur-lg border-b border-pink-100" data-testid="main-header">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 lg:h-16">

          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2" data-testid="logo-link">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-pink-400 to-sky-300 flex items-center justify-center">
               <img src="ChatGPT_Image_2_mai_2026__02_16_43-removebg-preview(2).png" alt="PinkGirl Logo" className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-lg sm:text-xl font-bold gradient-text-pink" style={{ fontFamily: 'Dancing Script, cursive' }}>
                PinkGirl
              </span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-1.5 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5 ml-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-pink-500'
                      : 'text-gray-600 hover:text-pink-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 text-gray-500 hover:text-pink-500 transition-colors" data-testid="cart-btn">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Icon */}
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 text-gray-500 hover:text-pink-500 outline-none transition-colors" data-testid="profile-btn">
                <User className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-pink-100 rounded-xl p-2 min-w-[200px] shadow-lg shadow-pink-100/50">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-800 border-b border-pink-50 mb-2 font-medium">
                      {user?.first_name || 'Mon compte'}
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to={isEnterprise ? '/dashboard/entreprise' : '/dashboard/client'} className="cursor-pointer text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="cursor-pointer text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg">
                        Mes Commandes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-pink-50" />
                    <DropdownMenuItem onClick={logout} className="text-red-400 cursor-pointer hover:bg-red-50 rounded-lg">
                      Déconnexion
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-500 border-b border-pink-50 mb-2">
                      Choisissez votre profil
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/auth?type=client" className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-pink-500 hover:bg-pink-50 rounded-lg">
                        <UserCircle className="w-4 h-4 text-pink-400" />
                        <span>Connexion</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/inscription-entreprise" className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-sky-500 hover:bg-sky-50 rounded-lg">
                        <Building2 className="w-4 h-4 text-sky-400" />
                        <span>Créer un compte</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Menu - White/Pink */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-pink-100 py-4 bg-white -mx-4 px-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
              
              </div>
            </form>

            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-3 px-4 rounded-xl text-center text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-pink-50 to-sky-50 text-pink-500'
                      : 'text-gray-600 hover:bg-pink-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
