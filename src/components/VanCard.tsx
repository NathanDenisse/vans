import { Van } from '@/lib/vans';
import Link from 'next/link';

interface VanCardProps {
  van: Van;
}

export default function VanCard({ van }: VanCardProps) {
  return (
    <Link href={`/vans/${van.id}`} className="group">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
        {/* Image */}
        <div className="h-48 relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
          <img
            src={van.image}
            alt={van.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent group-hover:from-white/20 transition-all duration-300"></div>
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
            {van.pricePerDay}€/jour
          </div>
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
            {van.sleeps} pers.
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {van.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-2">
            {van.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{van.location}</span>
            </div>

            <div className="text-lg font-bold text-blue-600">
              {van.pricePerDay}€
            </div>
          </div>

          {/* Extras preview */}
          <div className="mt-4 flex flex-wrap gap-1">
            {van.extras.slice(0, 2).map((extra, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-100"
              >
                {extra}
              </span>
            ))}
            {van.extras.length > 2 && (
              <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full border border-gray-100">
                +{van.extras.length - 2} autres
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 