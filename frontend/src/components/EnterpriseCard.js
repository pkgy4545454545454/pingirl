import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Clock, Phone, Globe, Mail } from 'lucide-react';

const EnterpriseCard = ({ enterprise }) => {
  if (!enterprise) return null;

  const name = enterprise.business_name || enterprise.name || 'Annonce';
  const city = enterprise.city || '';
  const image =
    enterprise.image ||
    enterprise.photo ||
    enterprise.cover_image ||
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop';

  const rating = enterprise.rating || (4 + Math.random()).toFixed(1);
  const price = enterprise.price || '';
  const date = enterprise.created_at
    ? new Date(enterprise.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
      })
    : '';

  const phone = enterprise.phone || '';
  const website = enterprise.website || '';
  const email = enterprise.email || '';

  // Nettoyage du nom de domaine
  const cleanWebsite = website
    ? website
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .split('/')[0]
    : '';

  return (
    <Link
      to={`/entreprise/${enterprise.id}`}
      className="block group card-hover w-full"
      data-testid={`enterprise-card-${enterprise.id}`}
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-pink-50 shadow-sm hover:shadow-lg transition-shadow duration-300 w-full">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Bouton Favori */}
          <button
            className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-pink-50 transition-colors"
            onClick={(e) => e.preventDefault()}
            data-testid={`fav-btn-${enterprise.id}`}
          >
            <Heart className="w-4 h-4 text-pink-400" />
          </button>

          {/* Nom */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2 drop-shadow-md">
              {name}
            </h3>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4">
          {/* Ville + Date */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1 min-w-0 text-gray-500">
              <MapPin className="w-3 h-3 text-sky-400 flex-shrink-0" />
              <span className="text-xs truncate">{city || 'Suisse'}</span>
            </div>

            {date && (
              <div className="flex items-center gap-1 text-gray-400 flex-shrink-0">
                <Clock className="w-3 h-3" />
                <span className="text-xs">{date}</span>
              </div>
            )}
          </div>

          {/* Téléphone */}
          {phone && (
            <div className="flex items-center gap-2 mb-2 min-w-0">
              <Phone className="w-3 h-3 text-pink-300 flex-shrink-0" />
              <span className="text-xs text-gray-500 truncate">
                {phone}
              </span>
            </div>
          )}
  {email && (
            <div className="flex items-center gap-2 mb-2 min-w-0">
              <Mail className="w-3 h-3 text-pink-300 flex-shrink-0" />
              <span className="text-xs text-gray-500 truncate">
                {email}
              </span>
            </div>
          )}

          {/* Site Web - AFFICHAGE COMPLET */}
          {website && (
            <div className="flex items-start gap-2 mb-3 min-w-0">
              <Globe className="w-3 h-3 text-sky-400 flex-shrink-0 mt-0.5" />
              <span
                className="text-xs text-sky-500 break-all leading-relaxed"
                title={cleanWebsite}
              >
                {cleanWebsite}
              </span>
            </div>
          )}

          {/* Prix + Note */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
            {price ? (
              <span className="text-pink-500 font-bold text-sm whitespace-nowrap">
                {price} CHF
              </span>
            ) : (
              <span className="text-sky-400 font-medium text-xs">
                Voir l'annonce
              </span>
            )}

            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs text-gray-600 font-medium">
                {rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EnterpriseCard;
