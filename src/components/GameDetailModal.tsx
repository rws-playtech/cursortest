import { useState } from 'react';
import { Game, GameVariant } from '../types';
import { format } from 'date-fns';
import Tooltip from './Tooltip';
import styles from './GameDetailModal.module.css';

interface GameDetailModalProps {
  game: Game;
  onClose: () => void;
  onRequestActivation: (game: Game, variant: GameVariant) => void;
}

export default function GameDetailModal({ game, onClose, onRequestActivation }: GameDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<GameVariant | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(game.gameCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRequestActivation = () => {
    if (selectedVariant) {
      onRequestActivation(game, selectedVariant);
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <svg width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <img src={game.imageUrl} alt={game.name} className={styles.modalImage} />
          <div className={styles.modalHeaderContent}>
            <h2 className={styles.modalTitle}>{game.name}</h2>
            <div className={styles.modalMeta}>
              <span className={styles.modalCategory}>{game.category}</span>
              <span className={styles.modalProvider}>{game.provider}</span>
            </div>
          </div>
        </div>

        <div className={styles.modalBody}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Game Information</h3>
            <div className={styles.gameInfoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Game Code:</span>
                <button 
                  className={styles.copyCodeButton} 
                  onClick={handleCopyCode}
                  title="Click to copy"
                >
                  {game.gameCode}
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                </button>
                {copied && <span className={styles.copiedBadge}>Copied!</span>}
              </div>
              {game.studio && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Studio:</span>
                  <span className={styles.infoValue}>{game.studio}</span>
                </div>
              )}
              {game.theme && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Theme:</span>
                  <span className={styles.infoValue}>{game.theme}</span>
                </div>
              )}
              {game.volatility && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Volatility:</span>
                  <Tooltip content={getVolatilityTooltip(game.volatility)}>
                    <span className={`${styles.infoValue} ${styles.volatilityBadge} ${styles[`volatility${game.volatility.replace(' ', '')}`]}`}>
                      {game.volatility}
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{ marginLeft: '6px' }}>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Tooltip>
                </div>
              )}
              {game.baseCost !== undefined && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Base Cost:</span>
                  <span className={styles.infoValue}>€{game.baseCost.toLocaleString()}</span>
                </div>
              )}
              {game.maxWinMultiplier !== undefined && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Max Win:</span>
                  <span className={styles.infoValue}>{game.maxWinMultiplier.toLocaleString()}x total bet</span>
                </div>
              )}
              {game.jackpot && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Jackpot:</span>
                  <span className={`${styles.infoValue} ${styles.jackpotBadge}`}>
                    {game.jackpot.hasJackpot ? (game.jackpot.type || 'Yes') : 'No'}
                  </span>
                </div>
              )}
              {game.winDistribution && (
                <div className={styles.infoItem} style={{ gridColumn: '1 / -1' }}>
                  <span className={styles.infoLabel}>Win Distribution:</span>
                  <Tooltip content="How often and how much players can expect to win">
                    <span className={styles.infoValue}>
                      {game.winDistribution}
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{ marginLeft: '6px' }}>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </Tooltip>
                </div>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Description</h3>
            <p className={styles.description}>{game.description}</p>
          </section>

          {game.features && game.features.length > 0 && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Features</h3>
              <div className={styles.featureList}>
                {game.features.map((feature, index) => (
                  <div key={index} className={styles.featureItem}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className={styles.featureIcon}>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Release Information</h3>
            <div className={styles.dateInfo}>
              <div className={styles.dateCard}>
                <div className={styles.dateLabel}>Release Date</div>
                <div className={styles.dateValue}>
                  {format(new Date(game.releaseDate), 'MMMM dd, yyyy')}
                </div>
              </div>
              <div className={styles.dateCard}>
                <div className={styles.dateLabel}>Available to You</div>
                <div className={styles.dateValue}>
                  {format(new Date(game.availableDate), 'MMMM dd, yyyy')}
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Select Variant</h3>
            <p className={styles.sectionDescription}>
              Choose ONE variant to request activation for your brand:
            </p>
            <div className={styles.variantList}>
              {game.variants.map((variant) => (
                <div
                  key={variant.id}
                  className={`${styles.variantCard} ${
                    selectedVariant?.id === variant.id ? styles.variantCardSelected : ''
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  <div className={styles.variantRadio}>
                    {selectedVariant?.id === variant.id && (
                      <div className={styles.variantRadioSelected}></div>
                    )}
                  </div>
                  <div className={styles.variantInfo}>
                    <div className={styles.variantName}>{variant.name}</div>
                    {variant.description && (
                      <div className={styles.variantDescription}>
                        {variant.description}
                      </div>
                    )}
                    {variant.jurisdictions && variant.jurisdictions.length > 0 && (
                      <div className={styles.jurisdictions}>
                        <span className={styles.jurisdictionsLabel}>Available in:</span>
                        <div className={styles.jurisdictionTags}>
                          {variant.jurisdictions.map((jurisdiction, idx) => (
                            <span key={idx} className={styles.jurisdictionTag}>
                              {jurisdiction}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.modalActions}>
            {game.marketingAssetsUrl && (
              <a
                href={game.marketingAssetsAvailable ? game.marketingAssetsUrl : undefined}
                className={`${styles.btnOutline} ${!game.marketingAssetsAvailable ? styles.btnDisabled : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => !game.marketingAssetsAvailable && e.preventDefault()}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                Marketing Assets
                {!game.marketingAssetsAvailable && <span className={styles.unavailableBadge}>Available Soon</span>}
              </a>
            )}

            {game.profileUrl && (
              <a
                href={game.profileUrl}
                className={styles.btnOutline}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                View Profile
              </a>
            )}

            <button
              className={styles.btnPrimary}
              onClick={handleRequestActivation}
              disabled={!selectedVariant}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Request Activation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getVolatilityTooltip(volatility: string): string {
  switch (volatility) {
    case 'Low':
      return 'Frequent small wins. Lower risk, steady gameplay.';
    case 'Medium':
      return 'Balanced mix of win frequency and value. Moderate risk.';
    case 'High':
      return 'Less frequent wins but higher values. Higher risk, bigger potential.';
    case 'Very High':
      return 'Rare wins with very high values. Maximum risk and reward potential.';
    default:
      return 'Indicates how often and how much the game pays out.';
  }
}
