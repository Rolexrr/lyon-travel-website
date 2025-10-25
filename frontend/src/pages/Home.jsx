import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane, Car, MapPin, Compass, ArrowRight, CheckCircle, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { services } from '../data/mock';
import { toast } from 'sonner';

const iconMap = {
  Plane,
  Car,
  MapPin,
  Compass
};

const Home = () => {
  const [email, setEmail] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Merci pour votre inscription !');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1535262412227-85541e910204?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHx0cm9waWNhbCUyMGJlYWNofGVufDB8fHx8MTc2MTQyOTE5OXww&ixlib=rb-4.1.0&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Explorez le monde avec confiance
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Avec <span className="text-yellow-400 font-semibold">Lyon Travel</span>, le monde est à vous
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto">
            Votre partenaire de voyage sur mesure pour tous vos déplacements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservation">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-yellow-500/50 transition-all transform hover:scale-105"
              >
                Réservez maintenant
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/services">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold text-lg px-8 py-6 backdrop-blur-sm transition-all transform hover:scale-105"
              >
                Découvrir nos services
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos <span className="text-blue-700">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des solutions complètes pour tous vos besoins de voyage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Card 
                  key={service.id} 
                  className="group hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Icon size={32} />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <CheckCircle size={16} className="text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link to="/services">
                      <Button 
                        variant="link" 
                        className="text-blue-700 hover:text-blue-800 p-0 font-semibold group/btn"
                      >
                        En savoir plus
                        <ArrowRight className="ml-1 group-hover/btn:translate-x-1 transition-transform" size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button 
                size="lg"
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8"
              >
                Voir tous les services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Mail size={48} className="mx-auto mb-6 text-yellow-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Restez informé de nos offres
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Inscrivez-vous à notre newsletter et recevez nos promotions exclusives
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-gray-900 border-0 h-12"
                required
              />
              <Button 
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all h-12"
              >
                S'inscrire
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-3xl p-12 text-center shadow-xl border border-blue-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Prêt à partir à l'aventure ?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui et laissez-nous organiser le voyage de vos rêves
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/reservation">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold px-8"
                >
                  Faire une demande
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold px-8"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;