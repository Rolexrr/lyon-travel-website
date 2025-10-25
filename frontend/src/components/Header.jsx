import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/services', label: 'Services' },
    { path: '/reservation', label: 'Réservation' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:+242061831412" className="flex items-center gap-1 hover:text-yellow-400 transition-colors">
              <Phone size={14} />
              <span>+242 061 831 412</span>
            </a>
            <a href="mailto:lyontravel948@gmail.com" className="hidden md:flex items-center gap-1 hover:text-yellow-400 transition-colors">
              <Mail size={14} />
              <span>lyontravel948@gmail.com</span>
            </a>
          </div>
          <div className="text-xs">
            <span>22 bis rue Bomitaba, Madoukou Mfoa</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="https://customer-assets.emergentagent.com/job_fe23b646-054b-42ab-8a61-85e79ccaa65a/artifacts/s8rldcvo_logo.png" 
              alt="Lyon Travel Logo" 
              className="h-12 w-12 object-contain transition-transform group-hover:scale-110"
            />
            <div>
              <h1 className="text-2xl font-bold text-blue-700">LYON TRAVEL</h1>
              <p className="text-xs text-gray-600">Votre partenaire voyage</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-gray-700 font-medium hover:text-blue-700 transition-colors relative group ${
                  isActive(link.path) ? 'text-blue-700' : ''
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-700 transition-all ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
            <Link to="/reservation">
              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                Réserver maintenant
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-700 transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors ${
                  isActive(link.path) ? 'bg-blue-50 text-blue-700 font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/reservation" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold">
                Réserver maintenant
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;