'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Calculator, Search } from 'lucide-react';
import AvailableVansGrid from '@/components/AvailableVansGrid';
import { getAvailableVans } from '@/lib/vans-data';

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
];

export default function TestPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
  const estimatedCost = duration * 85;

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleSearch = () => {
    if (selectedLocation && startDate && endDate) {
      const params = new URLSearchParams({
        location: selectedLocation.id,
        startDate: startDate,
        endDate: endDate
      });
      router.push(`/search-results?${params.toString()}`);
    }
  };

  // Obtenir les vans disponibles pour l'affichage
  const availableVans = selectedLocation && startDate && endDate
    ? getAvailableVans(new Date(startDate), new Date(endDate), selectedLocation.id)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Page de test</h1>
          <p className="text-gray-600">Testez toutes les fonctionnalités de réservation</p>
        </div>

        {/* Formulaire de test */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Test de réservation</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Sélection du lieu */}
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
          </div>

          {/* Estimation du coût */}
          {duration > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
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

          {/* Boutons de test */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSearch}
              disabled={!selectedLocation || !startDate || !endDate}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Rechercher des vans
            </button>

            <button
              onClick={() => router.push('/reservation')}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Page de réservation complète
            </button>

            <button
              onClick={() => router.push('/')}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>

        {/* Affichage des vans disponibles */}
        {availableVans.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Vans disponibles ({availableVans.length})
            </h2>
            <AvailableVansGrid
              vans={availableVans}
              startDate={new Date(startDate)}
              endDate={new Date(endDate)}
              location={selectedLocation?.name || ''}
            />
          </div>
        )}

        {/* Informations de test */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informations de test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Pages disponibles :</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• <a href="/" className="text-blue-600 hover:underline">Accueil</a> - Page principale</li>
                <li>• <a href="/reservation" className="text-blue-600 hover:underline">Réservation</a> - Page de réservation complète</li>
                <li>• <a href="/search-results" className="text-blue-600 hover:underline">Résultats</a> - Page de résultats (avec paramètres)</li>
                <li>• <a href="/test" className="text-blue-600 hover:underline">Test</a> - Cette page de test</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Fonctionnalités testées :</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Sélection de lieu avec dropdown</li>
                <li>• Sélection de dates</li>
                <li>• Calcul du coût total</li>
                <li>• Affichage des vans disponibles</li>
                <li>• Redirection entre pages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 