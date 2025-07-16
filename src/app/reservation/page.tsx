'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Calendar, Users, Star, Search, Calculator } from 'lucide-react';
import AdvancedCalendar from '@/components/AdvancedCalendar';
import AvailableVansGrid from '@/components/AvailableVansGrid';
import { getAvailableVans, getVansByLocation } from '@/lib/vans-data';

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
    vanCount: 12,
    rating: 4.8,
    image: '/images/bordeaux.jpg'
  },
  {
    id: 'marseille',
    name: 'Marseille',
    region: 'Provence-Alpes-Côte d\'Azur',
    available: true,
    vanCount: 8,
    rating: 4.6,
    image: '/images/marseille.jpg'
  },
  {
    id: 'paris',
    name: 'Paris',
    region: 'Île-de-France',
    available: true,
    vanCount: 15,
    rating: 4.7,
    image: '/images/paris.jpg'
  },
  {
    id: 'lyon',
    name: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    available: true,
    vanCount: 10,
    rating: 4.5,
    image: '/images/lyon.jpg'
  },
  {
    id: 'nantes',
    name: 'Nantes',
    region: 'Pays de la Loire',
    available: true,
    vanCount: 6,
    rating: 4.4,
    image: '/images/nantes.jpg'
  },
  {
    id: 'toulouse',
    name: 'Toulouse',
    region: 'Occitanie',
    available: true,
    vanCount: 9,
    rating: 4.6,
    image: '/images/toulouse.jpg'
  },
];

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  // Prendre en compte le lieu pré-sélectionné depuis l'URL
  useEffect(() => {
    const locationParam = searchParams.get('location');
    if (locationParam) {
      const location = locations.find(loc => loc.id === locationParam);
      if (location) {
        setSelectedLocation(location);
      }
    }
  }, [searchParams]);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const duration = calculateDuration();
  const estimatedCost = duration * 85; // Prix moyen estimé par jour

  const handleDateSelect = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setSearchTerm('');
  };

  const handleSearch = () => {
    if (selectedLocation && startDate && endDate) {
      // La recherche se fait automatiquement via les états
      console.log(`Recherche pour ${selectedLocation.name} du ${startDate.toLocaleDateString('fr-FR')} au ${endDate.toLocaleDateString('fr-FR')}`);
    }
  };

  // Obtenir les vans disponibles
  const availableVans = selectedLocation && startDate && endDate
    ? getAvailableVans(startDate, endDate, selectedLocation.id)
    : [];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Réservez votre van</h1>
          <p className="text-gray-600 mt-2">Trouvez le van parfait pour votre prochaine aventure</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne de gauche - Sélection du lieu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Choisissez votre lieu de départ</h2>

              {/* Barre de recherche */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Rechercher un lieu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* Liste des lieux */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => handleLocationSelect(location)}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-colors
                      ${selectedLocation?.id === location.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{location.name}</h3>
                        <p className="text-sm text-gray-600">{location.region}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="w-4 h-4 mr-1" />
                          {location.vanCount} vans
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          {location.rating}
                        </div>
                      </div>
                    </div>
                    {location.available && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Disponible
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Informations sélectionnées */}
              {selectedLocation && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Lieu sélectionné</h3>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-gray-700">{selectedLocation.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Colonne de droite - Calendrier et résumé */}
          <div className="lg:col-span-2">
            {/* Calendrier */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Sélectionnez vos dates</h2>
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {showCalendar ? 'Masquer' : 'Afficher'} le calendrier
                </button>
              </div>

              {showCalendar && <AdvancedCalendar onDateSelect={handleDateSelect} />}

              {/* Résumé des dates sélectionnées */}
              {(startDate || endDate) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Dates sélectionnées</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    {startDate && (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-gray-700">Départ: {formatDate(startDate)}</span>
                      </div>
                    )}
                    {endDate && (
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-gray-700">Retour: {formatDate(endDate)}</span>
                      </div>
                    )}
                  </div>
                  {duration > 0 && (
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <Calculator className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="text-sm font-medium text-gray-900">Estimation du coût</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          {estimatedCost}€
                        </div>
                        <div className="text-sm text-gray-600">
                          pour {duration} jour{duration > 1 ? 's' : ''} (~85€/jour)
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bouton de recherche */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <button
                onClick={handleSearch}
                disabled={!selectedLocation || !startDate || !endDate}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Rechercher des vans disponibles
              </button>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Annulation gratuite
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Assurance incluse
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Support 24/7
                </div>
              </div>
            </div>

            {/* Résultats des vans disponibles */}
            {availableVans.length > 0 && (
              <div className="mt-8">
                <AvailableVansGrid
                  vans={availableVans}
                  startDate={startDate}
                  endDate={endDate}
                  location={selectedLocation?.name || ''}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 