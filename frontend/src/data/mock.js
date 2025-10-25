// Mock data pour LYON TRAVEL

export const services = [
  {
    id: 1,
    title: 'Billets d\'avion',
    icon: 'Plane',
    description: 'Réservez vos billets d\'avion internationaux et nationaux aux meilleurs tarifs',
    image: 'https://images.unsplash.com/photo-1562497021-6a91605fb927?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHxjb21tZXJjaWFsJTIwYWlycGxhbmV8ZW58MHx8fHwxNzYxNDI5MjAzfDA&ixlib=rb-4.1.0&q=85',
    features: ['Vols internationaux', 'Vols nationaux', 'Assistance 24/7', 'Meilleurs tarifs']
  },
  {
    id: 2,
    title: 'Location de voiture',
    icon: 'Car',
    description: 'Louez des véhicules confortables et récents pour vos déplacements',
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBSQVY0fGVufDB8fHx8MTc2MTQyOTIxMnww&ixlib=rb-4.1.0&q=85',
    features: ['Kia K7', 'Toyota RAV4 série 5', 'Hyundai Grandeur', 'Véhicules récents et entretenus']
  },
  {
    id: 3,
    title: 'Organisation de voyages',
    icon: 'MapPin',
    description: 'Voyages sur mesure, circuits, groupes, lune de miel et plus encore',
    image: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB2YWNhdGlvbnxlbnwwfHx8fDE3NjE0MjkyMTd8MA&ixlib=rb-4.1.0&q=85',
    features: ['Voyages sur mesure', 'Circuits organisés', 'Voyages de groupe', 'Lune de miel']
  },
  {
    id: 4,
    title: 'Tourisme',
    icon: 'Compass',
    description: 'Découvrez les destinations les plus prisées avec nos guides expérimentés',
    image: 'https://images.unsplash.com/photo-1645468085508-11d3ee94fcef?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHx0b3VyaXNtJTIwZ3VpZGV8ZW58MHx8fHwxNzYxNDI5MjIyfDA&ixlib=rb-4.1.0&q=85',
    features: ['Guides professionnels', 'Activités variées', 'Destinations populaires', 'Excursions']
  }
];

export const cars = [
  {
    id: 1,
    name: 'Kia K7',
    category: 'Berline de luxe',
    image: 'https://images.unsplash.com/photo-1707407772603-274cc5cf18f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzZWRhbnxlbnwwfHx8fDE3NjE0MjkyMDd8MA&ixlib=rb-4.1.0&q=85',
    features: ['5 places', 'Climatisation', 'Boîte automatique', 'GPS intégré'],
    priceNote: 'Tarif sur demande'
  },
  {
    id: 2,
    name: 'Toyota RAV4 série 5',
    category: 'SUV',
    image: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBSQVY0fGVufDB8fHx8MTc2MTQyOTIxMnww&ixlib=rb-4.1.0&q=85',
    features: ['7 places', 'Climatisation', '4x4', 'Grand coffre'],
    priceNote: 'Tarif sur demande'
  },
  {
    id: 3,
    name: 'Hyundai Grandeur',
    category: 'Berline premium',
    image: 'https://images.unsplash.com/photo-1675923759360-348b03df0d3e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBzZWRhbnxlbnwwfHx8fDE3NjE0MjkyMDd8MA&ixlib=rb-4.1.0&q=85',
    features: ['5 places', 'Sièges cuir', 'Boîte automatique', 'Système audio premium'],
    priceNote: 'Tarif sur demande'
  }
];

export const promotions = [
  {
    id: 1,
    serviceId: 1,
    title: 'Promo vols Paris - Brazzaville',
    description: 'Jusqu\'à -20% sur tous les vols vers Paris',
    discount: '20%',
    validUntil: '2025-03-31',
    active: true
  },
  {
    id: 2,
    serviceId: 2,
    title: 'Location longue durée',
    description: '1 semaine de location = 1 jour offert',
    discount: '1 jour gratuit',
    validUntil: '2025-04-15',
    active: true
  }
];

export const reservations = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+242 06 123 4567',
    service: 'Billets d\'avion',
    destination: 'Paris',
    date: '2025-02-15',
    message: 'Je souhaite réserver un aller-retour pour 2 personnes',
    status: 'pending',
    createdAt: '2025-01-20T10:30:00Z'
  },
  {
    id: 2,
    name: 'Marie Kofi',
    email: 'marie.kofi@example.com',
    phone: '+242 06 987 6543',
    service: 'Location de voiture',
    destination: 'Pointe-Noire',
    date: '2025-02-10',
    message: 'Location RAV4 pour une semaine',
    status: 'pending',
    createdAt: '2025-01-21T14:15:00Z'
  }
];

export const adminUser = {
  email: 'lyontravel948@gmail.com',
  password: 'admin123'
};