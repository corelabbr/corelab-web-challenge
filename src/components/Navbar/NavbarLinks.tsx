'use client'
import { ScrollText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './styles.module.scss';

export function NavbarLinks() {
  const pathName = usePathname();
  const isNotes = pathName === "/notes";

  return (
    <Link href={isNotes ? "/text" : "/notes"}>
      {isNotes ?
        <Image
          src="/icons/x.svg"
          alt="x"
          width={14} height={14}
        /> :
        <div className={styles.icon}>
          <ScrollText size={18} />
        </div>
      }
    </Link>
  )
}