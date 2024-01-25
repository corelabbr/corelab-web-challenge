'use client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';

import styles from './styles.module.scss';

export function DropdownColor(props: DropdownMenu.DropdownMenuContentProps) {

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.trigger} asChild>
        <Image
          src="/icons/color.svg"
          alt="editar cor"
          width={24} height={24}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content} sideOffset={5}>
          {props.children}
          <DropdownMenu.Arrow className={styles.arrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}