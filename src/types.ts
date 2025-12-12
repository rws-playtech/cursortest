export interface GameVariant {
  id: string;
  name: string;
  description?: string;
  jurisdictions: string[]; // Available jurisdictions for this variant
}

export interface JackpotInfo {
  hasJackpot: boolean;
  type?: 'Progressive' | 'Fixed' | 'Network';
}

export interface Game {
  id: string;
  gameCode: string; // Unique game code (copiable)
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string; // ISO date string
  availableDate: string; // ISO date string - when available to the user
  status: 'upcoming' | 'released' | 'available';
  variants: GameVariant[];
  profileUrl?: string; // Available when released
  marketingAssetsUrl?: string; // Available ~1 week before release
  marketingAssetsAvailable: boolean; // Whether marketing assets are ready
  category?: string;
  features?: string[];
  provider?: string;
  studio?: string; // Development studio
  theme?: string; // Game theme
  volatility?: 'Low' | 'Medium' | 'High' | 'Very High';
  baseCost?: number; // Base cost in currency
  maxWinMultiplier?: number; // Maximum win as multiplier of total bet (e.g., 5000x)
  jackpot?: JackpotInfo;
  winDistribution?: string; // e.g., "Balanced", "High frequency, low value", "Low frequency, high value"
}

export interface BannerData {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  gameId: string;
  gameProfileUrl: string;
}

export type ViewMode = 'visual' | 'calendar';
