'use client'
import * as Checkbox from '@radix-ui/react-checkbox';
import Image from 'next/image';

import { useState } from 'react';
import styles from './styles.module.scss';

export function CheckboxFavorite(props: Checkbox.CheckboxProps) {
  const [selected, setSelected] = useState(props.defaultChecked)

  return (
    <Checkbox.Root
      {...props}
      name="favorite"
      className={styles.checkbox}
      onClick={() => setSelected(!selected)}
    >
      {!selected &&
        <Image
          className={styles.select}
          src="/icons/star.svg"
          alt="select"
          width={20} height={20}
        />
      }
      <Checkbox.Indicator>
        <Image
          src="/icons/star-fill.svg"
          alt="selected"
          width={20} height={20}
        />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
}