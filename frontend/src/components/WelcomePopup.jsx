import React, { useState, useEffect } from 'react';
import { X, Gift, Sparkles, Heart } from 'lucide-react';
import { toast } from 'sonner';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('pinkgirl_visited');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('pinkgirl_visited', 'true');
  };

  const handleExplore = () => {
    handleClose();
    window.location.href = '/auth';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative w-full max-w-[380px] sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-pink-50 hover:bg-pink-100 rounded-full flex items-center justify-center text-pink-400 hover:text-pink-600 transition-all"
          data-testid="welcome-popup-close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header gradient */}
        <div className="bg-gradient-to-br from-pink-400 via-pink-500 to-sky-400 p-8 text-center relative overflow-hidden">
          {/* Sparkle particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                background: '#FFD700',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `sparkle-twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
          <Sparkles className="w-10 h-10 text-white/80 mx-auto mb-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
            Bienvenue sur PinkGirl
          </h1>
          <p className="text-gray-600 text-sm">
            La plateforme d'annonces glamour
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {[
            { text: "Site web inclus créé par nos développeurs expérimentés" },
            { text: "Possibilité de vendre du contenu exclusif" },
            { text: "Gagne un bonus annuel sur le nombre de gains validés" },
            { text: "Grande visibilité sur le web" },
          ].map((item, i) => (
            <div key={i} className="bg-gradient-to-r from-pink-50 to-sky-50 rounded-2xl p-4 border border-pink-100 flex items-start gap-3">
              <div className="p-1.5 bg-pink-100 rounded-lg flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-pink-500" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all text-sm font-medium"
              data-testid="welcome-popup-later"
            >
              Plus tard
            </button>
            <button
              onClick={handleExplore}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-full transition-all text-sm font-medium shadow-md btn-shine"
              data-testid="welcome-popup-signup"
            >
              Decouvrir
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sparkle-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default WelcomePopup;
