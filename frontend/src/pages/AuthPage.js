import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Building2, User, ArrowLeft, Lock, Mail, Phone, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get('type') || 'client';
  
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState(defaultType === 'influencer' ? 'client' : defaultType);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    business_name: '',
  });

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Les mots de passe ne correspondent pas');
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
    }

    setLoading(true);
    try {
      let loggedUser;
      if (isLogin) {
        loggedUser = await login(formData.email, formData.password);
        toast.success('Connexion réussie !');
      } else {
        const registrationData = { 
          ...formData, 
          user_type: userType,
          business_name: userType === 'entreprise' ? formData.business_name : undefined,
        };
        loggedUser = await register(registrationData);
        toast.success('Inscription réussie ! Bienvenue sur PinkGirl');
      }
      
      const redirectType = loggedUser?.user_type || userType;
      if (redirectType === 'admin') {
        navigate('/admin');
      } else if (redirectType === 'entreprise' || redirectType === 'enterprise') {
        navigate('/dashboard/entreprise');
      } else {
        navigate('/dashboard/client');
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-sky-50 flex items-center justify-center px-4 py-12" data-testid="auth-page">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-sky-300 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text-pink" style={{ fontFamily: 'Dancing Script, cursive' }}>
            PinkGirl
          </span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/50 border border-pink-100 p-8">
          
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Bon retour !' : 'Rejoins la communauté PinkGirl'}
            </p>
          </div>

          {/* User Type Toggle (only for registration) */}
          {!isLogin && (
            <div className="flex gap-2 mb-6 p-1 bg-pink-50 rounded-full">
              <button
                type="button"
                onClick={() => setUserType('client')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all ${
                  userType === 'client' ? 'bg-white text-pink-500 shadow-sm' : 'text-gray-500'
                }`}
              >
                <User className="w-4 h-4" />
                Client
              </button>
              <button
                type="button"
                onClick={() => setUserType('entreprise')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-medium transition-all ${
                  userType === 'entreprise' ? 'bg-white text-sky-500 shadow-sm' : 'text-gray-500'
                }`}
              >
                <Building2 className="w-4 h-4" />
                PinkGirl Pro
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Prénom</label>
                    <input
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                      className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                      placeholder="Marie"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Nom</label>
                    <input
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                      className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                      placeholder="Dupont"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                      placeholder="+41 79 123 45 67"
                    />
                  </div>
                </div>
                {userType === 'entreprise' && (
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Nom d'utilisateur</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-300" />
                      <input
                        type="text"
                        required
                        value={formData.business_name}
                        onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 bg-sky-50/50 border border-sky-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                        placeholder="Mon entreprise"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                  placeholder="email@exemple.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Confirmer le mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-300" />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {/* Enterprise note */}
            {!isLogin && userType === 'entreprise' && (
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-xs text-sky-700">
                <p>Un abonnement annuel de <strong>250 CHF</strong> est requis pour activer votre compte entreprise. Vous pourrez payer après l'inscription depuis votre dashboard.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-semibold rounded-xl hover:from-pink-500 hover:to-pink-600 transition-all shadow-md disabled:opacity-50 btn-shine"
            >
              {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-pink-500 font-medium ml-1 hover:underline"
              >
                {isLogin ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-gray-400 text-sm hover:text-pink-400 transition-colors flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
