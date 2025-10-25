import React, { useState } from 'react';
import { Plane, Car, MapPin, Compass, CheckCircle, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { services, cars, promotions } from '../data/mock';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const iconMap = {
  Plane,
  Car,
  MapPin,
  Compass
};

const Services = () => {
  const activePromotions = promotions.filter(p => p.active);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Des solutions complètes et personnalisées pour tous vos besoins de voyage
          </p>
        </div>
      </section>

      {/* Promotions Section */}
      {activePromotions.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-yellow-50 to-yellow-100 border-y-4 border-yellow-400">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Tag size={28} className="text-yellow-600" />
              <h2 className="text-3xl font-bold text-gray-900">Promotions en cours</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {activePromotions.map((promo) => {
                const service = services.find(s => s.id === promo.serviceId);
                return (
                  <Card key={promo.id} className="border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold text-sm px-3 py-1">
                          {promo.discount} de réduction
                        </Badge>
                        <span className="text-xs text-gray-600">Valide jusqu'au {new Date(promo.validUntil).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                      <p className="text-gray-700 mb-3">{promo.description}</p>
                      <p className="text-sm text-gray-600">Service: <span className="font-semibold text-blue-700">{service?.title}</span></p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Services Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={service.id} 
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 items-center`}
                >
                  {/* Image */}
                  <div className="lg:w-1/2">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-700 text-white p-3 rounded-xl">
                        <Icon size={32} />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                    </div>
                    <p className="text-lg text-gray-700 mb-6">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Special section for cars */}
                    {service.id === 2 && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Notre flotte de véhicules</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {cars.map((car) => (
                            <Card key={car.id} className="hover:shadow-lg transition-shadow">
                              <div className="relative h-40 overflow-hidden rounded-t-lg">
                                <img 
                                  src={car.image} 
                                  alt={car.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <CardContent className="p-4">
                                <h4 className="font-bold text-gray-900 mb-1">{car.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{car.category}</p>
                                <p className="text-xs text-blue-700 font-semibold">{car.priceNote}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link to="/reservation">
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold mt-4"
                      >
                        Demander un devis
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Besoin d'un service personnalisé ?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Contactez-nous pour discuter de vos besoins spécifiques
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservation">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold px-8"
              >
                Faire une demande
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-8"
              >
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;