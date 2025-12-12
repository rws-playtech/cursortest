import { useState } from 'react';
import { Game } from '../types';
import { format } from 'date-fns';
import Tooltip from './Tooltip';
import styles from './GameCard.module.css';

interface GameCardProps {
  game: Game;
  onRequestActivation: (game: Game) => void;
}

export default function GameCard({ game, onRequestActivation }: GameCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(game.gameCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isReleaseDateSoon = () => {
    const now = new Date();
    const release = new Date(game.releaseDate);
    const diffDays = Math.ceil((release.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const getStatusBadge = () => {
    if (game.status === 'released') {
      return <span className={`${styles.badge} ${styles.badgeSuccess}`}>Released</span>;
    } else if (isReleaseDateSoon()) {
      return <span className={`${styles.badge} ${styles.badgeWarning}`}>Coming Soon</span>;
    } else {
      return <span className={`${styles.badge} ${styles.badgeInfo}`}>Upcoming</span>;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={game.imageUrl} alt={game.name} />
        <div className={styles.cardImageOverlay}>
          {getStatusBadge()}
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{game.name}</h3>
          <span className={styles.cardCategory}>{game.category}</span>
        </div>

        <div className={styles.cardMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Code:</span>
            <button 
              className={styles.codeButton} 
              onClick={handleCopyCode}
              title="Click to copy"
            >
              {game.gameCode}
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            </button>
            {copied && <span className={styles.copiedMessage}>Copied!</span>}
          </div>
          {game.studio && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Studio:</span>
              <span className={styles.metaValue}>{game.studio}</span>
            </div>
          )}
          {game.theme && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Theme:</span>
              <span className={styles.metaValue}>{game.theme}</span>
            </div>
          )}
          {game.volatility && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Volatility:</span>
              <Tooltip content={getVolatilityTooltip(game.volatility)}>
                <span className={`${styles.metaValue} ${styles.volatilityBadge} ${styles[getVolatilityColor(game.volatility)]}`}>
                  {game.volatility}/5
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ marginLeft: '4px' }}>
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </span>
              </Tooltip>
            </div>
          )}
          {game.jackpot && game.jackpot.hasJackpot && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Jackpot:</span>
              <span className={`${styles.metaValue} ${styles.jackpotBadge}`}>
                {game.jackpot.type || 'Yes'}
              </span>
            </div>
          )}
        </div>

        <p className={styles.cardDescription}>
          {isExpanded ? game.description : `${game.description.substring(0, 100)}...`}
        </p>

        {isExpanded && (
          <div className={styles.cardDetails}>
            {game.features && game.features.length > 0 && (
              <div className={styles.features}>
                <h4 className={styles.detailsTitle}>Features:</h4>
                <div className={styles.featureList}>
                  {game.features.map((feature, index) => (
                    <span key={index} className={styles.featureTag}>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.gameStats}>
              {game.baseCost !== undefined && (
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Base Cost:</span>
                  <span className={styles.statValue}>€{game.baseCost.toLocaleString()}</span>
                </div>
              )}
              {game.maxWinMultiplier !== undefined && (
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Max Win:</span>
                  <span className={styles.statValue}>{game.maxWinMultiplier.toLocaleString()}x</span>
                </div>
              )}
              {game.winDistribution && (
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Win Distribution:</span>
                  <Tooltip content="How often and how much players can expect to win">
                    <span className={styles.statValue}>
                      {game.winDistribution}
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ marginLeft: '4px' }}>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Tooltip>
                </div>
              )}
            </div>

            <div className={styles.dates}>
              <div className={styles.dateItem}>
                <span className={styles.dateLabel}>Release Date:</span>
                <span className={styles.dateValue}>
                  {format(new Date(game.releaseDate), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className={styles.dateItem}>
                <span className={styles.dateLabel}>Available to You:</span>
                <span className={styles.dateValue}>
                  {format(new Date(game.availableDate), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>

            <div className={styles.variants}>
              <span className={styles.variantsLabel}>Variants:</span>
              <span className={styles.variantsCount}>
                {game.variants.length} available
              </span>
            </div>
          </div>
        )}

        <div className={styles.cardActions}>
          <button
            className={styles.btnSecondary}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>

          {game.marketingAssetsUrl ? (
            <a
              href={game.marketingAssetsAvailable ? game.marketingAssetsUrl : undefined}
              className={`${styles.btnOutline} ${!game.marketingAssetsAvailable ? styles.btnDisabled : ''}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => !game.marketingAssetsAvailable && e.preventDefault()}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Marketing Assets
              {!game.marketingAssetsAvailable && <span className={styles.unavailableBadge}>Soon</span>}
            </a>
          ) : null}

          {game.profileUrl && (
            <a
              href={game.profileUrl}
              className={styles.btnOutline}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              View Profile
            </a>
          )}

          <button
            className={styles.btnPrimary}
            onClick={() => onRequestActivation(game)}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Request Activation
          </button>
        </div>
      </div>
    </div>
  );
}

function getVolatilityTooltip(volatility: number): string {
  switch (volatility) {
    case 1:
      return 'Very Low Volatility (1/5) - Very frequent small wins. Minimal risk, steady gameplay.';
    case 2:
      return 'Low Volatility (2/5) - Frequent small wins. Lower risk, steady gameplay.';
    case 3:
      return 'Medium Volatility (3/5) - Balanced mix of win frequency and value. Moderate risk.';
    case 4:
      return 'High Volatility (4/5) - Less frequent wins but higher values. Higher risk, bigger potential.';
    case 5:
      return 'Very High Volatility (5/5) - Rare wins with very high values. Maximum risk and reward potential.';
    default:
      return 'Indicates how often and how much the game pays out.';
  }
}

function getVolatilityColor(volatility: number): string {
  if (volatility <= 2) return 'volatilityLow';
  if (volatility === 3) return 'volatilityMedium';
  if (volatility === 4) return 'volatilityHigh';
  return 'volatilityVeryHigh';
}
