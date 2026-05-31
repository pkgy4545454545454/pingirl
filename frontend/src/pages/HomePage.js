import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Star,HandCoins, ArrowRight, Briefcase, MapPin, Clock, Filter, GraduationCap, Search, CheckCircle, Send, X, FileText, Sparkles, Gift, Users } from 'lucide-react';
import { featuredAPI, categoryAPI, enterpriseAPI, servicesProductsAPI, jobsAPI, clientDocumentsAPI, trainingsAPI } from '../services/api';
import EnterpriseCard from '../components/EnterpriseCard';
import ServiceProductCard from '../components/ServiceProductCard';
import ProductCategoryCard from '../components/ProductCategoryCard';
import ScrollingReviews from '../components/ScrollingReviews';
import { toast } from 'sonner';
// Carousel Component with light theme - Responsive
const Carousel = ({ children, itemWidth = 280 }) => {
  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = itemWidth + 16;
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scrollCarousel('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 p-2 sm:p-3 rounded-full shadow-lg border border-gray-200 transition-all hover:scale-110 -ml-2 sm:-ml-4 opacity-0 group-hover:opacity-100 sm:opacity-100"
        data-testid="carousel-prev"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>
      
      <button
        onClick={() => scrollCarousel('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-700 p-2 sm:p-3 rounded-full shadow-lg border border-gray-200 transition-all hover:scale-110 -mr-2 sm:-mr-4 opacity-0 group-hover:opacity-100 sm:opacity-100"
        data-testid="carousel-next"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
      </button>

      <div 
        ref={carouselRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [allEnterprises, setAllEnterprises] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [tendances, setTendances] = useState([]);

  const [enterprises, setEnterprises] = useState([]);
  const [guests, setGuests] = useState([]);
  const [offres, setOffres] = useState([]);
  const [premium, setPremium] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);
  const [jewelryWatchProducts, setJewelryWatchProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnterprises, setSelectedEnterprises] = useState([]);
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter state
  const [enterprisesFilters, setenterprisesFilters] = useState({
    type: '',
    location: '',
    enterprise: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Application Modal state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userDocuments, setUserDocuments] = useState([]);
  const [applyForm, setApplyForm] = useState({
    resume_url: '',
    cover_letter: ''
  });
  const [applying, setApplying] = useState(false);
  
  // Training purchase state
  const [purchasingTraining, setPurchasingTraining] = useState(null);
  
  // State pour afficher toutes les catégories ou non
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // State pour afficher tous les produits ou non
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Filter enterprises with real photos only (no unsplash/default images)
  const hasRealPhoto = (enterprise) => {
    const coverImage = enterprise.cover_image || enterprise.image || '';
    if (!coverImage) return false;
    if (coverImage.includes('unsplash.com')) return false;
    if (coverImage.includes('placeholder')) return false;
    if (coverImage.includes('default')) return false;
    return true;
  };

  // Sort enterprises by profile completeness
  const sortByProfileCompleteness = (enterprises) => {
    return [...enterprises].sort((a, b) => {
      const getScore = (e) => {
        let score = 0;
        if (hasRealPhoto(e)) score += 5; // Priority to real photos
        if (e.logo) score += 2;
        if (e.description && e.description.length > 50) score += 2;
        if (e.slogan) score += 1;
        if (e.rating > 0) score += 2;
        if (e.review_count > 0) score += 1;
        if (e.is_certified) score += 2;
        if (e.is_labeled) score += 2;
        if (e.is_premium) score += 2;
        return score;
      };
      return getScore(b) - getScore(a);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enterprisesRes, mainCatsRes, tendRes, guestRes, offreRes, premRes, prodCatRes, servCatRes, jobsRes, trainingsRes, jewelryProductsRes] = await Promise.all([
          enterpriseAPI.list({ limit: 1000 }), // Get more enterprises to cover all priority categories
          enterpriseAPI.getMainCategories(), // Get 15 main categories
          featuredAPI.tendances(),
          featuredAPI.guests(),
          featuredAPI.offres(),
          featuredAPI.premium(),
          categoryAPI.products(),
          categoryAPI.services(),
          jobsAPI.listAll().catch(() => ({ data: [] })),
          trainingsAPI.listAll({ limit: 6 }).catch(() => ({ data: [] })),
          servicesProductsAPI.list({ type: 'product', limit: 50 }).catch(() => ({ data: [] }))
        ]);
        
        // Set main categories
        setMainCategories(mainCatsRes.data?.categories || []);
        
        // Filter and sort all enterprises - only those with real photos, then ALPHABETICALLY
        const allEnts = enterprisesRes.data.enterprises || [];
        const withRealPhotos = allEnts.filter(hasRealPhoto);
        // Sort alphabetically by business_name or name
        const sortedAlphabetically = withRealPhotos.sort((a, b) => {
          const nameA = (a.business_name || a.name || '').toLowerCase();
          const nameB = (b.business_name || b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        setAllEnterprises(sortedAlphabetically);
        
        // Filter featured enterprises too - also alphabetically
        const tendData = (tendRes.data || []).filter(hasRealPhoto).sort((a, b) => 
          (a.business_name || a.name || '').localeCompare(b.business_name || b.name || '')
        );
        const guestData = (guestRes.data || []).filter(hasRealPhoto).sort((a, b) => 
          (a.business_name || a.name || '').localeCompare(b.business_name || b.name || '')
        );
        const premData = (premRes.data || []).filter(hasRealPhoto).sort((a, b) => 
          (a.business_name || a.name || '').localeCompare(b.business_name || b.name || '')
        );
        
        setTendances(tendData);
        setGuests(guestData);
        
        // Trier les offres/services par catégorie prioritaire
        const SERVICE_PRIORITY_CATEGORIES = [
          'restaurant', 'restauration', 'traiteur',
          'menage', 'nettoyage', 'maison', 'personnel',
          'beaute', 'esthetique', 'spa', 'massage', 'soin',
          'coiffure', 'coiffeur',
          'sport', 'fitness', 'coach', 'yoga',
          'loisir', 'activite', 'animation',
          'sante', 'medical', 'therapie',
          'immobilier', 'demenagement',
          'securite', 'gardiennage'
        ];
        
        const sortedOffres = (offreRes.data || []).sort((a, b) => {
          const catA = (a.category || '').toLowerCase();
          const catB = (b.category || '').toLowerCase();
          const indexA = SERVICE_PRIORITY_CATEGORIES.findIndex(p => catA.includes(p) || p.includes(catA));
          const indexB = SERVICE_PRIORITY_CATEGORIES.findIndex(p => catB.includes(p) || p.includes(catB));
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          return (a.title || a.name || '').localeCompare(b.title || b.name || '');
        });
        setOffres(sortedOffres);
        
        setPremium(premData);
        setProductCategories(prodCatRes.data);
        
        // Trier les catégories de services par ordre prioritaire
        const SERVICE_CAT_PRIORITY = [
          'restauration', 'restaurant', 'traiteur',
          'menage', 'nettoyage', 'maison',
          'beaute', 'esthetique', 'spa',
          'coiffure',
          'sport', 'fitness',
          'loisirs', 'activites',
          'sante', 'medical',
          'immobilier',
          'securite'
        ];
        
        const sortedServiceCats = (servCatRes.data || []).sort((a, b) => {
          const idA = (a.id || a.name || '').toLowerCase();
          const idB = (b.id || b.name || '').toLowerCase();
          const indexA = SERVICE_CAT_PRIORITY.findIndex(p => idA.includes(p) || p.includes(idA));
          const indexB = SERVICE_CAT_PRIORITY.findIndex(p => idB.includes(p) || p.includes(idB));
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          if (indexA !== -1) return -1;
          if (indexB !== -1) return 1;
          return (a.name || '').localeCompare(b.name || '');
        });
        setServiceCategories(sortedServiceCats);
        const jobsData = jobsRes.data || [];
        setJobs(jobsData);
        setFilteredJobs(jobsData);
        setTrainings(trainingsRes.data || []);
        
        // Filter jewelry/watch products for the special section
        const allProducts = jewelryProductsRes.data?.items || jewelryProductsRes.data || [];
        const jewelryProducts = allProducts.filter(p => {
          const cat = (p.category || '').toLowerCase();
          const name = (p.name || '').toLowerCase();
          return cat.includes('bijou') || cat.includes('montre') || cat.includes('horlog') || 
                 cat.includes('joaill') || name.includes('montre') || name.includes('bijou');
        });
        setJewelryWatchProducts(jewelryProducts);
        
        // Filter best products with nice images and price
        const productsWithImages = allProducts.filter(p => {
          const images = p.images || [];
          const hasImage = images.length > 0 && images[0] && !images[0].includes('placeholder');
          const hasPrice = p.price && p.price > 0;
          return hasImage && hasPrice;
        });
        
        // Ordre prioritaire des catégories pour les produits (selon l'ordre demandé)
        const PRODUCT_PRIORITY_CATEGORIES = [
          // 1. Restaurant / Alimentaire
          'courses_alimentaires', 'alimentaire', 'restaurant', 'cuisine',
          // 2. Maison / Ménage  
          'ameublement_deco', 'electromenager', 'bricolage_jardinage', 'maison',
          // 3. Beauté / Soins esthétiques
          'maquillage_beaute', 'soins', 'cosmetique', 'cosmétique',
          // 4. Coiffure
          'coiffure',
          // 5. Sport
          'sport',
          // 6. Loisirs / Activités
          'loisirs', 'voyages',
          // 7. Santé
          'sante', 'medical',
          // 8. Immobilier
          'immobilier',
          // 9. Sécurité
          'securite',
          // Autres
          'vetements_mode', 'enfant', 'electronique', 'automobiles'
        ];
        
        // Sort by category priority, then by name
        const sortedProducts = productsWithImages.sort((a, b) => {
          const catA = (a.category || '').toLowerCase();
          const catB = (b.category || '').toLowerCase();
          
          // Find priority index for each product's category
          const indexA = PRODUCT_PRIORITY_CATEGORIES.findIndex(p => catA.includes(p) || p.includes(catA));
          const indexB = PRODUCT_PRIORITY_CATEGORIES.findIndex(p => catB.includes(p) || p.includes(catB));
          
          // Both have priority - sort by priority index
          if (indexA !== -1 && indexB !== -1) return indexA - indexB;
          // Only A has priority
          if (indexA !== -1) return -1;
          // Only B has priority
          if (indexB !== -1) return 1;
          // Neither has priority - sort alphabetically by name
          return (a.name || '').localeCompare(b.name || '');
        });
        setBestProducts(sortedProducts.slice(0, 20));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  // Apply filters
useEffect(() => {
  let result = [...enterprises];

  // Filtre par type
  if (enterprisesFilters.type) {
    result = result.filter(
      enterprise => enterprise.type === enterprisesFilters.type
    );
  }

  // Filtre par localisation
  if (enterprisesFilters.location) {
    result = result.filter(
      enterprise =>
        (enterprise.location || "")
          .toLowerCase()
          .includes(enterprisesFilters.location.toLowerCase())
    );
  }

  // Filtre par nom d'entreprise
  if (enterprisesFilters.enterprise) {
    result = result.filter(
      enterprise =>
        (enterprise.enterprise_name || "")
          .toLowerCase()
          .includes(enterprisesFilters.enterprise.toLowerCase())
    );
  }

  setFilteredJobs(result);
}, [enterprisesFilters, enterprises]);
  // Open apply modal
  const handleSearch = async (e, enterprises) => {
    e.preventDefault();
    e.stopPropagation();
    
    const token = localStorage.getItem('titelli_token');
    if (!token) {
      toast.error('Connectez-vous pour postuler');
      return;
    }



    
    setSelectedEnterprises(enterprises);
    setApplyForm({ resume_url: '', cover_letter: '' });
    
    try {
      const res = await clientDocumentsAPI.list();
      const allDocs = res.data?.documents || res.data || [];
      const cvDocs = allDocs.filter(d => d.category === 'cv' || d.category === 'general' || d.file_type?.includes('pdf'));
      setUserDocuments(cvDocs.length > 0 ? cvDocs : allDocs);
    } catch (err) {
      console.error('Error fetching documents:', err);
      setUserDocuments([]);
    }
    
    setShowApplyModal(true);
  };
  
  // Submit application
  const handleSubmitApplication = async () => {
    if (!applyForm.resume_url) {
      toast.error('Veuillez sélectionner un CV');
      return;
    }
    
    setApplying(true);
    try {
      await jobsAPI.apply(selectedJob.id, {
        resume_url: applyForm.resume_url,
        cover_letter: applyForm.cover_letter
      });
      toast.success('Candidature envoyée avec succès !');
      setShowApplyModal(false);
    } catch (error) {
      const msg = error.response?.data?.detail || 'Erreur lors de l\'envoi';
      toast.error(msg);
    } finally {
      setApplying(false);
    }
  };

  // Handle training purchase
  const handlePurchaseTraining = async (training) => {
    const token = localStorage.getItem('titelli_token');
    if (!token) {
      toast.error('Connectez-vous pour acheter une formation');
      navigate('/auth');
      return;
    }
    
    setPurchasingTraining(training.id);
    try {
      const res = await trainingsAPI.purchase(training.id);
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      const msg = error.response?.data?.detail || 'Erreur lors de l\'achat';
      toast.error(msg);
    } finally {
      setPurchasingTraining(null);
    }
  };

  // Video state for panoramic hero
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  // Grouper les entreprises par catégorie
  const enterprisesByCategory = allEnterprises.reduce((acc, enterprise) => {
    const category = enterprise.category || 'Autres';
    if (!acc[category]) acc[category] = [];
    acc[category].push(enterprise);
    return acc;
  }, {});

  // Les 15 catégories principales avec leurs sous-catégories
  const MAIN_CATEGORIES_CONFIG = {
    'Restauration': ['Restaurant', 'Brasserie', 'Bistrot', 'Bar', 'Café', 'Boulangerie', 'Boulangerie & Pâtisserie', 'Boucherie', 'Épicerie', 'Épicerie Fine', 'Traiteur', 'Pizzeria', 'Japonais', 'Alimentation', 'Supermarché'],
    'Personnel de maison': ['Soins Domicile', 'Nettoyage', 'Aide Soignant', 'Menage', 'Garde Enfant', 'Pressing & Laverie'],
    'Soins esthétiques': ['Institut De Beaute', 'Beauté & Bien-être', 'Beauté & Santé', 'Massage', 'Spa', 'spa', 'Bronzage', 'Maquillage', 'Manucure'],
    'Coiffeurs': ['Coiffeur', 'Coiffure & Beauté', 'coiffure', 'coiffure_barber'],
    'Cours de sport': ['Fitness', 'Sport', 'Sports & Loisirs', 'Coach', 'Coach & Thérapeute', 'cours_sport', 'Yoga', 'Arts Martiaux', 'Danse'],
    'Activités': ['Activités', 'Hotel', 'Montagne', 'Loisirs', 'Cinema', 'Theatre', 'Musee'],
    'Professionnels de santé': ['Physiotherapie', 'Dentiste', 'Pharmacie', 'Pharmacie & Droguerie', 'Chirurgien', 'Osteopathe', 'Psychologue', 'Cabinet Medical', 'Cardiologue', 'Ophtalmo', 'Bio & Santé'],
    'Agent immobilier': ['Agence Immobiliere', 'Agences immobilières', 'Immobilier', 'Courtier Immobilier'],
    'Sécurité': ['Sécurité - Protection', 'Securite', 'Alarme', 'Surveillance'],
    'Professionnels de transports': ['Transport', 'Taxi', 'VTC', 'Demenagement', 'Livraison', 'Ambulance', 'Assistance Routiere'],
    'Professionnels d\'éducation': ['Enseignement', 'Enseignement - Ecoles', 'Ecole', 'Formation', 'Cours', 'Auto Ecole', 'Creche'],
    'Professionnels administratifs': ['Administration', 'Secretariat', 'Comptable', 'Fiduciaire', 'Fiduciaires', 'Gestion'],
    'Professionnels juridiques': ['Avocat', 'Avocats', 'Notaire', 'Juridique', 'Huissier'],
    'Professionnels informatiques': ['Informatique', 'Web', 'IT', 'Developpeur', 'expert_tech', 'Numerique'],
    'Professionnels de construction': ['Construction', 'BTP', 'Architecte', 'Maconnerie', 'Peinture', 'Electricien', 'Plombier']
  };

  // Toutes les sous-catégories des 15 principales (pour les exclure des "autres")
  const ALL_MAIN_SUBCATEGORIES = Object.values(MAIN_CATEGORIES_CONFIG).flat();

  // Grouper les entreprises par CATÉGORIE PRINCIPALE
  const enterprisesByMainCategory = {};
  Object.entries(MAIN_CATEGORIES_CONFIG).forEach(([mainCat, subcats]) => {
    const enterprises = allEnterprises.filter(e => subcats.includes(e.category));
    if (enterprises.length > 0) {
      enterprisesByMainCategory[mainCat] = enterprises;
    }
  });

  // Grouper les entreprises restantes par leur catégorie originale (celles qui ne sont pas dans les 15 principales)
  const otherEnterprisesByCategory = allEnterprises.reduce((acc, enterprise) => {
    const category = enterprise.category || 'Autres';
    // Exclure si la catégorie fait partie des sous-catégories des 15 principales
    if (!ALL_MAIN_SUBCATEGORIES.includes(category)) {
      if (!acc[category]) acc[category] = [];
      acc[category].push(enterprise);
    }
    return acc;
  }, {});

  // Trier les autres catégories par ordre alphabétique
  const sortedOtherCategories = Object.entries(otherEnterprisesByCategory)
    .sort(([catA], [catB]) => catA.localeCompare(catB));

  // Convertir les 15 principales en array trié selon l'ordre défini
  const sortedMainCategories = Object.entries(MAIN_CATEGORIES_CONFIG)
    .filter(([mainCat]) => enterprisesByMainCategory[mainCat]?.length > 0)
    .map(([mainCat]) => [mainCat, enterprisesByMainCategory[mainCat]]);

  // Combiner : 15 principales d'abord, puis les autres
  const allSortedCategories = [...sortedMainCategories, ...sortedOtherCategories];

  // Catégories visibles par défaut (de Restauration à Professionnels informatiques + construction)
  const VISIBLE_CATEGORIES = [
    'Restauration',
    'Personnel de maison', 
    'Soins esthétiques',
    'Coiffeurs',
    'Cours de sport',
    'Activités',
    'Professionnels de santé',
    'Agent immobilier',
    'Sécurité',
    'Professionnels de transports',
    'Professionnels d\'éducation',
    'Professionnels administratifs',
    'Professionnels juridiques',
    'Professionnels informatiques',
    'Professionnels de construction'
  ];

  // Filtrer les catégories selon showAllCategories
  const visibleCategories = showAllCategories 
    ? allSortedCategories 
    : allSortedCategories.filter(([cat]) => VISIBLE_CATEGORIES.includes(cat));





  const panoramicVideoUrl = `head.mp4`;
  const heroImage = 'https://images.unsplash.com/photo-1733950489642-bd1a7c3e69bb?w=1920&q=80';

  const heroNavCategories = [
    { id: 'services', label: 'Services', path: '/services', icon: Sparkles },
    { id: 'produits', label: 'Produits', path: '/products', icon: Gift },
    { id: 'certifies', label: 'Certifiés', path: '/certifies', icon: CheckCircle },
    { id: 'guests', label: 'Guests', path: '/guests', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#FFF5F9]" data-testid="home-page">
      {/* Hero Section - PinkGirl Glamour - No video */}
      <section className="relative h-[25vh] overflow-hidden pt-11" data-testid="hero-section">
        {/* Gradient Background with sparkles */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-sky-100 to-pink-100">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                background: i % 3 === 0 ? '#FF69B4' : i % 3 === 1 ? '#87CEEB' : '#FFD700',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `sparkle-twinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
  {/* 🎥 Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src="pinkgirl.mp4" type="video/mp4" />
  </video>

  {/* 🔥 Overlay (optionnel pour lisibilité) */}
  <div className="absolute inset-0 "></div>


       
      </section>


      {/* Search Bar Section */}


      {/* Les meilleurs prestataires Section - Grid 5 columns max - Aligned with header */}
      <section className="py-6 sm:py-10 bg-pink-200" data-testid="top-providers-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Les  Pink<span className="text-pink-500">Girls</span>
            </h2>
            <Link to="/entreprises" className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors text-sm">
              Voir tout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>


          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="aspect-[3/4] w-full bg-pink-50 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : allEnterprises.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {allEnterprises.slice(0, showAllCategories ? allEnterprises.length : 20).map((enterprise) => (
                <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8 text-sm">Aucune annonce disponible</p>
          )}

          {/* Bouton Voir plus */}
          {!showAllCategories && allEnterprises.length > 20 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAllCategories(true)}
                className="px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-medium hover:from-pink-500 hover:to-pink-600 transition-all flex items-center gap-2 shadow-md btn-shine"
              >
                Voir plus d'annonces
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <Link to="/entreprises" className="md:hidden flex items-center justify-center gap-2 mt-6 text-pink-500 font-medium text-sm">
            Toutes les annonces
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Services Section - Grid 4 columns - HIDDEN */}
      <section className="py-8 sm:py-16 bg-gray-50" data-testid="services-section" style={{ display: 'none' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Les meilleurs services de votre région
              </h2>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors" data-testid="view-all-services">
              Voir tout
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Service Category Tabs - Transparent style */}
          <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto scrollbar-hide pb-2" style={{ scrollbarWidth: 'none' }}>
            {serviceCategories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                to={`/services?category=${cat.id}`}
                className="px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-600 hover:text-pink-500 transition-all whitespace-nowrap flex-shrink-0"
                data-testid={`service-cat-${cat.id}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Service Cards Grid - 5 columns */}
          {offres.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {offres.slice(0, 20).map((item, index) => (
                <div key={item.id}>
                  <ServiceProductCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <div className="h-40 sm:h-56 bg-gray-100 animate-pulse" />
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="h-5 sm:h-6 bg-gray-100 rounded animate-pulse" />
                    <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                    <div className="h-6 sm:h-8 bg-gray-100 rounded w-1/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link to="/services" className="md:hidden flex items-center justify-center gap-2 mt-4 sm:mt-8 text-pink-500 font-medium text-sm">
            Voir tous les services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    

      {/* Tendances Actuelles - Grid 4 columns */}
      {tendances.length > 0 && (
        <section className="py-8 sm:py-16 bg-pink-50/30" data-testid="tendances-section">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Tendances <span className="text-pink-500">PinkGirls</span>
              </h2>
              <Link to="/tendances" className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors text-sm">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tendances.slice(0, 10).map((enterprise) => (
                <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
              ))}
            </div>
          </div>
        </section>
      )}

      {guests.length > 0 && (
        <section className="py-8 sm:py-16 bg-white" data-testid="guests-section">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Guests <span className="text-pink-500">PinkGirls</span>
              </h2>
              <Link to="/guests" className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors text-sm">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {guests.slice(0, 10).map((enterprise) => (
                <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
              ))}
            </div>
          </div>
        </section>
      )}

      {premium.length > 0 && (
        <section className="py-8 sm:py-16 bg-pink-200" data-testid="premium-section">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Premium <span className="text-pink-500">PinkGirls</span>
              </h2>
              <Link to="/premium" className="flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium transition-colors text-sm">
                Découvrir <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {premium.slice(0, 10).map((enterprise) => (
                <EnterpriseCard key={enterprise.id} enterprise={enterprise} />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* Avantages PinkGirl - Sans emojis, cartes agrandies */}
      <section className="py-16 sm:py-24 bg-pink-200 overflow-hidden" data-testid="advantages-section">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Avantages <span className="gradient-text-pink">PinkGirl</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-sky-300 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Site web inclus", desc: "Un site web professionnel créé par nos développeurs expérimentés, inclus dans votre abonnement." },
              { title: "Vente de contenu", desc: "Possibilité de vendre du contenu, produits exclusif directement sur la plateforme." },
              { title: "Bonus annuel", desc: "Gagne un bonus annuel basé sur le nombre de gains validés sur ton profil." },
              { title: "Grande visibilité", desc: "Une visibilité maximale sur le web grâce à notre référencement optimisé." },
              { title: "Cash-back", desc: "Un Cash-back perçu pour chacune de tes consommations, réutilisable partout." },
              { title: "Messagerie intégrée", desc: "Contacte les annonceurs directement depuis l'application." },
              { title: "Alertes personnalisées", desc: "Reçois des notifications quand une annonce correspond à tes critères." },
              { title: "Paiement sécurisé", desc: "Paye en toute confiance avec notre système de paiement protégé." },
              { title: "Offres exclusives", desc: "Des promotions et bons plans réservés aux membres PinkGirl." },
            ].map((item, index) => (
              <div 
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-pink-100/50 hover:border-pink-200 hover:-translate-y-2 card-hover"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0,
                }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-sky-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pink-500 transition-colors" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-r from-pink-400 to-sky-400" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Envie de publier une annonce ?
          </h2>
          <p className="text-sm sm:text-lg text-white/80 mb-6 sm:mb-10 max-w-2xl mx-auto">
            Rejoins PinkGirl et publie  tes annonces.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/auth?type=entreprise" className="bg-white text-pink-500 text-sm sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg btn-shine" data-testid="cta-register-btn">
              Publier une annonce
            </Link>
            <Link to="/about" className="border-2 border-white text-white text-sm sm:text-lg px-6 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:bg-pink-50 transition-colors">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
