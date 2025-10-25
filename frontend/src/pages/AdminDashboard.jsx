import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { 
  LogOut, 
  Users, 
  Calendar, 
  Tag, 
  Plus, 
  Pencil, 
  Trash2,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { reservations as mockReservations, promotions as mockPromotions, services } from '../data/mock';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reservations');
  const [reservations, setReservations] = useState(mockReservations);
  const [promotions, setPromotions] = useState(mockPromotions);
  const [isPromoDialogOpen, setIsPromoDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [promoFormData, setPromoFormData] = useState({
    title: '',
    description: '',
    discount: '',
    serviceId: '',
    validUntil: '',
    active: true
  });

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Déconnexion réussie');
    navigate('/admin-login');
  };

  const handleDeleteReservation = (id) => {
    setReservations(reservations.filter(r => r.id !== id));
    toast.success('Demande supprimée');
  };

  const handleAddPromotion = () => {
    setEditingPromo(null);
    setPromoFormData({
      title: '',
      description: '',
      discount: '',
      serviceId: '',
      validUntil: '',
      active: true
    });
    setIsPromoDialogOpen(true);
  };

  const handleEditPromotion = (promo) => {
    setEditingPromo(promo);
    setPromoFormData({
      title: promo.title,
      description: promo.description,
      discount: promo.discount,
      serviceId: promo.serviceId.toString(),
      validUntil: promo.validUntil,
      active: promo.active
    });
    setIsPromoDialogOpen(true);
  };

  const handleSavePromotion = () => {
    if (!promoFormData.title || !promoFormData.serviceId || !promoFormData.validUntil) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (editingPromo) {
      setPromotions(promotions.map(p => 
        p.id === editingPromo.id 
          ? { ...editingPromo, ...promoFormData, serviceId: parseInt(promoFormData.serviceId) }
          : p
      ));
      toast.success('Promotion modifiée');
    } else {
      const newPromo = {
        id: Date.now(),
        ...promoFormData,
        serviceId: parseInt(promoFormData.serviceId)
      };
      setPromotions([...promotions, newPromo]);
      toast.success('Promotion ajoutée');
    }
    setIsPromoDialogOpen(false);
  };

  const handleDeletePromotion = (id) => {
    setPromotions(promotions.filter(p => p.id !== id));
    toast.success('Promotion supprimée');
  };

  const handleTogglePromoStatus = (id) => {
    setPromotions(promotions.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
    toast.success('Statut de la promotion mis à jour');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://customer-assets.emergentagent.com/job_fe23b646-054b-42ab-8a61-85e79ccaa65a/artifacts/s8rldcvo_logo.png" 
                alt="Lyon Travel" 
                className="h-12 w-12 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold">Tableau de bord Admin</h1>
                <p className="text-blue-100 text-sm">Lyon Travel</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold"
            >
              <LogOut className="mr-2" size={18} />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-blue-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Demandes en attente</p>
                  <p className="text-3xl font-bold text-blue-700">{reservations.length}</p>
                </div>
                <Users size={48} className="text-blue-700 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Promotions actives</p>
                  <p className="text-3xl font-bold text-yellow-600">{promotions.filter(p => p.active).length}</p>
                </div>
                <Tag size={48} className="text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Services</p>
                  <p className="text-3xl font-bold text-green-600">{services.length}</p>
                </div>
                <Calendar size={48} className="text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'reservations' 
                ? 'text-blue-700' 
                : 'text-gray-600 hover:text-blue-700'
            }`}
          >
            <Users className="inline mr-2" size={20} />
            Demandes de réservation
            {activeTab === 'reservations' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('promotions')}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === 'promotions' 
                ? 'text-blue-700' 
                : 'text-gray-600 hover:text-blue-700'
            }`}
          >
            <Tag className="inline mr-2" size={20} />
            Gestion des promotions
            {activeTab === 'promotions' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700"></span>
            )}
          </button>
        </div>

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Demandes de réservation</h2>
            </div>
            
            {reservations.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Aucune demande pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              reservations.map((reservation) => (
                <Card key={reservation.id} className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{reservation.name}</h3>
                            <Badge className="mt-2 bg-yellow-500 hover:bg-yellow-600">
                              {reservation.service}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Mail size={18} className="text-blue-700" />
                            <a href={`mailto:${reservation.email}`} className="hover:text-blue-700">
                              {reservation.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Phone size={18} className="text-blue-700" />
                            <a href={`tel:${reservation.phone}`} className="hover:text-blue-700">
                              {reservation.phone}
                            </a>
                          </div>
                          {reservation.destination && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <MapPin size={18} className="text-blue-700" />
                              <span>{reservation.destination}</span>
                            </div>
                          )}
                          {reservation.date && (
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock size={18} className="text-blue-700" />
                              <span>{new Date(reservation.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                          )}
                        </div>
                        
                        {reservation.message && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm font-semibold text-gray-900 mb-1">Message:</p>
                            <p className="text-gray-700">{reservation.message}</p>
                          </div>
                        )}
                        
                        <p className="text-xs text-gray-500 mt-4">
                          Reçu le {new Date(reservation.createdAt).toLocaleString('fr-FR')}
                        </p>
                      </div>
                      
                      <div className="flex lg:flex-col gap-2">
                        <Button 
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteReservation(reservation.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Promotions Tab */}
        {activeTab === 'promotions' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des promotions</h2>
              <Button 
                onClick={handleAddPromotion}
                className="bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold"
              >
                <Plus className="mr-2" size={20} />
                Ajouter une promotion
              </Button>
            </div>

            {promotions.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Tag size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Aucune promotion pour le moment</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promotions.map((promo) => {
                  const service = services.find(s => s.id === promo.serviceId);
                  return (
                    <Card key={promo.id} className={`border-2 ${
                      promo.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    } hover:shadow-lg transition-shadow`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <Badge className={promo.active ? 'bg-green-600' : 'bg-gray-500'}>
                            {promo.active ? 'Active' : 'Inactive'}
                          </Badge>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditPromotion(promo)}
                            >
                              <Pencil size={16} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeletePromotion(promo.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                        <p className="text-gray-700 mb-3">{promo.description}</p>
                        
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-600">
                            <strong>Service:</strong> {service?.title}
                          </p>
                          <p className="text-gray-600">
                            <strong>Réduction:</strong> {promo.discount}
                          </p>
                          <p className="text-gray-600">
                            <strong>Valide jusqu'au:</strong> {new Date(promo.validUntil).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        
                        <Button 
                          variant="outline"
                          size="sm"
                          className="w-full mt-4"
                          onClick={() => handleTogglePromoStatus(promo.id)}
                        >
                          {promo.active ? 'Désactiver' : 'Activer'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Promotion Dialog */}
      <Dialog open={isPromoDialogOpen} onOpenChange={setIsPromoDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingPromo ? 'Modifier la promotion' : 'Ajouter une promotion'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="promo-title">Titre de la promotion *</Label>
              <Input
                id="promo-title"
                value={promoFormData.title}
                onChange={(e) => setPromoFormData({ ...promoFormData, title: e.target.value })}
                placeholder="Ex: Promo vols Paris"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promo-description">Description</Label>
              <Textarea
                id="promo-description"
                value={promoFormData.description}
                onChange={(e) => setPromoFormData({ ...promoFormData, description: e.target.value })}
                placeholder="Détails de la promotion"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="promo-discount">Réduction</Label>
                <Input
                  id="promo-discount"
                  value={promoFormData.discount}
                  onChange={(e) => setPromoFormData({ ...promoFormData, discount: e.target.value })}
                  placeholder="Ex: 20%, 1 jour gratuit"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="promo-service">Service *</Label>
                <Select 
                  value={promoFormData.serviceId} 
                  onValueChange={(value) => setPromoFormData({ ...promoFormData, serviceId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="promo-valid">Valide jusqu'au *</Label>
              <Input
                id="promo-valid"
                type="date"
                value={promoFormData.validUntil}
                onChange={(e) => setPromoFormData({ ...promoFormData, validUntil: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="promo-active"
                checked={promoFormData.active}
                onChange={(e) => setPromoFormData({ ...promoFormData, active: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="promo-active" className="cursor-pointer">Promotion active</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleSavePromotion}
                className="flex-1 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700"
              >
                Enregistrer
              </Button>
              <Button 
                onClick={() => setIsPromoDialogOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;