import { BannerData } from '../types';
import styles from './Banner.module.css';

interface BannerProps {
  data: BannerData;
  onClick: () => void;
}

export default function Banner({ data, onClick }: BannerProps) {
  return (
    <div className={styles.banner} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.bannerImage}>
        <img src={data.imageUrl} alt={data.title} />
        <div className={styles.bannerOverlay}></div>
      </div>
      <div className={styles.bannerContent}>
        <h1 className={styles.bannerTitle}>{data.title}</h1>
        <p className={styles.bannerSubtitle}>{data.subtitle}</p>
        <div className={styles.bannerCta}>
          <span>View Game Details</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}
