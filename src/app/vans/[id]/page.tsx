import { vans } from '@/lib/vans';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface VanDetailPageProps {
  params: {
    id: string;
  };
}

export default function VanDetailPage({ params }: VanDetailPageProps) {
  const van = vans.find(v => v.id === params.id);

  if (!van) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/vans"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux vans
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{van.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="rounded-xl h-96 relative overflow-hidden">
            <img
              src={van.image}
              alt={van.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-4 py-2 text-lg font-bold text-gray-800">
              {van.pricePerDay}€/jour
            </div>
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-full px-4 py-2 text-lg font-bold text-gray-800">
              {van.sleeps} personnes
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Basic Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {van.description}
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-lg">Localisation : {van.location}</span>
            </div>

            {/* Price */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {van.pricePerDay}€
                  </div>
                  <div className="text-gray-600">par jour</div>
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Réserver
                </button>
              </div>
            </div>

            {/* Extras */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Équipements inclus</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {van.extras.map((extra, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {extra}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions ?</h3>
              <p className="text-gray-600 mb-4">
                Contactez-nous pour plus d&apos;informations sur ce van
              </p>
              <div className="space-y-2 text-gray-600">
                <div>📧 contact@nomadix.fr</div>
                <div>📞 +33 1 23 45 67 89</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 