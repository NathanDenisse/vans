export interface VanAvailability {
  startDate: string; // Format: YYYY-MM-DD
  endDate: string;
  isAvailable: boolean;
}

export interface Van {
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

export const vans: Van[] = [
  {
    id: 'van1',
    title: 'Mercedes Sprinter Adventure',
    description: 'Van aménagé premium pour 4 personnes avec tout le confort moderne. Idéal pour les familles en quête d\'aventure.',
    location: 'bordeaux',
    pricePerDay: 95,
    image: '/images/van1.jpg',
    sleeps: 4,
    features: ['Cuisine équipée', 'Toilettes chimiques', 'Douche extérieure', 'Panneaux solaires', 'GPS intégré', 'Climatisation'],
    rating: 4.8,
    reviewCount: 127,
    year: 2022,
    mileage: 45000,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    owner: {
      name: 'Thomas & Marie',
      rating: 4.9,
      responseTime: '1 heure'
    },
    availability: [
      { startDate: '2024-01-01', endDate: '2024-12-31' },
      { startDate: '2025-01-01', endDate: '2025-12-31' }
    ],
    extras: ['Kit de camping', 'Vélo porte-vélos', 'Tente de toit'],
    specifications: {
      length: '6.0m',
      height: '2.8m',
      width: '2.0m',
      engine: '2.2L Diesel',
      power: '163 ch'
    }
  },
  {
    id: 'van2',
    title: 'Fiat Ducato Nomad',
    description: 'Van spacieux et confortable pour 6 personnes. Parfait pour les grands groupes et les voyages longue durée.',
    location: 'marseille',
    pricePerDay: 120,
    image: '/images/van2.jpg',
    sleeps: 6,
    features: ['Lit double', 'Lit superposé', 'Cuisine complète', 'Salle de bain', 'Toit relevable', 'WiFi'],
    rating: 4.6,
    reviewCount: 89,
    year: 2021,
    mileage: 62000,
    fuelType: 'Diesel',
    transmission: 'Manuelle',
    owner: {
      name: 'Pierre Dubois',
      rating: 4.7,
      responseTime: '2 heures'
    },
    availability: [
      { startDate: '2024-01-01', endDate: '2024-12-31' },
      { startDate: '2025-01-01', endDate: '2025-12-31' }
    ],
    extras: ['Barbecue portable', 'Équipement de plage', 'Jeux de société'],
    specifications: {
      length: '6.4m',
      height: '2.9m',
      width: '2.1m',
      engine: '2.3L Diesel',
      power: '150 ch'
    }
  },
  {
    id: 'van3',
    title: 'Volkswagen California',
    description: 'Van compact et élégant pour 2-4 personnes. Design allemand et qualité premium pour des escapades urbaines.',
    location: 'paris',
    pricePerDay: 110,
    image: '/images/van3.jpg',
    sleeps: 4,
    features: ['Toit relevable électrique', 'Cuisine intégrée', 'Rangements optimisés', 'Système audio premium', 'Sièges confortables'],
    rating: 4.7,
    reviewCount: 156,
    year: 2023,
    mileage: 28000,
    fuelType: 'Essence',
    transmission: 'Automatique',
    owner: {
      name: 'Sophie Martin',
      rating: 4.8,
      responseTime: '30 minutes'
    },
    availability: [
      { startDate: '2024-01-01', endDate: '2024-12-31' },
      { startDate: '2025-01-01', endDate: '2025-12-31' }
    ],
    extras: ['Parasol de toit', 'Matelas supplémentaire', 'Couverts de luxe'],
    specifications: {
      length: '5.3m',
      height: '2.7m',
      width: '1.9m',
      engine: '2.0L TSI',
      power: '150 ch'
    }
  },
  {
    id: 'van4',
    title: 'Renault Master Explorer',
    description: 'Van robuste et fiable pour 4 personnes. Idéal pour les aventures en montagne et les terrains difficiles.',
    location: 'lyon',
    pricePerDay: 85,
    image: '/images/van4.jpg',
    sleeps: 4,
    features: ['4x4 optionnel', 'Suspension renforcée', 'Cuisine basique', 'Lit double', 'Rangements latéraux'],
    rating: 4.5,
    reviewCount: 73,
    year: 2020,
    mileage: 78000,
    fuelType: 'Diesel',
    transmission: 'Manuelle',
    owner: {
      name: 'Marc & Julie',
      rating: 4.6,
      responseTime: '3 heures'
    },
    availability: [
      { startDate: '2024-01-01', endDate: '2024-12-31' },
      { startDate: '2025-01-01', endDate: '2025-12-31' }
    ],
    extras: ['Équipement de ski', 'Chaines à neige', 'Lampe frontale'],
    specifications: {
      length: '6.2m',
      height: '2.8m',
      width: '2.0m',
      engine: '2.3L Diesel',
      power: '130 ch'
    }
  },
  {
    id: 'van5',
    title: 'Peugeot Boxer Freedom',
    description: 'Van économique et pratique pour 2 personnes. Parfait pour les couples en quête de liberté.',
    location: 'nantes',
    pricePerDay: 75,
    image: '/images/van5.jpg',
    sleeps: 2,
    features: ['Lit double confortable', 'Cuisine compacte', 'Douche extérieure', 'Panneaux solaires', 'Frigo 12V'],
    rating: 4.4,
    reviewCount: 45,
    year: 2021,
    mileage: 55000,
    fuelType: 'Diesel',
    transmission: 'Manuelle',
    owner: {
      name: 'Claire & Paul',
      rating: 4.5,
      responseTime: '4 heures'
    },
    availability: [
      { startDate: '2024-01-01', endDate: '2024-12-31' },
      { startDate: '2025-01-01', endDate: '2025-12-31' }
    ],
    extras: ['Tente de toit', 'Matelas de sol', 'Réchaud à gaz'],
    specifications: {
      length: '5.9m',
      height: '2.6m',
      width: '2.0m',
      engine: '2.2L Diesel',
      power: '120 ch'
    }
  },
  {
    id: 'van6',
    title: 'Ford Transit Custom',
    description: 'Van moderne et polyvalent pour 3 personnes. Confort et technologie pour des voyages urbains et ruraux.',
    location: 'toulouse',
    pricePerDay: 90,
    image: '/images/van6.jpg',
    sleeps: 3,
    features: ['Système de navigation', 'Caméra de recul', 'Cuisine équipée', 'Lit confortable', 'Climatisation'],
    rating: 4.6,
    reviewCount: 67,
    year: 2022,
    mileage: 42000,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    owner: {
      name: 'Antoine Roux',
      rating: 4.7,
      responseTime: '1 heure'
    },
    availability: [
      { startDate: '2024-01-01', endDate: '2024-12-31' },
      { startDate: '2025-01-01', endDate: '2025-12-31' }
    ],
    extras: ['Vélo porte-vélos', 'Table de camping', 'Éclairage LED'],
    specifications: {
      length: '5.3m',
      height: '2.7m',
      width: '2.0m',
      engine: '2.0L EcoBlue',
      power: '140 ch'
    }
  },
  {
    id: 'van7',
    title: 'Citroën Jumper Luxury',
    description: 'Van haut de gamme pour 4 personnes. Luxe et confort pour des voyages mémorables.',
    location: 'bordeaux',
    pricePerDay: 130,
    image: '/images/van7.jpg',
    sleeps: 4,
    features: ['Intérieur cuir', 'Système audio premium', 'Cuisine de luxe', 'Salle de bain complète', 'WiFi 4G', 'TV'],
    rating: 4.9,
    reviewCount: 94,
    year: 2023,
    mileage: 18000,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    owner: {
      name: 'Isabelle & François',
      rating: 4.9,
      responseTime: '30 minutes'
    },
    availability: [
      { startDate: '2024-01-01', endDate: '2024-12-31' },
      { startDate: '2025-01-01', endDate: '2025-12-31' }
    ],
    extras: ['Service de conciergerie', 'Nettoyage inclus', 'Assurance premium'],
    specifications: {
      length: '6.4m',
      height: '2.9m',
      width: '2.1m',
      engine: '2.2L BlueHDi',
      power: '180 ch'
    }
  },
  {
    id: 'van8',
    title: 'Iveco Daily Adventure',
    description: 'Van tout-terrain pour 6 personnes. Conçu pour les aventures extrêmes et les terrains difficiles.',
    location: 'marseille',
    pricePerDay: 140,
    image: '/images/van8.jpg',
    sleeps: 6,
    features: ['4x4 permanent', 'Suspension pneumatique', 'Cuisine robuste', 'Lit superposé', 'Équipement de survie'],
    rating: 4.7,
    reviewCount: 52,
    year: 2021,
    mileage: 35000,
    fuelType: 'Diesel',
    transmission: 'Manuelle',
    owner: {
      name: 'Jean-Luc & Sarah',
      rating: 4.8,
      responseTime: '2 heures'
    },
    availability: [
      { startDate: '2024-01-01', endDate: '2024-12-31' },
      { startDate: '2025-01-01', endDate: '2025-12-31' }
    ],
    extras: ['Équipement de plongée', 'GPS tout-terrain', 'Kit de réparation'],
    specifications: {
      length: '6.8m',
      height: '3.0m',
      width: '2.2m',
      engine: '3.0L Diesel',
      power: '170 ch'
    }
  },
  {
    id: 'van9',
    title: 'Fiat Ducato Compact',
    description: 'Van compact et maniable pour 2 personnes. Parfait pour les voyages en ville et les petits espaces.',
    location: 'paris',
    pricePerDay: 70,
    image: '/images/van9.jpg',
    sleeps: 2,
    features: ['Taille compacte', 'Cuisine basique', 'Lit simple', 'Facile à garer', 'Économique'],
    rating: 4.3,
    reviewCount: 38,
    year: 2020,
    mileage: 68000,
    fuelType: 'Diesel',
    transmission: 'Manuelle',
    owner: {
      name: 'Marie Dubois',
      rating: 4.4,
      responseTime: '5 heures'
    },
    availability: [
      { startDate: '2024-01-01', endDate: '2024-12-31' },
      { startDate: '2025-01-01', endDate: '2025-12-31' }
    ],
    extras: ['Parking inclus', 'Guide de la ville', 'Carte de réduction'],
    specifications: {
      length: '5.0m',
      height: '2.5m',
      width: '2.0m',
      engine: '2.0L Diesel',
      power: '110 ch'
    }
  },
  {
    id: 'van10',
    title: 'Mercedes Sprinter Premium',
    description: 'Van premium pour 4 personnes. Luxe allemand et technologie de pointe pour des voyages exceptionnels.',
    location: 'lyon',
    pricePerDay: 150,
    image: '/images/van10.jpg',
    sleeps: 4,
    features: ['Intérieur design', 'Système multimédia', 'Cuisine professionnelle', 'Salle de bain luxueuse', 'Climatisation bi-zone'],
    rating: 4.9,
    reviewCount: 78,
    year: 2023,
    mileage: 12000,
    fuelType: 'Diesel',
    transmission: 'Automatique',
    owner: {
      name: 'Pierre & Anne',
      rating: 4.9,
      responseTime: '15 minutes'
    },
    availability: [
      { startDate: '2024-01-01', endDate: '2024-12-31' },
      { startDate: '2025-01-01', endDate: '2025-12-31' }
    ],
    extras: ['Chauffeur optionnel', 'Service de ménage', 'Conciergerie 24/7'],
    specifications: {
      length: '6.2m',
      height: '2.9m',
      width: '2.1m',
      engine: '2.2L CDI',
      power: '163 ch'
    }
  }
];

export function getAvailableVans(startDate: Date, endDate: Date, location: string): Van[] {
  return vans.filter(van => {
    // Vérifier si le van est à la bonne location
    if (van.location !== location) return false;

    // Retourner true si au moins une période de disponibilité chevauche la période recherchée
    return van.availability.some(period => {
      const periodStart = new Date(period.startDate);
      const periodEnd = new Date(period.endDate);
      // Chevauchement : (start <= periodEnd) && (end >= periodStart)
      return startDate <= periodEnd && endDate >= periodStart;
    });
  });
}

export function getVansByLocation(location: string): Van[] {
  return vans.filter(van => van.location === location);
}

export function getVanById(id: string): Van | undefined {
  return vans.find(van => van.id === id);
}

export function getPopularVans(limit: number = 3): Van[] {
  return vans
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getVansByPriceRange(minPrice: number, maxPrice: number): Van[] {
  return vans.filter(van => van.pricePerDay >= minPrice && van.pricePerDay <= maxPrice);
}

export function getVansByCapacity(capacity: number): Van[] {
  return vans.filter(van => van.sleeps >= capacity);
} 