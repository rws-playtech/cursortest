# Quick Start Guide

Get the redesigned roadmap page up and running in minutes!

## Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open your browser to the URL shown (typically `http://localhost:5173`)

## What You'll See

1. **Featured Banner** - Click to go to the game profile
2. **Filter Controls** - Switch between categories
3. **View Toggle** - Switch between Visual (grid) and Calendar views
4. **Export Button** - Download roadmap data as CSV
5. **Game Cards** - Click "Show More" to expand details
6. **Request Activation** - Opens modal to select variant

## Key Interactions

### Visual View
- **Show More/Less**: Expand/collapse game details
- **Request Activation**: Opens modal to choose 1 of up to 7 variants
- **Marketing Assets**: Access promotional materials (when available)
- **View Profile**: Navigate to game configuration page (when released)

### Calendar View
- Navigate through 6 months of upcoming releases
- Click any game in the calendar to open details
- View monthly summaries below each calendar

### Game Detail Modal
- View complete game information
- See all features with checkmarks
- Compare release date vs. your availability date
- Select ONE variant from the list
- Access marketing assets and game profile
- Request activation for the selected variant

## Next Steps

1. **Replace Mock Data**: Edit `src/mockData.ts` with your API calls
2. **Configure API**: Update activation request handler in `RoadmapPage.tsx`
3. **Customize Styling**: Adjust CSS variables in `src/index.css` (keep brand colors!)
4. **Deploy**: Run `npm run build` and deploy the `dist` folder

## Quick Tips

- All Playtech brand colors are preserved
- The page is fully responsive (works on mobile!)
- CSV export includes ALL game data
- Banner is clickable - very important!
- Users can only request ONE variant per game
- Marketing assets appear ~1 week before release
- Game profiles appear when game is released

## Need Help?

Check the main README.md for detailed documentation, API integration examples, and more.
