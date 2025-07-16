'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Users, Star } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  region: string;
  available: boolean;
  vanCount: number;
  rating: number;
  image: string;
}

const locations: Location[] = [
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    available: true,
    vanCount: 2,
    rating: 4.8,
    image: '/images/bordeaux.jpg'
  },
  {
    id: 'marseille',
    name: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    available: true,
    vanCount: 2,
    rating: 4.6,
    image: '/images/marseille.jpg'
  },
  {
    id: 'paris',
    name: 'Paris',
    region: 'Île-de-France',
    available: true,
    vanCount: 2,
    rating: 4.7,
    image: '/images/paris.jpg'
  },
  {
    id: 'lyon',
    name: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    available: true,
    vanCount: 2,
    rating: 4.5,
    image: '/images/lyon.jpg'
  },
  {
    id: 'nantes',
    name: 'Nantes',
    region: 'Pays de la Loire',
    available: true,
    vanCount: 1,
    rating: 4.4,
    image: '/images/nantes.jpg'
  },
  {
    id: 'toulouse',
    name: 'Toulouse',
    region: 'Occitanie',
    available: true,
    vanCount: 1,
    rating: 4.6,
    image: '/images/toulouse.jpg'
  },
];

export default function LocationsGrid() {
  const router = useRouter();

  const handleLocationClick = (location: Location) => {
    // Redirection vers la page de réservation avec le lieu pré-sélectionné
    router.push(`/reservation?location=${location.id}`);
  };

  const handleViewAllLocations = () => {
    // Redirection vers la page de réservation
    router.push('/reservation');
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lieux de départ populaires
          </h2>
          <p className="text-lg text-gray-600">
            Choisissez parmi nos points de départ les plus demandés
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${location.image})` }}>
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <MapPin className="w-3 h-3 mr-1" />
                    Disponible
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{location.name}</h3>
                  <p className="text-sm opacity-90">{location.region}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {location.rating}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    {location.vanCount} van{location.vanCount > 1 ? 's' : ''}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    Point de départ principal
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Livraison gratuite
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocationClick(location);
                  }}
                  className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Voir les vans
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleViewAllLocations}
            className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Voir tous les lieux
          </button>
        </div>
      </div>
    </div>
  );
} 