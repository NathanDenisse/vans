'use client';

import React from 'react';
import { Star, Users, MapPin, Calendar, Fuel, Settings, Clock, User, Calculator } from 'lucide-react';
import { Van } from '@/lib/vans-data';

interface AvailableVansGridProps {
  vans: Van[];
  startDate: Date | null;
  endDate: Date | null;
  location: string;
}

export default function AvailableVansGrid({ vans, startDate, endDate, location }: AvailableVansGridProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const duration = calculateDuration();

  if (vans.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun van disponible
        </h3>
        <p className="text-gray-600">
          Aucun van n'est disponible à {location} pour les dates sélectionnées.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Essayez de modifier vos dates ou choisissez un autre lieu de départ.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec résumé */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {vans.length} van{vans.length > 1 ? 's' : ''} disponible{vans.length > 1 ? 's' : ''}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </div>
              {startDate && endDate && (
                <>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(startDate)} - {formatDate(endDate)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {duration} jour{duration > 1 ? 's' : ''}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Trier par:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="price">Prix</option>
                <option value="rating">Note</option>
                <option value="popularity">Popularité</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des vans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vans.map((van) => (
          <div
            key={van.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
          >
            {/* Image du van */}
            <div
              className="relative h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${van.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>

              {/* Badge disponibilité */}
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 shadow-sm">
                  Disponible
                </span>
              </div>

              {/* Badge note */}
              <div className="absolute top-3 right-3">
                <div className="flex items-center bg-white bg-opacity-95 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-medium ml-1">{van.rating}</span>
                </div>
              </div>

              {/* Badge année */}
              <div className="absolute bottom-3 left-3">
                <div className="bg-blue-600 bg-opacity-90 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-medium text-white">{van.year}</span>
                </div>
              </div>

              {/* Informations du van */}
              <div className="absolute bottom-3 right-3 text-white">
                <div className="text-sm font-medium">{van.title}</div>
                <div className="text-xs opacity-90">{van.location}</div>
              </div>
            </div>

            {/* Contenu du van */}
            <div className="p-6">
              {/* Prix et durée */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {van.pricePerDay}€
                  </div>
                  <div className="text-sm text-gray-600">par jour</div>
                </div>
                {duration > 0 && (
                  <div className="text-right">
                    <div className="text-lg font-semibold text-blue-600">
                      {van.pricePerDay * duration}€
                    </div>
                    <div className="text-sm text-gray-600">total</div>
                    <div className="text-xs text-gray-500">
                      {duration} jour{duration > 1 ? 's' : ''}
                    </div>
                  </div>
                )}
              </div>

              {/* Estimation du coût total */}
              {duration > 0 && (
                <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calculator className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-900">Coût total estimé</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        {van.pricePerDay * duration}€
                      </div>
                      <div className="text-xs text-gray-600">
                        {van.pricePerDay}€ × {duration} jour{duration > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Caractéristiques principales */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-blue-500" />
                  {van.sleeps} personne{van.sleeps > 1 ? 's' : ''}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Fuel className="w-4 h-4 mr-2 text-green-500" />
                  {van.fuelType}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Settings className="w-4 h-4 mr-2 text-purple-500" />
                  {van.transmission}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                  {van.year}
                </div>
              </div>

              {/* Propriétaire */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{van.owner.name}</div>
                    <div className="text-xs text-gray-600">Répond en {van.owner.responseTime}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs font-medium ml-1">{van.owner.rating}</span>
                </div>
              </div>

              {/* Équipements */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-900 mb-2">Équipements inclus</div>
                <div className="flex flex-wrap gap-1">
                  {van.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full border border-blue-100"
                    >
                      {feature}
                    </span>
                  ))}
                  {van.features.length > 3 && (
                    <span className="inline-block px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded-full border border-gray-100">
                      +{van.features.length - 3} autres
                    </span>
                  )}
                </div>
              </div>

              {/* Bouton de réservation */}
              <button
                onClick={() => {
                  alert(`Réservation du ${van.title} pour ${duration} jour${duration > 1 ? 's' : ''} - Total: ${van.pricePerDay * duration}€`);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Réserver maintenant
              </button>

              {/* Informations supplémentaires */}
              <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{van.reviewCount} avis</span>
                <span>{van.mileage.toLocaleString()} km</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {vans.length > 6 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              Précédent
            </button>
            <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              Suivant
            </button>
          </nav>
        </div>
      )}
    </div>
  );
} 