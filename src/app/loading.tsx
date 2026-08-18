import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.planetContainer} aria-hidden="true">
        <div className={styles.planet} />
        <div className={styles.ring} />
      </div>
      <div className={styles.text}>Loading...</div>
    </div>
  );
}
