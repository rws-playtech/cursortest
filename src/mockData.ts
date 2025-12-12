import { Game, BannerData } from './types';

export const bannerData: BannerData = {
  id: 'banner-1',
  title: 'Hot New Release: Mystic Fortune Deluxe',
  subtitle: 'Experience the ultimate gaming adventure - Available Now!',
  imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop',
  gameId: 'game-1',
  gameProfileUrl: '/marketplace/games/mystic-fortune-deluxe',
};

export const mockGames: Game[] = [
  {
    id: 'game-1',
    gameCode: 'PT-MFD-001',
    name: 'Mystic Fortune Deluxe',
    description: 'An immersive slot game with cascading reels and multiple bonus features. Experience ancient mysticism combined with modern gaming mechanics.',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    releaseDate: '2025-12-01T00:00:00Z',
    availableDate: '2025-12-01T00:00:00Z',
    status: 'released',
    variants: [
      { 
        id: 'var-1-1', 
        name: 'Standard', 
        description: 'Classic gameplay experience',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Isle of Man', 'Sweden']
      },
      { 
        id: 'var-1-2', 
        name: 'High Roller', 
        description: 'Enhanced bet limits for VIP players',
        jurisdictions: ['UK', 'Malta', 'Gibraltar']
      },
      { 
        id: 'var-1-3', 
        name: 'Mobile Optimized', 
        description: 'Optimized for mobile devices',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Isle of Man', 'Sweden', 'Denmark', 'Spain']
      },
    ],
    profileUrl: '/marketplace/games/mystic-fortune-deluxe',
    marketingAssetsUrl: '/marketplace/assets/mystic-fortune-deluxe',
    marketingAssetsAvailable: true,
    category: 'Slots',
    features: ['Cascading Reels', 'Free Spins', 'Multipliers', 'Wild Symbols'],
    provider: 'Playtech',
    studio: 'Origins Studio',
    theme: 'Mystical',
    volatility: 'Medium',
    baseCost: 15000,
    maxWinMultiplier: 5000,
    jackpot: {
      hasJackpot: false,
    },
    winDistribution: 'Balanced - Medium frequency wins with moderate values',
  },
  {
    id: 'game-2',
    gameCode: 'PT-DGM-002',
    name: 'Dragon\'s Gold Megaways',
    description: 'A revolutionary Megaways slot featuring up to 117,649 ways to win. Breathtaking graphics and innovative gameplay mechanics.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
    releaseDate: '2025-12-15T00:00:00Z',
    availableDate: '2025-12-18T00:00:00Z',
    status: 'upcoming',
    variants: [
      { 
        id: 'var-2-1', 
        name: 'Standard', 
        description: 'Classic Megaways experience',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Sweden', 'Denmark']
      },
      { 
        id: 'var-2-2', 
        name: 'Enhanced RTP', 
        description: 'Increased return to player',
        jurisdictions: ['UK', 'Malta']
      },
      { 
        id: 'var-2-3', 
        name: 'Bonus Buy', 
        description: 'Feature to purchase bonus rounds',
        jurisdictions: ['Malta', 'Gibraltar', 'Curacao']
      },
      { 
        id: 'var-2-4', 
        name: 'Jackpot', 
        description: 'Progressive jackpot variant',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Isle of Man']
      },
    ],
    marketingAssetsUrl: '/marketplace/assets/dragons-gold-megaways',
    marketingAssetsAvailable: true,
    category: 'Slots',
    features: ['Megaways', 'Cascading Wins', 'Free Spins', 'Progressive Jackpot'],
    provider: 'Playtech',
    studio: 'Firebird Studios',
    theme: 'Fantasy',
    volatility: 'High',
    baseCost: 22000,
    maxWinMultiplier: 10000,
    jackpot: {
      hasJackpot: true,
      type: 'Progressive',
    },
    winDistribution: 'High variance - Lower frequency with potential for big wins',
  },
  {
    id: 'game-3',
    gameCode: 'PT-RRV-003',
    name: 'Roulette Royal VIP',
    description: 'Premium European Roulette with exclusive VIP features and enhanced betting options for sophisticated players.',
    imageUrl: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=300&fit=crop',
    releaseDate: '2025-12-20T00:00:00Z',
    availableDate: '2025-12-20T00:00:00Z',
    status: 'upcoming',
    variants: [
      { 
        id: 'var-3-1', 
        name: 'Standard VIP', 
        description: 'Enhanced table limits',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Isle of Man', 'Denmark', 'Sweden', 'Spain']
      },
      { 
        id: 'var-3-2', 
        name: 'Ultra VIP', 
        description: 'Unlimited betting for premium players',
        jurisdictions: ['UK', 'Malta', 'Gibraltar']
      },
    ],
    marketingAssetsUrl: '/marketplace/assets/roulette-royal-vip',
    marketingAssetsAvailable: true,
    category: 'Table Games',
    features: ['Live Dealer', 'HD Streaming', 'VIP Tables', 'Special Bets'],
    provider: 'Playtech',
    studio: 'Live Casino Studios',
    theme: 'Classic Casino',
    volatility: 'Low',
    baseCost: 35000,
    maxWinMultiplier: 35,
    jackpot: {
      hasJackpot: false,
    },
    winDistribution: 'Classic roulette odds - Predictable distribution',
  },
  {
    id: 'game-4',
    gameCode: 'PT-BPP-004',
    name: 'Blackjack Perfect Pairs',
    description: 'Classic Blackjack with the exciting Perfect Pairs side bet. Optimized for both desktop and mobile play.',
    imageUrl: 'https://images.unsplash.com/photo-1571988775089-85e3c8e74e6d?w=400&h=300&fit=crop',
    releaseDate: '2025-12-28T00:00:00Z',
    availableDate: '2026-01-05T00:00:00Z',
    status: 'upcoming',
    variants: [
      { 
        id: 'var-4-1', 
        name: 'Standard', 
        description: 'Classic blackjack rules',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Isle of Man', 'Sweden', 'Denmark', 'Spain', 'Italy']
      },
      { 
        id: 'var-4-2', 
        name: 'Multi-hand', 
        description: 'Play up to 5 hands simultaneously',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Sweden']
      },
      { 
        id: 'var-4-3', 
        name: 'VIP', 
        description: 'Higher table limits',
        jurisdictions: ['UK', 'Malta', 'Gibraltar']
      },
    ],
    marketingAssetsAvailable: false,
    category: 'Table Games',
    features: ['Perfect Pairs', 'Multi-hand', '21+3 Side Bet', 'Insurance'],
    provider: 'Playtech',
    studio: 'Live Casino Studios',
    theme: 'Classic Casino',
    volatility: 'Low',
    baseCost: 28000,
    maxWinMultiplier: 30,
    jackpot: {
      hasJackpot: false,
    },
    winDistribution: 'Standard blackjack distribution with side bet variance',
  },
  {
    id: 'game-5',
    gameCode: 'PT-ATQ-005',
    name: 'Aztec Treasure Quest',
    description: 'Embark on an adventure through ancient Aztec temples. Features expanding wilds and a unique pick-and-win bonus game.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop',
    releaseDate: '2026-01-10T00:00:00Z',
    availableDate: '2026-01-15T00:00:00Z',
    status: 'upcoming',
    variants: [
      { 
        id: 'var-5-1', 
        name: 'Standard', 
        description: 'Original gameplay',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Sweden', 'Denmark', 'Spain']
      },
      { 
        id: 'var-5-2', 
        name: 'Enhanced', 
        description: 'Additional bonus features',
        jurisdictions: ['UK', 'Malta', 'Gibraltar']
      },
      { 
        id: 'var-5-3', 
        name: 'Jackpot Edition', 
        description: 'With progressive jackpot',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Isle of Man']
      },
    ],
    marketingAssetsAvailable: false,
    category: 'Slots',
    features: ['Expanding Wilds', 'Pick Bonus', 'Free Spins', 'Gamble Feature'],
    provider: 'Playtech',
    studio: 'Origins Studio',
    theme: 'Adventure',
    volatility: 'Medium',
    baseCost: 18000,
    maxWinMultiplier: 7500,
    jackpot: {
      hasJackpot: true,
      type: 'Fixed',
    },
    winDistribution: 'Medium variance - Regular wins with bonus round potential',
  },
  {
    id: 'game-6',
    gameCode: 'PT-MSP-006',
    name: 'Mega Spin Poker',
    description: 'Play multiple poker hands simultaneously with this fast-paced video poker variant. Multiple game modes available.',
    imageUrl: 'https://images.unsplash.com/photo-1520869309715-5acf2aa3e60d?w=400&h=300&fit=crop',
    releaseDate: '2026-01-18T00:00:00Z',
    availableDate: '2026-01-18T00:00:00Z',
    status: 'upcoming',
    variants: [
      { 
        id: 'var-6-1', 
        name: 'Jacks or Better', 
        description: 'Classic poker variant',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Isle of Man', 'Sweden', 'Denmark', 'Spain', 'Italy', 'Portugal']
      },
      { 
        id: 'var-6-2', 
        name: 'Deuces Wild', 
        description: '2s are wild cards',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Sweden']
      },
      { 
        id: 'var-6-3', 
        name: 'Joker Poker', 
        description: 'Includes joker wild cards',
        jurisdictions: ['Malta', 'Gibraltar', 'Curacao']
      },
      { 
        id: 'var-6-4', 
        name: 'Multi-Game', 
        description: 'All variants in one',
        jurisdictions: ['UK', 'Malta', 'Gibraltar']
      },
    ],
    marketingAssetsAvailable: false,
    category: 'Video Poker',
    features: ['Multi-hand Play', 'Double Up', 'Auto Hold', 'Strategy Guide'],
    provider: 'Playtech',
    studio: 'Digital Games',
    theme: 'Classic Casino',
    volatility: 'Medium',
    baseCost: 12000,
    maxWinMultiplier: 4000,
    jackpot: {
      hasJackpot: false,
    },
    winDistribution: 'Video poker standard distribution - Skill-based variance',
  },
  {
    id: 'game-7',
    gameCode: 'PT-CCA-007',
    name: 'Crystal Cascade',
    description: 'A stunning slot featuring cluster pays and cascading symbols. Watch crystals shatter and create winning combinations.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    releaseDate: '2026-02-01T00:00:00Z',
    availableDate: '2026-02-05T00:00:00Z',
    status: 'upcoming',
    variants: [
      { 
        id: 'var-7-1', 
        name: 'Standard', 
        description: 'Original version',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Isle of Man', 'Sweden', 'Denmark']
      },
      { 
        id: 'var-7-2', 
        name: 'Turbo', 
        description: 'Faster gameplay',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Sweden']
      },
      { 
        id: 'var-7-3', 
        name: 'Max Win', 
        description: 'Enhanced maximum win potential',
        jurisdictions: ['Malta', 'Gibraltar']
      },
    ],
    marketingAssetsAvailable: false,
    category: 'Slots',
    features: ['Cluster Pays', 'Cascading Symbols', 'Multipliers', 'Free Spins'],
    provider: 'Playtech',
    studio: 'Innovation Lab',
    theme: 'Gemstones',
    volatility: 'Very High',
    baseCost: 20000,
    maxWinMultiplier: 15000,
    jackpot: {
      hasJackpot: false,
    },
    winDistribution: 'Very high variance - Rare but significant wins possible',
  },
  {
    id: 'game-8',
    gameCode: 'PT-BAP-008',
    name: 'Baccarat Prestige',
    description: 'Elegant baccarat with multiple camera angles and side bets. The ultimate premium casino experience.',
    imageUrl: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=300&fit=crop',
    releaseDate: '2026-02-14T00:00:00Z',
    availableDate: '2026-02-14T00:00:00Z',
    status: 'upcoming',
    variants: [
      { 
        id: 'var-8-1', 
        name: 'Classic', 
        description: 'Traditional baccarat rules',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Isle of Man', 'Sweden', 'Denmark', 'Spain', 'Italy']
      },
      { 
        id: 'var-8-2', 
        name: 'Speed', 
        description: 'Faster-paced game rounds',
        jurisdictions: ['UK', 'Malta', 'Gibraltar', 'Sweden']
      },
      { 
        id: 'var-8-3', 
        name: 'VIP', 
        description: 'Exclusive high-limit tables',
        jurisdictions: ['UK', 'Malta', 'Gibraltar']
      },
    ],
    marketingAssetsAvailable: false,
    category: 'Table Games',
    features: ['Live Dealer', 'Side Bets', 'Roadmap Display', 'Statistics'],
    provider: 'Playtech',
    studio: 'Live Casino Studios',
    theme: 'Classic Casino',
    volatility: 'Low',
    baseCost: 32000,
    maxWinMultiplier: 8,
    jackpot: {
      hasJackpot: false,
    },
    winDistribution: 'Standard baccarat odds with side bet options',
  },
];
