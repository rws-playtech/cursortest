import { useState } from 'react';
import { Game, GameVariant, ViewMode } from '../types';
import { mockGames, bannerData } from '../mockData';
import { format } from 'date-fns';
import Banner from './Banner';
import GameCard from './GameCard';
import CalendarView from './CalendarView';
import GameDetailModal from './GameDetailModal';
import styles from './RoadmapPage.module.css';

export default function RoadmapPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('visual');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStudio, setFilterStudio] = useState<string>('all');
  const [filterTheme, setFilterTheme] = useState<string>('all');
  const [filterVolatility, setFilterVolatility] = useState<string>('all');
  const [filterFeature, setFilterFeature] = useState<string>('all');

  // Extract unique values for filters
  const categories = ['all', ...Array.from(new Set(mockGames.map(g => g.category).filter((c): c is string => c !== undefined)))];
  const studios = ['all', ...Array.from(new Set(mockGames.map(g => g.studio).filter((s): s is string => s !== undefined)))];
  const themes = ['all', ...Array.from(new Set(mockGames.map(g => g.theme).filter((t): t is string => t !== undefined)))];
  const volatilities = ['all', '1', '2', '3', '4', '5'];
  const allFeatures = Array.from(new Set(mockGames.flatMap(g => g.features || []))).sort();
  const features = ['all', ...allFeatures];

  // Count games for each filter value
  const getFilterCount = (filterType: string, value: string): number => {
    if (value === 'all') return mockGames.length;
    
    switch (filterType) {
      case 'category':
        return mockGames.filter(g => g.category === value).length;
      case 'studio':
        return mockGames.filter(g => g.studio === value).length;
      case 'theme':
        return mockGames.filter(g => g.theme === value).length;
      case 'volatility':
        return mockGames.filter(g => g.volatility?.toString() === value).length;
      case 'feature':
        return mockGames.filter(g => g.features?.includes(value)).length;
      default:
        return 0;
    }
  };

  // Apply all filters
  const filteredGames = mockGames.filter(game => {
    if (filterCategory !== 'all' && game.category !== filterCategory) return false;
    if (filterStudio !== 'all' && game.studio !== filterStudio) return false;
    if (filterTheme !== 'all' && game.theme !== filterTheme) return false;
    if (filterVolatility !== 'all' && game.volatility?.toString() !== filterVolatility) return false;
    if (filterFeature !== 'all' && !game.features?.includes(filterFeature)) return false;
    return true;
  });

  const handleBannerClick = () => {
    // Navigate to game profile
    window.location.href = bannerData.gameProfileUrl;
  };

  const handleRequestActivation = (game: Game, variant?: GameVariant) => {
    if (variant) {
      // In a real app, this would make an API call
      alert(`Activation requested for:\n\nGame: ${game.name}\nVariant: ${variant.name}\n\nYour request has been submitted for approval.`);
    } else {
      // Open modal to select variant
      setSelectedGame(game);
    }
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = [
      'Game Name',
      'Category',
      'Provider',
      'Release Date',
      'Available Date',
      'Status',
      'Variants',
      'Features',
      'Profile URL',
      'Marketing Assets URL'
    ];

    const rows = mockGames.map(game => [
      game.name,
      game.category || '',
      game.provider || '',
      format(new Date(game.releaseDate), 'yyyy-MM-dd'),
      format(new Date(game.availableDate), 'yyyy-MM-dd'),
      game.status,
      game.variants.map(v => v.name).join('; '),
      game.features?.join('; ') || '',
      game.profileUrl || '',
      game.marketingAssetsUrl || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `roadmap_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Banner */}
        <Banner data={bannerData} onClick={handleBannerClick} />

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerTop}>
            <div>
              <h1 className={styles.pageTitle}>Game Roadmap</h1>
              <p className={styles.pageSubtitle}>
                Explore upcoming game releases and request activation for your brand
              </p>
            </div>
            
            <button className={styles.btnExport} onClick={handleExportCSV}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export CSV
            </button>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.filtersContainer}>
              {/* Category Filter */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="category-filter">Category:</label>
                <select
                  id="category-filter"
                  className={styles.filterSelect}
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Games' : category} ({getFilterCount('category', category)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Studio Filter */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="studio-filter">Studio:</label>
                <select
                  id="studio-filter"
                  className={styles.filterSelect}
                  value={filterStudio}
                  onChange={(e) => setFilterStudio(e.target.value)}
                >
                  {studios.map(studio => (
                    <option key={studio} value={studio}>
                      {studio === 'all' ? 'All Studios' : studio} ({getFilterCount('studio', studio)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Theme Filter */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="theme-filter">Theme:</label>
                <select
                  id="theme-filter"
                  className={styles.filterSelect}
                  value={filterTheme}
                  onChange={(e) => setFilterTheme(e.target.value)}
                >
                  {themes.map(theme => (
                    <option key={theme} value={theme}>
                      {theme === 'all' ? 'All Themes' : theme} ({getFilterCount('theme', theme)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Volatility Filter */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="volatility-filter">Volatility:</label>
                <select
                  id="volatility-filter"
                  className={styles.filterSelect}
                  value={filterVolatility}
                  onChange={(e) => setFilterVolatility(e.target.value)}
                >
                  {volatilities.map(volatility => (
                    <option key={volatility} value={volatility}>
                      {volatility === 'all' ? 'All Levels' : `${volatility}/5`} ({getFilterCount('volatility', volatility)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Feature Filter */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="feature-filter">Feature:</label>
                <select
                  id="feature-filter"
                  className={styles.filterSelect}
                  value={filterFeature}
                  onChange={(e) => setFilterFeature(e.target.value)}
                >
                  {features.map(feature => (
                    <option key={feature} value={feature}>
                      {feature === 'all' ? 'All Features' : feature} ({getFilterCount('feature', feature)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              {(filterCategory !== 'all' || filterStudio !== 'all' || filterTheme !== 'all' || 
                filterVolatility !== 'all' || filterFeature !== 'all') && (
                <button
                  className={styles.clearFiltersButton}
                  onClick={() => {
                    setFilterCategory('all');
                    setFilterStudio('all');
                    setFilterTheme('all');
                    setFilterVolatility('all');
                    setFilterFeature('all');
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Clear All Filters
                </button>
              )}
            </div>

            {/* View Toggle */}
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewButton} ${
                  viewMode === 'visual' ? styles.viewButtonActive : ''
                }`}
                onClick={() => setViewMode('visual')}
                title="Grid View"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Visual
              </button>
              <button
                className={`${styles.viewButton} ${
                  viewMode === 'calendar' ? styles.viewButtonActive : ''
                }`}
                onClick={() => setViewMode('calendar')}
                title="Calendar View"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Games Display */}
        {viewMode === 'visual' ? (
          <div className={styles.gamesGrid}>
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onRequestActivation={handleRequestActivation}
              />
            ))}
          </div>
        ) : (
          <CalendarView
            games={filteredGames}
            onGameClick={setSelectedGame}
          />
        )}

        {/* Empty State */}
        {filteredGames.length === 0 && (
          <div className={styles.emptyState}>
            <svg width="80" height="80" viewBox="0 0 20 20" fill="currentColor" className={styles.emptyIcon}>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h3 className={styles.emptyTitle}>No games found</h3>
            <p className={styles.emptyDescription}>
              Try adjusting your filters to see more games
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
          onRequestActivation={handleRequestActivation}
        />
      )}
    </div>
  );
}
