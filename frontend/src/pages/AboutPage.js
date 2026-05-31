import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Check, 
  Star, 
  Shield, 
  Zap, 
  Heart,
  Users,
  TrendingUp,
  Award,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  Target,
  Gift
} from 'lucide-react';

const AboutPage = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  // Vidéos promo lifestyle
  const promoVideos = [
    { id: 1, title: "Hakim et son chauffeur", description: "Découvrez comment PinkGirl simplifie votre quotidien" },
    { id: 2, title: "Une sortie en famille", description: "Planifiez des moments inoubliables" },
    { id: 3, title: "Grand-mère et son quotidien", description: "La technologie au service de tous" },
    { id: 4, title: "Femme d'affaire, toujours", description: "Efficacité et élégance au quotidien" },
    { id: 5, title: "Business is business", description: "Comment gagner avec PinkGirl" },
    { id: 6, title: "Soirée entre copines!", description: "Organisez vos sorties en un clic" },
    { id: 7, title: "J'invite ma femme ce soir!", description: "Surprenez vos proches" },
    { id: 8, title: "Surprise pour mâle?", description: "Des idées cadeaux originales" },
  ];

  // Avantages PinkGirl
  const advantages = [
    {
      icon: Zap,
      title: "Places limitées",
      description: "Notre priorité est la qualité nous avons une place restreinte pour les escort!"
    },
    {
      icon: Users,
      title: "Grande visibilité",
      description: "Notre systeme permettent aux pinkgirl d'avoir une grande visibilité!"
    },
    {
      icon: Gift,
      title: "Contenu videos exclusif",
      description: "Des vidéos hot et autres contenues!"
    },
 
  ];

  return (
    <div className="min-h-screen bg-pink-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-400/10 via-transparent to-transparent" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Dancing Script, cursive' }}>
              À Propos de <span className="text-red-400">PinkGirl</span>
            </h1>
            <p className="text-2xl md:text-3xl text-red-400 font-medium mb-8">
              CE QUE VOUS VOULEZ, OÙ VOUS LE VOULEZ,<br />
              QUAND VOUS LE VOULEZ ET COMME VOUS LE VOULEZ !
            </p>
            <p className="text-xl text-red-400 max-w-3xl mx-auto">
              PinkGirl accompagne ses clients tout au long de leur journée de consommation.
              Devenez notre recommandation préférée.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-gradient-to-br from-red-400/10 to-pink-500/10 rounded-2xl p-8 border border-red-400/20">
              <Target className="w-12 h-12 text-red-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h2>
              <p className="text-black-400 text-lg leading-relaxed">
                Proposer les meilleurs potentiel annonce escort.
                Connecter les meilleurs de leur dommaine de la région et permettre chaque jour à de nouveaux clients de les découvrir.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 rounded-2xl p-8 border border-pink-400/20">
              <Sparkles className="w-12 h-12 text-pink-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre Mission</h2>
              <p className="text-black-400 text-lg leading-relaxed">
                Valoriser le savoir-faire et les produits de nos prestataires régionaux.
                Notre objectif ? Connecter nos clients aux meilleurs prestataires sur PinkGirl, faites-en parti !
              </p>
            </div>
          </div>

          {/* Slogan central */}
          <div className="text-center mb-20 py-12 bg-gradient-to-r from-transparent via-red-400/10 to-transparent rounded-3xl">
            <blockquote className="text-3xl md:text-4xl font-bold text-black italic mb-4">
              "Les meilleurs escorts préférés de votre région se trouvent sur PinkGirl."
            </blockquote>
            <p className="text-xl text-red-400">
              « Les places sont limités ! »
            </p>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-red text-center mb-4">
            Les avantages <span className="text-red-400">PinkGirl</span>
          </h2>
          <p className="text-black-400 text-center mb-12 text-lg">
            Découvrez tout ce que PinkGirl peut faire pour vous
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all group"
              >
                <adv.icon className="w-10 h-10 text-yellow-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{adv.title}</h3>
                <p className="text-gray-400">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos Promo Section */}
   
      {/* Notre but Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-yellow-500/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Notre engagement
          </h2>
          
          <div className="space-y-6 text-lg text-gray-400">
            <p className="flex items-center justify-center gap-3">
              <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span><strong className="text-gray-900">Qualité</strong>, Vos intérêts.</span>
            </p>
            <p className="flex items-center justify-center gap-3">
              <Check className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span><strong className="text-gray-900">Premium</strong>, vos bénéfices.</span>
            </p>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl border border-yellow-500/20">
            <p className="text-xl text-gray-600 leading-relaxed">
              PinkGirl voit et croit en le <strong className="text-yellow-400">véritable potentiel</strong> de votre entreprise ainsi qu'en votre plus-value. 
              Nous avons réunis pour vous les meilleurs experts de divers domaines afin de vous permettre d'optimiser de la plus importante des manières votre entreprise.
            </p>
            <p className="text-2xl font-bold text-white mt-6">
              Découvrez le plein potentiel de votre commerce et dévoilez-en sa meilleure version.
            </p>
          </div>

          <div className="mt-12">
            <p className="text-xl text-gray-400 mb-6">
              Connaissez-vous tous les clients potentiels de votre secteur d'activité ?
            </p>
            <p className="text-2xl font-bold text-yellow-400">
              Connectez-vous et permettez chaque jour à de nouveaux clients de vous découvrir sur PinkGirl.
            </p>
          </div>
        </div>
      </section>

    

      {/* Footer links */}
      <section className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <Link to="/cgv" className="hover:text-yellow-400 transition-colors">Conditions Générales de Vente</Link>
          <span>•</span>
          <Link to="/mentions-legales" className="hover:text-yellow-400 transition-colors">Mentions Légales</Link>
          <span>•</span>
          <Link to="/partenaires" className="hover:text-yellow-400 transition-colors">Nos Partenaires</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
