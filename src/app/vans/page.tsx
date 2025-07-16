'use client';

import React, { useState } from 'react';
import { Filter, Search, Star, Users, MapPin, Calendar } from 'lucide-react';
import VanCard from '@/components/VanCard';
import { vans } from '@/lib/vans-data';

export default function VansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [capacity, setCapacity] = useState('');

  const locations = ['bordeaux', 'marseille', 'paris', 'lyon', 'nantes', 'toulouse'];
  const locationNames = {
    bordeaux: 'Bordeaux',
    marseille: 'Marseille',
    paris: 'Paris',
    lyon: 'Lyon',
    nantes: 'Nantes',
    toulouse: 'Toulouse'
  };

  // Filtrer les vans
  const filteredVans = vans.filter(van => {
    const matchesSearch = van.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      van.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = !selectedLocation || van.location === selectedLocation;

    const matchesPrice = !priceRange || (() => {
      const [min, max] = priceRange.split('-').map(Number);
      return van.pricePerDay >= min && van.pricePerDay <= max;
    })();

    const matchesCapacity = !capacity || van.sleeps >= parseInt(capacity);

    return matchesSearch && matchesLocation && matchesPrice && matchesCapacity;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Nos vans disponibles</h1>
            <p className="text-xl text-blue-100">
              Découvrez notre collection de vans aménagés pour tous vos voyages
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <Filter className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un van..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Lieu */}
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tous les lieux</option>
              {locations.map(location => (
                <option key={location} value={location}>
                  {locationNames[location as keyof typeof locationNames]}
                </option>
              ))}
            </select>

            {/* Prix */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tous les prix</option>
              <option value="0-80">- 80€/jour</option>
              <option value="80-100">80€ - 100€/jour</option>
              <option value="100-130">100€ - 130€/jour</option>
              <option value="130-200">130€ - 200€/jour</option>
            </select>

            {/* Capacité */}
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toutes capacités</option>
              <option value="2">2 personnes</option>
              <option value="3">3 personnes</option>
              <option value="4">4 personnes</option>
              <option value="6">6 personnes</option>
            </select>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredVans.length} van{filteredVans.length > 1 ? 's' : ''} trouvé{filteredVans.length > 1 ? 's' : ''}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Trier par:</span>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="popularity">Popularité</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="rating">Note</option>
                <option value="year">Année</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grille des vans */}
        {filteredVans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVans.map((van) => (
              <VanCard key={van.id} van={van} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun van trouvé
            </h3>
            <p className="text-gray-600">
              Essayez de modifier vos critères de recherche pour trouver des vans disponibles.
            </p>
          </div>
        )}

        {/* Statistiques */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Nos vans en chiffres</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{vans.length}</div>
              <div className="text-sm text-gray-600">Vans disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{locations.length}</div>
              <div className="text-sm text-gray-600">Villes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {(vans.reduce((acc, van) => acc + van.rating, 0) / vans.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Note moyenne</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {vans.reduce((acc, van) => acc + van.reviewCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Avis clients</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 