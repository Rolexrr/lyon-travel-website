import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_fe23b646-054b-42ab-8a61-85e79ccaa65a/artifacts/s8rldcvo_logo.png" 
                alt="Lyon Travel" 
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-xl font-bold text-yellow-400">LYON TRAVEL</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Avec Lyon Travel, le monde est à vous. Votre partenaire de confiance pour tous vos besoins de voyage.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Nos Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Billets d'avion
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Location de voiture
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Organisation de voyages
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Tourisme
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">22 bis rue Bomitaba<br />Madoukou Mfoa</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-yellow-400 flex-shrink-0" />
                <a href="tel:+242061831412" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  +242 061 831 412
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-yellow-400 flex-shrink-0" />
                <a href="mailto:lyontravel948@gmail.com" className="text-gray-300 hover:text-yellow-400 transition-colors break-all">
                  lyontravel948@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Réservation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} Lyon Travel. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/admin-login" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Admin
              </Link>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;