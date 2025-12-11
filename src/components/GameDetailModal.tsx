import { useState } from 'react';
import { Game, GameVariant } from '../types';
import { format } from 'date-fns';
import styles from './GameDetailModal.module.css';

interface GameDetailModalProps {
  game: Game;
  onClose: () => void;
  onRequestActivation: (game: Game, variant: GameVariant) => void;
}

export default function GameDetailModal({ game, onClose, onRequestActivation }: GameDetailModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<GameVariant | null>(null);

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
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className={styles.modalActions}>
            {game.marketingAssetsUrl && (
              <a
                href={game.marketingAssetsUrl}
                className={styles.btnOutline}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
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
