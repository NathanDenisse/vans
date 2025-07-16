import React from 'react';
import Link from 'next/link';
import { Star, Users, MapPin } from 'lucide-react';

interface Van {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerDay: number;
  image: string;
  sleeps: number;
  features: string[];
  rating: number;
  reviewCount: number;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  owner: {
    name: string;
    rating: number;
    responseTime: string;
  };
  availability: {
    startDate: string;
    endDate: string;
  }[];
  extras: string[];
  specifications: {
    length: string;
    height: string;
    width: string;
    engine: string;
    power: string;
  };
}

interface VanCardProps {
  van: Van;
}

export default function VanCard({ van }: VanCardProps) {
  return (
    <Link href={`/vans/${van.id}`} className="group">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
        {/* Image du van */}
        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
          <img
            src={van.image}
            alt={van.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent group-hover:from-white/20 transition-all duration-300"></div>

          {/* Badge prix */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
            {van.pricePerDay}€/jour
          </div>

          {/* Badge capacité */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
            {van.sleeps} pers.
          </div>

          {/* Badge année */}
          <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-white shadow-sm">
            {van.year}
          </div>
        </div>

        {/* Contenu du van */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {van.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {van.description}
          </p>

          {/* Informations principales */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{van.location}</span>
            </div>
            <div className="text-lg font-bold text-blue-600">
              {van.pricePerDay}€
            </div>
          </div>

          {/* Caractéristiques */}
          <div className="mb-4 flex flex-wrap gap-1">
            {van.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-100"
              >
                {feature}
              </span>
            ))}
            {van.features.length > 3 && (
              <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-100">
                +{van.features.length - 3} autres
              </span>
            )}
          </div>

          {/* Note et avis */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium text-gray-900">{van.rating}</span>
              <span className="ml-1 text-gray-600">({van.reviewCount} avis)</span>
            </div>
            <div className="text-gray-500">
              {van.mileage.toLocaleString()} km
            </div>
          </div>

          {/* Propriétaire */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xs font-medium text-blue-600">
                    {van.owner.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-900">{van.owner.name}</div>
                  <div className="text-xs text-gray-500">Répond en {van.owner.responseTime}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs font-medium ml-1">{van.owner.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 