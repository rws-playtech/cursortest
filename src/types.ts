export interface GameVariant {
  id: string;
  name: string;
  description?: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string; // ISO date string
  availableDate: string; // ISO date string - when available to the user
  status: 'upcoming' | 'released' | 'available';
  variants: GameVariant[];
  profileUrl?: string; // Available when released
  marketingAssetsUrl?: string; // Available ~1 week before release
  category?: string;
  features?: string[];
  provider?: string;
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
