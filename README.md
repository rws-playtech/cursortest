# Marketplace Roadmap - Redesigned

A modern, feature-rich roadmap page for the Playtech Marketplace, showcasing upcoming game releases with enhanced user experience and functionality.

## Features

### Core Functionality
- **Dual View Modes**: Switch between visual grid view and calendar view
- **Interactive Banner**: Clickable featured game banner that navigates to game profiles
- **Game Details**: Expandable game cards with comprehensive information
- **Variant Selection**: Request game activation with choice of up to 7 variants (select only 1)
- **Release Tracking**: View both release dates and brand-specific availability dates
- **Quick Actions**: Direct links to game profiles and marketing assets
- **CSV Export**: Export entire roadmap with all relevant details

### Advanced Filtering (NEW!)
- **Category Filter**: Slots, Table Games, Video Poker, etc.
- **Studio Filter**: Filter by development studio
- **Theme Filter**: Adventure, Fantasy, Mystical, Classic Casino, etc.
- **Volatility Filter**: Low, Medium, High, Very High with tooltips
- **Feature Filter**: Search by specific game features
- **Game Counts**: See number of games in each filter category
- **Clear All**: One-click to reset all filters

### Enhanced Game Information (NEW!)
- **Game Code**: Unique identifier with one-click copy
- **Cost Information**: Base cost and maximum win multiplier
- **Jackpot Info**: Simple Yes/No with jackpot type (Progressive, Fixed, Network)
- **Volatility**: Color-coded badges with detailed tooltips
- **Win Distribution**: Payout pattern descriptions with explanations
- **Studio & Theme**: Development studio and game theme metadata
- **Jurisdictions**: Available regions for each variant

### Marketing Assets (NEW!)
- **Active/Inactive States**: Visual distinction between available and pending assets
- **Status Badges**: "Soon" or "Available Soon" indicators
- **Smart Linking**: Links enabled only when assets are ready

### Calendar Enhancements (NEW!)
- **Date Type Toggle**: Switch between "Release Date" and "Available on My Brand"
- **Clear Visual Distinction**: Understand when games launch vs when you can activate them
- **Flexible Viewing**: See roadmap from different perspectives

### Visual View
- Modern card-based layout with game imagery
- Expandable details showing features, dates, and variants
- Status badges (Released, Coming Soon, Upcoming)
- Hover effects and smooth transitions
- Quick access buttons for profiles and marketing assets

### Calendar View
- 6-month calendar display
- Games shown on release dates
- Visual indicators for game releases
- Monthly game summaries
- Click any game to view details

### Game Detail Modal
- Full-screen modal with comprehensive game information
- Feature list with checkmarks
- Variant selection with radio buttons (choose 1 of up to 7)
- Quick access to marketing assets and game profiles
- Beautiful imagery and modern design

## Design Philosophy

### Maintained Branding
- **Colors**: Playtech primary blue (#00a3e0), secondary navy (#002f6c), and accent orange (#ff6b35)
- **Typography**: System fonts for optimal performance
- **Consistent**: All existing brand colors and styling preserved

### Modern Improvements
- Clean, spacious layout making better use of available space
- Smooth animations and transitions
- Responsive design for all screen sizes
- Accessible and keyboard-friendly
- Professional shadows and depth
- Modern card-based UI patterns

## Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **CSS Modules**: Scoped styling
- **date-fns**: Date formatting and manipulation
- **lucide-react**: Modern icon library

## Getting Started

### Prerequisites
- Node.js 16+ and npm (or yarn/pnpm)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
/workspace/
├── src/
│   ├── components/
│   │   ├── RoadmapPage.tsx           # Main page component
│   │   ├── RoadmapPage.module.css
│   │   ├── Banner.tsx                # Clickable banner component
│   │   ├── Banner.module.css
│   │   ├── GameCard.tsx              # Visual view game card
│   │   ├── GameCard.module.css
│   │   ├── CalendarView.tsx          # Calendar view component
│   │   ├── CalendarView.module.css
│   │   ├── GameDetailModal.tsx       # Game details & variant selection
│   │   └── GameDetailModal.module.css
│   ├── types.ts                      # TypeScript type definitions
│   ├── mockData.ts                   # Sample game data
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Application entry
│   └── index.css                     # Global styles & CSS variables
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Integration with Existing System

### API Integration
Replace the mock data in `src/mockData.ts` with actual API calls:

```typescript
// Example API integration
const fetchGames = async () => {
  const response = await fetch('/api/marketplace/games/roadmap');
  const games: Game[] = await response.json();
  return games;
};
```

### Data Format
The application expects games in this format:

```typescript
interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string;        // ISO date string
  availableDate: string;      // ISO date string
  status: 'upcoming' | 'released' | 'available';
  variants: GameVariant[];
  profileUrl?: string;        // Available when released
  marketingAssetsUrl?: string; // Available ~1 week before
  category?: string;
  features?: string[];
  provider?: string;
}
```

### Activation Request
Update the `handleRequestActivation` function in `RoadmapPage.tsx` to call your API:

```typescript
const handleRequestActivation = async (game: Game, variant: GameVariant) => {
  try {
    await fetch('/api/marketplace/activation-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId: game.id,
        variantId: variant.id,
      }),
    });
    // Show success message
  } catch (error) {
    // Handle error
  }
};
```

## Key Features Implementation

### Two-Date System
Each game displays:
- **Release Date**: When the game is officially released
- **Available Date**: When it becomes available to the specific user/brand

### Variant Selection
- Users can see all available variants (up to 7)
- Can only select ONE variant for activation
- Variant descriptions help users choose the right option
- Radio button interface for clear single-selection

### Marketing Assets
- Link appears when available (typically ~1 week before release)
- Conditional rendering based on `marketingAssetsUrl` presence
- Opens in new tab for easy access

### Game Profiles
- Link appears when game is released
- Direct access to configure games, view demos, get certificates
- Conditional rendering based on `profileUrl` presence

### CSV Export
Exports all roadmap data including:
- Game name, category, provider
- Release and availability dates
- Status
- All variants
- All features
- Profile and marketing asset URLs

## Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --color-primary: #00a3e0;
  --color-secondary: #002f6c;
  --color-accent: #ff6b35;
  /* Add more customizations */
}
```

### Mock Data
Edit `src/mockData.ts` to change sample games and banner content.

### Components
All components are modular and can be customized independently.

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance

- Optimized bundle size with Vite
- Lazy loading of modal components
- CSS modules for scoped styles
- Efficient date calculations with date-fns
- Responsive images

## Accessibility

- Keyboard navigation support
- Focus indicators
- ARIA labels where needed
- Semantic HTML
- Color contrast compliance

## Future Enhancements

Potential additions:
- Search functionality
- More filter options (by provider, features, etc.)
- Sorting options (by date, name, etc.)
- Favorites/watchlist
- Email notifications for releases
- Game comparison feature
- Integration with user preferences

## New Features Documentation

**See detailed documentation in these files:**

- **NEW_FEATURES.md** - Complete list of all new features with examples
- **INTEGRATION_GUIDE.md** - Technical integration guide for developers
- **FEATURES.md** - Feature checklist with implementation status

### Quick Links to Key Features

- Game code with copy functionality
- Advanced multi-filter system
- Volatility and win distribution with tooltips
- Jurisdiction information for variants
- Calendar view with date type toggle
- Marketing assets active/inactive states
- Base cost and maximum win values
- Jackpot information display

## Version History

### Version 2.0.0 (December 2025) - Major Feature Update
- ✨ Added game code with one-click copy
- ✨ Added base cost and maximum win multiplier display
- ✨ Implemented active/inactive states for marketing assets
- ✨ Added jurisdiction information for each variant
- ✨ New filters: Studio, Theme, Volatility, Features
- ✨ Game count badges on all filter buttons
- ✨ Jackpot information with type indicators
- ✨ Volatility display with color coding and tooltips
- ✨ Win distribution information with explanations
- ✨ Calendar date type toggle (Release vs Available)
- ✨ Clear all filters button
- 🎨 Enhanced UI with better information hierarchy
- 📊 Improved data visualization
- ♿ Better accessibility with tooltips

### Version 1.0.0 (December 2025) - Initial Release
- Core roadmap functionality
- Dual view modes (Visual/Calendar)
- Banner, filters, CSV export
- Game cards and detail modal
- Variant selection system

## Support

For questions or issues, please contact the development team.

**Documentation Files:**
- README.md (this file) - Overview and setup
- NEW_FEATURES.md - Detailed feature descriptions
- INTEGRATION_GUIDE.md - API and integration details
- IMPLEMENTATION_NOTES.md - Technical implementation
- FEATURES.md - Feature checklist
- QUICKSTART.md - Quick start guide
- QUICK_START_LOCAL.md - Local setup instructions

## License

Proprietary - Playtech Internal Use Only
