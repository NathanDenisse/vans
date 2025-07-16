export type Van = {
  id: string;
  title: string;
  description: string;
  location: string;
  pricePerDay: number;
  image: string;
  sleeps: number;
  extras: string[];
};

export const vans: Van[] = [
  {
    id: "van1",
    title: "Van Bivouac 4x4",
    description: "Idéal pour les escapades hors des sentiers battus.",
    location: "Bordeaux",
    pricePerDay: 85,
    image: "/images/van1.jpg",
    sleeps: 2,
    extras: ["Panneaux solaires", "Douche extérieure", "Frigo"],
  },
  {
    id: "van2",
    title: "Nomad Family XL",
    description: "Parfait pour les familles en quête d'aventure.",
    location: "Marseille",
    pricePerDay: 115,
    image: "/images/van2.jpg",
    sleeps: 4,
    extras: ["Cuisine équipée", "Toilettes chimiques", "GPS intégré"],
  },
  {
    id: "van3",
    title: "Van Évasion Zen",
    description: "Un cocon mobile pour deux personnes.",
    location: "Paris",
    pricePerDay: 95,
    image: "/images/van3.jpg",
    sleeps: 2,
    extras: ["Toit relevable", "Lit double", "Kit yoga"],
  },
]; 