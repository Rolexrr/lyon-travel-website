import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Lock, Mail, LogIn } from 'lucide-react';
import { toast } from 'sonner';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { login } = await import('../services/api');
      const response = await login(formData);
      
      toast.success('Connexion réussie !');
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_fe23b646-054b-42ab-8a61-85e79ccaa65a/artifacts/s8rldcvo_logo.png" 
              alt="Lyon Travel" 
              className="h-16 w-16 object-contain"
            />
            <h1 className="text-4xl font-bold text-white">LYON TRAVEL</h1>
          </div>
          <p className="text-blue-200 text-lg">Panneau d'administration</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-2 border-blue-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-yellow-50 border-b">
            <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
              <Lock size={28} className="text-blue-700" />
              Connexion Admin
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-semibold flex items-center gap-2">
                  <Mail size={18} />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@lyontravel.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-900 font-semibold flex items-center gap-2">
                  <Lock size={18} />
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold text-lg h-12 shadow-lg hover:shadow-xl transition-all"
              >
                <LogIn className="mr-2" size={20} />
                Se connecter
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-700 font-semibold mb-2">Identifiants de démo :</p>
              <p className="text-xs text-gray-600">Email: lyontravel948@gmail.com</p>
              <p className="text-xs text-gray-600">Mot de passe: admin123</p>
            </div>
          </CardContent>
        </Card>

        {/* Back to site */}
        <div className="mt-6 text-center">
          <a href="/" className="text-blue-200 hover:text-white transition-colors">
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;