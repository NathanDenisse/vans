import { vans } from '@/lib/vans';
import VanCard from '@/components/VanCard';

export default function VansPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos vans disponibles
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez notre sélection de vans aménagés pour vos aventures
          </p>
        </div>
      </div>

      {/* Vans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vans.map((van) => (
            <VanCard key={van.id} van={van} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {vans.length}
              </div>
              <div className="text-gray-600">Vans disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {vans.reduce((acc, van) => acc + van.sleeps, 0)}
              </div>
              <div className="text-gray-600">Places totales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {vans.length}
              </div>
              <div className="text-gray-600">Villes desservies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 