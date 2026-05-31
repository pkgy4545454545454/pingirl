import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Building2, ArrowLeft, Lock, Mail, Phone, Sparkles, Globe, Palette, Image, FileText, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Popup for website creation offer after registration
const WebsiteOfferPopup = ({ visible, onClose, onSubmit, formData, setFormData, submitting }) => {
  if (!visible) return null;

  const colorOptions = [
    { value: 'rose', label: 'Rose', color: '#FF69B4' },
    { value: 'bleu', label: 'Bleu', color: '#87CEEB' },
    { value: 'violet', label: 'Violet', color: '#9B59B6' },
    { value: 'vert', label: 'Vert', color: '#2ECC71' },
    { value: 'orange', label: 'Orange', color: '#F39C12' },
    { value: 'noir', label: 'Noir', color: '#2C3E50' },
    { value: 'blanc', label: 'Blanc/Minimaliste', color: '#ECF0F1' },
    { value: 'rouge', label: 'Rouge', color: '#E74C3C' },
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto" data-testid="website-offer-popup">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-pink-400 hover:text-pink-600">
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-sky-400 p-6 text-center relative overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full" style={{
              width: `${3 + Math.random() * 5}px`, height: `${3 + Math.random() * 5}px`,
              background: '#FFD700', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              animation: `sparkle-twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
            }} />
          ))}
          <Globe className="w-10 h-10 text-white/80 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-white">
            Nous vous offrons un site web pour vous demarquez et toucher plus de clients !
          </h2>
          <p className="text-white/90 text-sm mt-1">Créé par nos développeurs expérimentés</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          <p className="text-gray-600 text-sm text-center">
            Remplissez ces informations pour que notre équipe crée votre site web professionnel.
          </p>

          {/* Color preference */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <Palette className="w-4 h-4 text-pink-400" />
              Couleur préférée
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData({...formData, preferred_color: opt.value})}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${
                    formData.preferred_color === opt.value ? 'border-pink-400 bg-pink-50' : 'border-gray-100 hover:border-pink-200'
                  }`}
                  data-testid={`color-${opt.value}`}
                >
                  <div className="w-8 h-8 rounded-full border border-gray-200" style={{ background: opt.color }} />
                  <span className="text-[10px] text-gray-600">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Images / Logo */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <Image className="w-4 h-4 text-sky-400" />
              Images / Logo (description ou lien)
            </label>
            <textarea
              value={formData.images_description}
              onChange={(e) => setFormData({...formData, images_description: e.target.value})}
              className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 h-20 resize-none"
              placeholder="Décrivez votre logo, les images souhaitées, ou envoyez des liens..."
              data-testid="website-images"
            />
          </div>

          {/* Description du site souhaité */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
              <FileText className="w-4 h-4 text-pink-400" />
              Description du site souhaité
            </label>
            <textarea
              value={formData.site_description}
              onChange={(e) => setFormData({...formData, site_description: e.target.value})}
              className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 h-28 resize-none"
              placeholder="Décrivez le genre de site que vous souhaitez : vitrine, e-commerce, portfolio, blog... Quelles pages ? Quel style ?"
              data-testid="website-description"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Plus tard
            </button>
            <button
              onClick={onSubmit}
              disabled={submitting}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full text-sm font-medium hover:from-pink-500 hover:to-pink-600 transition-all shadow-md disabled:opacity-50 btn-shine"
              data-testid="website-submit"
            >
              {submitting ? 'Envoi...' : 'Envoyer ma demande'}
            </button>
          </div>
        </div>

        <style>{`
          @keyframes sparkle-twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
        `}</style>
      </div>
    </div>
  );
};

const EnterpriseRegistrationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showWebsitePopup, setShowWebsitePopup] = useState(false);
  const [websiteSubmitting, setWebsiteSubmitting] = useState(false);
  const [registeredUserId, setRegisteredUserId] = useState('');
  const [registeredEnterpriseId, setRegisteredEnterpriseId] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
    business_name: '',
    category: '',
    address: '',
    city: '',
    postal_code: '',
    description: '',
    website: '',
  });

  const [websiteFormData, setWebsiteFormData] = useState({
    preferred_color: '',
    images_description: '',
    site_description: '',
  });

  const categories = [
    'Restauration', 'Coiffeurs', 'Soins esthétiques', 'Personnel de maison',
    'Professionnels de santé', 'Cours de sport', 'Activités', 'Agent immobilier',
    'Sécurité', 'Professionnels de transports', 'Professionnels d\'éducation',
    'Professionnels administratifs', 'Professionnels juridiques',
    'Professionnels informatiques', 'Professionnels de construction', 'Autre'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/register-new-enterprise`, {
        business_name: formData.business_name,
        category: formData.category,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postal_code,
        description: formData.description,
        website: formData.website,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        payment_method: 'pending',
      });

      setRegisteredUserId(res.data.user_id || '');
      setRegisteredEnterpriseId(res.data.enterprise_id || '');
      toast.success('Inscription réussie !');
      
      // Show website offer popup
      setShowWebsitePopup(true);
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const handleWebsiteSubmit = async () => {
    if (!websiteFormData.preferred_color && !websiteFormData.site_description) {
      toast.error('Veuillez remplir au moins une information');
      return;
    }

    setWebsiteSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/website-requests`, {
        user_id: registeredUserId,
        enterprise_id: registeredEnterpriseId,
        preferred_color: websiteFormData.preferred_color,
        images_description: websiteFormData.images_description,
        site_description: websiteFormData.site_description,
        business_name: formData.business_name,
        email: formData.email,
        phone: formData.phone,
      });
      toast.success('Demande de site web envoyée ! Notre équipe vous contactera.');
      setShowWebsitePopup(false);
      navigate('/auth');
    } catch (error) {
      toast.error('Erreur lors de l\'envoi. Vous pourrez refaire la demande depuis votre dashboard.');
      setShowWebsitePopup(false);
      navigate('/auth');
    } finally {
      setWebsiteSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-sky-50 pt-20 pb-12 px-4" data-testid="enterprise-registration">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-sky-300 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text-pink" style={{ fontFamily: 'Dancing Script, cursive' }}>PinkGirl</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Inscription PinkGirl</h1>
          <p className="text-gray-500 text-sm">Créez votre compte professionnel</p>
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 mt-4 text-xs text-sky-700">
            Un abonnement annuel de <strong>250 CHF</strong> est requis pour activer votre profil. Payable depuis votre dashboard après inscription.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-pink-100/50 border border-pink-100 p-6 space-y-4">
          
          {/* Personal info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Prénom *</label>
              <input type="text" required value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Nom *</label>
              <input type="text" required value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Nom de Pinkgirl *</label>
            <input type="text" required value={formData.business_name} onChange={(e) => setFormData({...formData, business_name: e.target.value})}
              className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100" placeholder="Mon nom pinkgirl" />
          </div>

      
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Ville *</label>
              <input type="text" required value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100" placeholder="Lausanne" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Code postal *</label>
              <input type="text" required value={formData.postal_code} onChange={(e) => setFormData({...formData, postal_code: e.target.value})}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100" placeholder="1000" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Adresse</label>
            <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100" placeholder="Rue et numéro" />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Téléphone *</label>
            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100" placeholder="+41 79 123 45 67" />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email *</label>
            <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100" placeholder="email@entreprise.com" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Mot de passe *</label>
              <input type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Confirmer *</label>
              <input type="password" required value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 bg-pink-50/50 border border-pink-100 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-pink-500 text-white font-semibold rounded-xl hover:from-pink-500 hover:to-pink-600 transition-all shadow-md disabled:opacity-50 btn-shine mt-2">
            {loading ? 'Inscription en cours...' : "S'inscrire"}
          </button>

          <p className="text-center text-gray-500 text-sm">
            Déjà un compte ? <Link to="/auth" className="text-pink-500 font-medium hover:underline">Se connecter</Link>
          </p>
        </form>

        <div className="text-center mt-4">
          <Link to="/" className="text-gray-400 text-sm hover:text-pink-400 flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
        </div>
      </div>

      {/* Website Offer Popup */}
      <WebsiteOfferPopup
        visible={showWebsitePopup}
        onClose={() => { setShowWebsitePopup(false); navigate('/auth'); }}
        onSubmit={handleWebsiteSubmit}
        formData={websiteFormData}
        setFormData={setWebsiteFormData}
        submitting={websiteSubmitting}
      />
    </div>
  );
};

export default EnterpriseRegistrationPage;
