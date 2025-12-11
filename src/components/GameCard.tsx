import { useState } from 'react';
import { Game } from '../types';
import { format } from 'date-fns';
import styles from './GameCard.module.css';

interface GameCardProps {
  game: Game;
  onRequestActivation: (game: Game) => void;
}

export default function GameCard({ game, onRequestActivation }: GameCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
              <h4 className={styles.detailsTitle}>Available Variants:</h4>
              <p className={styles.variantsCount}>
                {game.variants.length} variant{game.variants.length !== 1 ? 's' : ''} available
              </p>
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

          {game.marketingAssetsUrl && (
            <a
              href={game.marketingAssetsUrl}
              className={styles.btnOutline}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Marketing Assets
            </a>
          )}

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
