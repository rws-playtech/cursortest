# Integration Guide for New Features

Quick reference for integrating the enhanced roadmap into your existing system.

## API Changes Required

### Update Game Model

Add these fields to your Game model/schema:

```typescript
{
  // NEW REQUIRED FIELDS
  gameCode: string,                    // e.g., "PT-MFD-001"
  marketingAssetsAvailable: boolean,   // true/false
  
  // NEW OPTIONAL FIELDS  
  studio: string,                      // e.g., "Origins Studio"
  theme: string,                       // e.g., "Mystical"
  volatility: 'Low' | 'Medium' | 'High' | 'Very High',
  baseCost: number,                    // in euros
  maxWinMultiplier: number,            // e.g., 5000 for 5000x
  winDistribution: string,             // descriptive text
  
  // NEW JACKPOT OBJECT
  jackpot: {
    hasJackpot: boolean,
    type?: 'Progressive' | 'Fixed' | 'Network'
  }
}
```

### Update Variant Model

Add jurisdictions array to each variant:

```typescript
{
  // EXISTING FIELDS
  id: string,
  name: string,
  description: string,
  
  // NEW FIELD
  jurisdictions: string[]  // e.g., ['UK', 'Malta', 'Gibraltar']
}
```

---

## Database Migration Example

```sql
-- Add new columns to games table
ALTER TABLE games 
  ADD COLUMN game_code VARCHAR(20) NOT NULL UNIQUE,
  ADD COLUMN marketing_assets_available BOOLEAN DEFAULT false,
  ADD COLUMN studio VARCHAR(100),
  ADD COLUMN theme VARCHAR(50),
  ADD COLUMN volatility VARCHAR(20),
  ADD COLUMN base_cost DECIMAL(10,2),
  ADD COLUMN max_win_multiplier INTEGER,
  ADD COLUMN win_distribution TEXT,
  ADD COLUMN has_jackpot BOOLEAN DEFAULT false,
  ADD COLUMN jackpot_type VARCHAR(20);

-- Add index on game_code for fast lookups
CREATE INDEX idx_games_game_code ON games(game_code);

-- Create junction table for variant jurisdictions
CREATE TABLE variant_jurisdictions (
  variant_id INT REFERENCES variants(id),
  jurisdiction VARCHAR(50),
  PRIMARY KEY (variant_id, jurisdiction)
);
```

---

## API Endpoint Updates

### GET /api/roadmap

**Response should include:**

```json
{
  "games": [
    {
      "id": "game-1",
      "gameCode": "PT-MFD-001",
      "name": "Mystic Fortune Deluxe",
      "description": "...",
      "imageUrl": "...",
      "releaseDate": "2025-12-01T00:00:00Z",
      "availableDate": "2025-12-01T00:00:00Z",
      "status": "released",
      "category": "Slots",
      "provider": "Playtech",
      
      "studio": "Origins Studio",
      "theme": "Mystical",
      "volatility": "Medium",
      "baseCost": 15000,
      "maxWinMultiplier": 5000,
      "winDistribution": "Balanced - Medium frequency wins",
      
      "jackpot": {
        "hasJackpot": false
      },
      
      "marketingAssetsUrl": "/assets/mystic-fortune",
      "marketingAssetsAvailable": true,
      "profileUrl": "/games/mystic-fortune-deluxe",
      
      "features": ["Cascading Reels", "Free Spins"],
      
      "variants": [
        {
          "id": "var-1",
          "name": "Standard",
          "description": "Classic gameplay",
          "jurisdictions": ["UK", "Malta", "Gibraltar"]
        }
      ]
    }
  ]
}
```

---

## Code Generation Scripts

### Generate Game Codes

```python
def generate_game_code(provider_code, category_code, sequence):
    """
    Generate unique game code
    Format: {PROVIDER}-{CATEGORY}-{SEQUENCE}
    Example: PT-MFD-001
    """
    return f"{provider_code}-{category_code}-{sequence:03d}"

# Usage
game_code = generate_game_code('PT', 'MFD', 1)  # PT-MFD-001
```

### Calculate Max Win Multiplier

```python
def calculate_max_win(max_payout, min_bet):
    """
    Calculate maximum win as multiplier of total bet
    """
    return int(max_payout / min_bet)

# Example
max_win = calculate_max_win(50000, 10)  # 5000x
```

---

## Populating New Data

### 1. Game Codes
- Auto-generate for existing games
- Use format: `{PROVIDER_CODE}-{GAME_INITIALS}-{SEQ}`
- Ensure uniqueness

### 2. Studios
Map existing data or add manually:
```
Playtech → Origins Studio, Firebird Studios, etc.
```

### 3. Themes
Categorize games:
```
Adventure, Fantasy, Mystical, Classic Casino, etc.
```

### 4. Volatility
Assign based on game math:
```
RTP + Variance analysis → Low/Medium/High/Very High
```

