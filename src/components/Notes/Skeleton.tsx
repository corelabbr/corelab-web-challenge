import styles from './styles.module.scss';

export function NotesSkeleton() {
  return (
    <div className={styles.list}>
      {[...Array(3)].map((note, index) => (
        <div className={styles.skeleton} key={index}>
          <hr />
        </div>
      ))}
    </div>
  );
}