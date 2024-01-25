'use client';
import { RadioGroup, RadioItem } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';

import { DropdownColor } from '@/components/Dropdown/DropdownColor';
import { putColor } from '@/lib/api';
import styles from './styles.module.scss';

export function NoteColor(props: { noteId: number, color: string }) {
  const router = useRouter();
  const colors = [
    "#BAE2FF", "#B9FFDD", "#9eff8b", 
    "#FFE8AC", "#FFCAB9", "#F99494", 
    "#ff8eec", "#ECA1FF", "#FFFFFF", 
    "#CDCDCD", "#979797", "#A99A7C",
  ];

  async function handleChange(value: string) {
    await putColor(props.noteId, value)
      .then(() => router.refresh());
  }

  return (
    <DropdownColor>
      <RadioGroup className={styles.radio} value={props.color} onValueChange={handleChange}>
        {colors.map((item, index) => (
          <RadioItem
            key={index}
            className={styles.option}
            style={{ background: item }}
            value={item}
          />
        ))}
      </RadioGroup>
    </DropdownColor>
  );
}