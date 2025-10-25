import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Calendar, Send } from 'lucide-react';
import { toast } from 'sonner';
import { services } from '../data/mock';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    destination: '',
    date: '',
    message: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    console.log('Form submitted:', formData);
    toast.success('Votre demande a été envoyée avec succès ! Nous vous contactons rapidement.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      destination: '',
      date: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Calendar size={64} className="mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Demande de Réservation</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous et nous vous contacterons rapidement
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-2xl border-2 border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-yellow-50 border-b">
                <CardTitle className="text-2xl text-gray-900">Informations de réservation</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-900 font-semibold">Nom complet *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-900 font-semibold">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-900 font-semibold">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+242 XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-gray-900 font-semibold">Service souhaité *</Label>
                    <Select value={formData.service} onValueChange={(value) => handleChange('service', value)} required>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Choisissez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.title}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Trip Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="destination" className="text-gray-900 font-semibold">Destination / Détails</Label>
                      <Input
                        id="destination"
                        type="text"
                        placeholder="Ex: Paris, Pointe-Noire..."
                        value={formData.destination}
                        onChange={(e) => handleChange('destination', e.target.value)}
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-gray-900 font-semibold">Date souhaitée</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-900 font-semibold">Message / Détails de votre demande</Label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez vos besoins, préférences, nombre de personnes, etc."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  {/* Info Note */}
                  <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded">
                    <p className="text-sm text-gray-700">
                      <strong className="text-blue-700">Note :</strong> Cette demande sera traitée par notre équipe. 
                      Nous vous contacterons par email ou WhatsApp pour finaliser les détails. 
                      Le paiement s'effectuera à la caisse de l'agence.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold text-lg h-14 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Send className="mr-2" size={20} />
                    Envoyer ma demande
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-2">Vous préférez nous appeler directement ?</p>
              <a 
                href="tel:+242061831412" 
                className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors"
              >
                +242 061 831 412
              </a>
              <p className="text-gray-600 mt-2">ou par WhatsApp</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservation;