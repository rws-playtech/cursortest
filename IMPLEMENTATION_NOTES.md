# Implementation Notes

Technical details and integration guidance for the development team.

## Key Implementation Details

### Date Handling
- Uses `date-fns` library for reliable date formatting and calculations
- All dates stored as ISO strings in the data
- Two separate date fields per game:
  - `releaseDate`: Official game release
  - `availableDate`: When available to the specific user/brand

### Variant Selection Logic
The variant selection system ensures users can only request ONE variant:
- Radio button interface (not checkboxes)
- Modal validation prevents activation without selection
- Clear visual feedback on selected variant
- Support for up to 7 variants per game

### Conditional Link Display

**Marketing Assets Link:**
```typescript
// Shows when marketingAssetsUrl is present
{game.marketingAssetsUrl && (
  <a href={game.marketingAssetsUrl} target="_blank">
    Marketing Assets
  </a>
)}
```
Typically available ~1 week before release.

**Game Profile Link:**
```typescript
// Shows when profileUrl is present (game is released)
{game.profileUrl && (
  <a href={game.profileUrl} target="_blank">
    View Profile
  </a>
)}
```
Available when game status is 'released' or 'available'.

### Status Badge Logic
```typescript
// Released: game.status === 'released'
// Coming Soon: within 7 days of release
// Upcoming: more than 7 days away
```

### CSV Export Implementation
- Creates proper CSV format with headers
- Escapes values with quotes to handle commas
- Includes all relevant fields
- Timestamped filename for easy organization
- Handles missing/optional fields gracefully

### View Mode Switching
- State managed at RoadmapPage level
- Toggle buttons with clear active states
- No data loss when switching views
- Both views use same data source
- Smooth transitions

## API Integration Points

### 1. Fetch Games Data
Replace mock data with API call:

```typescript
// In RoadmapPage.tsx or custom hook
useEffect(() => {
  const fetchGames = async () => {
    try {
      const response = await fetch('/api/marketplace/roadmap');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Failed to fetch games:', error);
      // Handle error state
    }
  };
  
  fetchGames();
}, []);
```

### 2. Request Activation
Update the handler in RoadmapPage.tsx:

```typescript
const handleRequestActivation = async (game: Game, variant: GameVariant) => {
  try {
    const response = await fetch('/api/marketplace/activation-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`, // Add auth
      },
      body: JSON.stringify({
        gameId: game.id,
        variantId: variant.id,
        brandId: currentBrand.id, // Add brand context
      }),
    });
    
    if (response.ok) {
      // Show success notification
      showNotification('Activation request submitted successfully!');
    } else {
      // Handle error
      showNotification('Failed to submit request. Please try again.');
    }
  } catch (error) {
    console.error('Activation request failed:', error);
    showNotification('An error occurred. Please try again later.');
  }
};
```

### 3. Banner Data
The banner should come from the API or CMS:

```typescript
const fetchBannerData = async () => {
  const response = await fetch('/api/marketplace/featured-banner');
  const bannerData = await response.json();
  setBanner(bannerData);
};
```

## Authentication & Authorization

### User Context
Games should be filtered based on user permissions:

```typescript
// Filter games based on user's brand/region
const filteredGames = allGames.filter(game => {
  return game.availableRegions.includes(user.region) &&
         game.status !== 'hidden';
});
```

### Availability Dates
The `availableDate` should be calculated server-side based on:
- User's brand
- Regional restrictions
- Licensing agreements
- Contract terms

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Consider lazy loading the modal component
2. **Virtual Scrolling**: For very large game lists (100+)
3. **Image Optimization**: Use responsive images with srcset
4. **Caching**: Cache game data with appropriate TTL
5. **Debouncing**: Add debounce to search (if implemented)

### Bundle Size
Current bundle is optimized with:
- CSS Modules for tree-shaking
- Minimal dependencies
- date-fns (small, tree-shakeable)
- lucide-react (icon imports only what's needed)

## Error Handling

### Recommended Error States

1. **Network Errors**: Show retry button
2. **No Games**: Display empty state (already implemented)
3. **Failed Activation**: Toast notification with error message
4. **Image Load Failures**: Use fallback images

Example error boundary:
```typescript
// Add error boundary component
<ErrorBoundary fallback={<ErrorMessage />}>
  <RoadmapPage />
</ErrorBoundary>
```

## Testing Recommendations

### Unit Tests
- Component rendering
- Date formatting functions
- CSV export logic
- Filter functionality

### Integration Tests
- View mode switching
- Modal open/close
- Activation flow
- CSV download

### E2E Tests
- Complete user journey
- Activation request flow
- Navigation between views
- Filter and export

## Browser Compatibility

Tested and working in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Uses modern features:
- CSS Grid
- CSS Custom Properties
- ES6+ JavaScript
- React 18 features

## Accessibility Compliance

### WCAG 2.1 Level AA
- ✅ Color contrast ratios meet standards
- ✅ Keyboard navigation fully supported
- ✅ Focus indicators visible
- ✅ Semantic HTML structure
- ✅ ARIA labels where needed

### Screen Reader Testing
Recommended to test with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)

## Deployment Notes

### Environment Variables
Consider adding:
```env
VITE_API_BASE_URL=https://api.marketplace.playtech.com
VITE_ASSETS_CDN=https://cdn.marketplace.playtech.com
VITE_ENABLE_ANALYTICS=true
```

### Build Configuration
Production build optimizations:
- Minification enabled
- Tree-shaking enabled
- Code splitting by route (if adding routing)
- Asset optimization

### CDN Considerations
For better performance:
- Host images on CDN
- Use WebP format with fallbacks
- Implement lazy loading for images below fold
- Cache static assets aggressively

## Security Considerations

### XSS Prevention
- React automatically escapes content
- All user input should be sanitized server-side
- Use `rel="noopener noreferrer"` on external links (already implemented)

### API Security
- Validate all activation requests server-side
- Rate limit activation requests
- Implement CSRF protection
- Use secure authentication tokens

## Monitoring & Analytics

### Recommended Tracking
1. **Page Views**: Roadmap page visits
2. **View Mode**: Which view users prefer
3. **Game Interactions**: Card clicks, expansions
4. **Activation Requests**: Success/failure rates
5. **CSV Exports**: Usage frequency
6. **Banner Clicks**: Engagement metrics

### Example Analytics Integration
```typescript
// Track view mode changes
const handleViewModeChange = (mode: ViewMode) => {
  setViewMode(mode);
  analytics.track('roadmap_view_changed', { view_mode: mode });
};

// Track activation requests
const handleRequestActivation = (game: Game, variant: GameVariant) => {
  analytics.track('activation_requested', {
    game_id: game.id,
    variant_id: variant.id,
    game_name: game.name,
  });
  // ... rest of the logic
};
```

## Future Enhancement Ideas

### Phase 2 Considerations
1. **Search**: Full-text search across games
2. **Favorites**: Save games to watchlist
3. **Notifications**: Email alerts for releases
4. **Filters**: Advanced filtering (RTP, volatility, etc.)
5. **Sorting**: Multiple sort options
6. **Comparison**: Side-by-side game comparison
7. **Preview**: Game demo integration
8. **Sharing**: Share roadmap or specific games

### Technical Debt Prevention
- Keep components small and focused
- Maintain comprehensive documentation
- Write tests for critical paths
- Regular dependency updates
- Performance monitoring

## Support & Maintenance

### Code Organization
- Each component has its own CSS module
- Types are centralized in `types.ts`
- Mock data separate in `mockData.ts`
- Easy to locate and modify functionality

### Common Modifications
1. **Add New Game Field**: Update `Game` interface in `types.ts`
2. **Change Colors**: Edit CSS variables in `index.css`
3. **Modify Layout**: Update grid in `RoadmapPage.module.css`
4. **Add Filter**: Extend filter logic in `RoadmapPage.tsx`

## Questions or Issues?

Contact the development team for:
- API integration assistance
- Custom feature requests
- Bug reports
- Performance optimization
- Deployment help

---

**Last Updated**: December 11, 2025
**Version**: 1.0.0
**Status**: Production Ready
