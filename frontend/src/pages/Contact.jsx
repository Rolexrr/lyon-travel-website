import React from 'react';
import { MapPin, Phone, Mail, Clock, Users } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      {/* Contact Info & About */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Cards */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos coordonnées</h2>
              
              <Card className="hover:shadow-lg transition-shadow border-2 border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-700 text-white p-3 rounded-xl">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Adresse</h3>
                      <p className="text-gray-700">22 bis rue Bomitaba</p>
                      <p className="text-gray-700">Madoukou Mfoa</p>
                      <p className="text-gray-700">Brazzaville, Congo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-2 border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-700 text-white p-3 rounded-xl">
                      <Phone size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Téléphone</h3>
                      <a href="tel:+242061831412" className="text-blue-700 hover:text-blue-800 font-semibold text-lg">
                        +242 061 831 412
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Disponible aussi sur WhatsApp</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-2 border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-700 text-white p-3 rounded-xl">
                      <Mail size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                      <a href="mailto:lyontravel948@gmail.com" className="text-blue-700 hover:text-blue-800 font-semibold text-lg break-all">
                        lyontravel948@gmail.com
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Réponse sous 24h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-2 border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-700 text-white p-3 rounded-xl">
                      <Clock size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Horaires d'ouverture</h3>
                      <p className="text-gray-700">Lundi - Vendredi: 8h00 - 18h00</p>
                      <p className="text-gray-700">Samedi: 9h00 - 15h00</p>
                      <p className="text-gray-700">Dimanche: Fermé</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* About Section */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">À propos de Lyon Travel</h2>
              
              <div className="prose prose-lg">
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Users size={32} className="text-blue-700" />
                    <h3 className="text-2xl font-bold text-gray-900 m-0">Notre Histoire</h3>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong className="text-blue-700">Lyon Travel</strong> est une agence de voyage basée à Brazzaville, 
                    spécialisée dans l'organisation de voyages personnalisés et la fourniture de services de transport.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Nous mettons notre expertise et notre passion du voyage au service de nos clients pour créer 
                    des expériences inoubliables, que ce soit pour vos vacances, vos voyages d'affaires ou vos 
                    événements spéciaux.
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Nos Valeurs</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-700 font-bold">•</span>
                        <span><strong>Confiance:</strong> Votre satisfaction est notre priorité</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-700 font-bold">•</span>
                        <span><strong>Expertise:</strong> Une équipe expérimentée à votre écoute</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-700 font-bold">•</span>
                        <span><strong>Qualité:</strong> Des services premium à des prix compétitifs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-700 font-bold">•</span>
                        <span><strong>Disponibilité:</strong> Un accompagnement personnalisé</span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Que vous souhaitiez réserver des billets d'avion, louer une voiture de qualité, 
                    organiser un voyage sur mesure ou découvrir de nouvelles destinations avec nos guides, 
                    <strong className="text-blue-700"> Lyon Travel</strong> est votre partenaire de confiance.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/reservation" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold">
                        Faire une demande
                      </Button>
                    </Link>
                    <Link to="/services" className="flex-1">
                      <Button variant="outline" className="w-full border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white font-semibold">
                        Nos services
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notre localisation</h2>
          <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127485.60708145487!2d15.157289!3d-4.263360!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a30c82e8b91e9%3A0x8e4a8e8d8c8d8d8d!2sBrazzaville%2C%20Congo!5e0!3m2!1sfr!2sfr!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lyon Travel Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;