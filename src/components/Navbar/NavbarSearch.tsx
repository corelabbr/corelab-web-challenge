'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

import styles from './styles.module.scss';

export function NavbarSearch() {
  const router = useRouter();

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    await new Promise((resolve) => {setTimeout(resolve, 800)})
    router.push(`/search?search=${e.target.value}`)
  }

  return (
    <div className={styles.search}>
      <Image
        src="/icons/search.svg"
        alt="search"
        width={14} height={14}
      />
      <input
        type="text"
        placeholder="Pesquisar notas"
        onChange={handleChange}
      />
    </div>
  )
}