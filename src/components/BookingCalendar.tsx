'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Calculator } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  region: string;
  available: boolean;
}

const locations: Location[] = [
  { id: 'bordeaux', name: 'Bordeaux', region: 'Nouvelle-Aquitaine', available: true },
  { id: 'marseille', name: 'Marseille', region: 'Provence-Alpes-Côte d\'Azur', available: true },
  { id: 'paris', name: 'Paris', region: 'Île-de-France', available: true },
  { id: 'lyon', name: 'Lyon', region: 'Auvergne-Rhône-Alpes', available: true },
  { id: 'nantes', name: 'Nantes', region: 'Pays de la Loire', available: true },
  { id: 'toulouse', name: 'Toulouse', region: 'Occitanie', available: true },
  { id: 'nice', name: 'Nice', region: 'Provence-Alpes-Côte d\'Azur', available: true },
  { id: 'strasbourg', name: 'Strasbourg', region: 'Grand Est', available: true },
];

export default function BookingCalendar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const duration = calculateDuration();
  const estimatedCost = duration * 85; // Prix moyen estimé par jour

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleSearch = () => {
    if (selectedLocation && startDate && endDate) {
      // Redirection vers la page de résultats
      const params = new URLSearchParams({
        location: selectedLocation.id,
        startDate: startDate,
        endDate: endDate
      });
      router.push(`/search-results?${params.toString()}`);
    }
  };

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Réservez votre van
        </h2>
        <p className="text-gray-600">
          Trouvez le van parfait pour votre prochaine aventure
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Lieu de départ */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lieu de départ
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Où partez-vous ?"
              value={selectedLocation ? selectedLocation.name : searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedLocation(null);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          {/* Dropdown des lieux */}
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredLocations.length > 0 ? (
                filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => handleLocationSelect(location)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium text-gray-900">{location.name}</div>
                    <div className="text-sm text-gray-500">{location.region}</div>
                    {location.available && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Disponible
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500">
                  Aucun lieu trouvé
                </div>
              )}
            </div>
          )}
        </div>

        {/* Date de départ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de départ
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Date de retour */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de retour
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate || new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Bouton de recherche */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            disabled={!selectedLocation || !startDate || !endDate}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Rechercher
          </button>
        </div>
      </div>

      {/* Estimation du coût */}
      {duration > 0 && (
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calculator className="w-5 h-5 text-blue-600 mr-2" />
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
        </div>
      )}

      {/* Informations supplémentaires */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
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
  );
} 