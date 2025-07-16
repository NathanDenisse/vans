'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Calendar, Filter, Star, Users, Fuel, Settings, Calculator } from 'lucide-react';
import AvailableVansGrid from '@/components/AvailableVansGrid';
import { getAvailableVans, Van } from '@/lib/vans-data';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [filteredVans, setFilteredVans] = useState<Van[]>([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get('location') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  useEffect(() => {
    if (location && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const available = getAvailableVans(start, end, location);
      setFilteredVans(available);
    }
    setLoading(false);
  }, [location, startDate, endDate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const duration = calculateDuration();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Recherche en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Résultats de recherche</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
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
                      <span className="font-medium">{duration} jour{duration > 1 ? 's' : ''}</span>
                    </div>
                  </>
                )}
              </div>
              {/* Résumé du coût estimé */}
              {duration > 0 && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg inline-block">
                  <div className="flex items-center">
                    <Calculator className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Coût estimé: </span>
                    <span className="text-lg font-bold text-blue-600 ml-2">
                      {duration * 85}€
                    </span>
                    <span className="text-sm text-gray-600 ml-1">
                      (~85€/jour)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 md:mt-0">
              <button
                onClick={() => {
                  alert('Ouverture des filtres avancés');
                }}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres rapides */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtres rapides</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <button
              onClick={() => alert('Filtre: 2 personnes')}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Users className="w-4 h-4 mr-2" />
              2 personnes
            </button>
            <button
              onClick={() => alert('Filtre: 4 personnes')}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Users className="w-4 h-4 mr-2" />
              4 personnes
            </button>
            <button
              onClick={() => alert('Filtre: Électrique')}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Fuel className="w-4 h-4 mr-2" />
              Électrique
            </button>
            <button
              onClick={() => alert('Filtre: Automatique')}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Automatique
            </button>
            <button
              onClick={() => alert('Filtre: 4.5+ étoiles')}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Star className="w-4 h-4 mr-2" />
              4.5+ étoiles
            </button>
            <button
              onClick={() => alert('Filtre: -50€/jour')}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <span className="text-sm">-50€/jour</span>
            </button>
          </div>
        </div>

        {/* Résultats */}
        {startDate && endDate ? (
          filteredVans.length > 0 ? (
            <AvailableVansGrid
              vans={filteredVans}
              startDate={new Date(startDate)}
              endDate={new Date(endDate)}
              location={location}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun van disponible à {location}
              </h3>
              <p className="text-gray-600 mb-4">
                Malheureusement, aucun van n'est disponible à {location} pour les dates sélectionnées.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-blue-900 mb-2">Suggestions :</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Essayez de modifier vos dates de voyage</li>
                  <li>• Choisissez une autre ville de départ</li>
                  <li>• Consultez notre page <a href="/vans" className="underline font-medium">tous les vans</a> pour voir les disponibilités</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Nouvelle recherche
                </a>
                <a
                  href="/vans"
                  className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Voir tous les vans
                </a>
              </div>
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Informations manquantes
            </h3>
            <p className="text-gray-600">
              Veuillez sélectionner des dates de début et de fin pour voir les vans disponibles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 