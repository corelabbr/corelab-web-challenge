import styles from "@/assets/styles/components/loading.module.sass";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <section className={styles.textContainer}>
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>{" ."}</span>
        <span>.</span>
        <span>.</span>
      </section>
    </div>
  );
}