### 5. Costs
From integration/licensing data:
```
baseCost = integration_cost
```

### 6. Jurisdictions
From certification database:
```
variant.jurisdictions = [...active_certifications]
```

---

## Marketing Assets Sync

Implement logic to set `marketingAssetsAvailable`:

```javascript
function checkMarketingAssetsAvailability(game) {
  const releaseDate = new Date(game.releaseDate);
  const now = new Date();
  const daysUntilRelease = Math.ceil((releaseDate - now) / (1000*60*60*24));
  
  // Available if:
  // 1. Game is released, OR
  // 2. Within 7 days of release AND assets are uploaded
  
  if (game.status === 'released') {
    return true;
  }
  
  if (daysUntilRelease <= 7 && daysUntilRelease >= 0) {
    return assetsExistInCMS(game.id);
  }
  
  return false;
}
```

---

## Frontend Integration

### Replace Mock Data

In `src/mockData.ts`, change to:

```typescript
// Remove mockGames export
// Add API fetching

export async function fetchGames(): Promise<Game[]> {
  const response = await fetch('/api/marketplace/roadmap');
  const data = await response.json();
  return data.games;
}
```

### Update RoadmapPage

```typescript
// In RoadmapPage.tsx
import { useEffect, useState } from 'react';
import { fetchGames } from '../mockData';

export default function RoadmapPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchGames()
      .then(setGames)
      .finally(() => setLoading(false));
  }, []);
  
  // ... rest of component
}
```

---

## Testing

### Test Data

Ensure you have games with:
- ✅ Different volatility levels
- ✅ Mix of jackpot/non-jackpot
- ✅ Various studios and themes
- ✅ Different release/available dates
- ✅ Available and unavailable marketing assets
- ✅ Multiple variants with different jurisdictions

### Edge Cases

Test these scenarios:
1. Game with no variants (should show error)
2. Game with 7 variants (max UI can handle)
3. Variant with 10+ jurisdictions (should wrap properly)
4. Very long game descriptions
5. Special characters in game codes
6. Future dates far in advance
7. All filters applied simultaneously
8. No games matching filter criteria

---

## Common Issues & Solutions

### Issue: Copy button doesn't work
**Solution**: Ensure HTTPS or localhost (Clipboard API requirement)

### Issue: Tooltips don't show
**Solution**: Check z-index conflicts with other UI elements

### Issue: Filters show wrong counts
**Solution**: Verify data types match (string vs enum)

### Issue: Jurisdictions don't display
**Solution**: Ensure jurisdictions is an array, not comma-separated string

### Issue: Calendar shows wrong dates
**Solution**: Verify dates are ISO 8601 format with timezone

---

## Performance Optimization

### For Large Datasets (100+ games)

1. **Implement Pagination**
```typescript
const [page, setPage] = useState(1);
const gamesPerPage = 20;
const paginatedGames = filteredGames.slice(
  (page - 1) * gamesPerPage,
  page * gamesPerPage
);
```

2. **Virtual Scrolling for Calendar**
Use libraries like `react-window` for large date ranges

3. **Debounce Filter Changes**
```typescript
const debouncedFilter = useMemo(
  () => debounce((value) => setFilter(value), 300),
  []
);
```

4. **Memoize Filter Results**
```typescript
const filteredGames = useMemo(() => {
  return games.filter(/* filter logic */);
}, [games, ...filterStates]);
```

---

## Security Considerations

1. **Sanitize Game Codes** before copying (XSS prevention)
2. **Validate Jurisdiction Data** server-side
3. **Rate Limit** activation requests
4. **Authenticate** marketing assets access
5. **Validate** CSV export permissions

---

## Deployment Steps

1. ✅ Run database migrations
2. ✅ Populate new game data fields
3. ✅ Update API endpoints
4. ✅ Deploy frontend build
5. ✅ Test activation request flow
6. ✅ Verify CSV export
7. ✅ Check all filters work
8. ✅ Test on mobile devices
9. ✅ Monitor error logs
10. ✅ Gather user feedback

---

## Support & Troubleshooting

### Logs to Monitor

```
- Game activation requests
- Filter usage patterns
- Copy button clicks
- CSV export frequency
- Marketing assets access
- Jurisdiction mismatches
```

### Analytics Events

```javascript
// Track these events
analytics.track('roadmap_filter_used', { filterType, value });
analytics.track('game_code_copied', { gameCode });
analytics.track('calendar_date_type_switched', { dateType });
analytics.track('variant_selected', { gameId, variantId });
analytics.track('csv_exported', { gameCount });
```

---

## Rollback Plan

If issues arise:

1. Frontend can fall back to old version
2. New API fields are optional (backward compatible)
3. Keep old `/api/roadmap` endpoint active
4. Use feature flags to toggle new UI

---

**Need help?** Check IMPLEMENTATION_NOTES.md for technical details.

Last Updated: December 11, 2025
