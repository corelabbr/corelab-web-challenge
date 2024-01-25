'use client'
import { useState } from 'react';

import { FadeInDiv } from '@/components/Motion/FadeIn';
import styles from './styles.module.scss';

export default function Text() {
  let value = typeof window !== "undefined" && localStorage.getItem("text");
  const [text, setText] = useState(value ? value : "");

  if (typeof window !== "undefined") {
    localStorage.setItem("text", text);
  }

  return (
    <FadeInDiv>
      <textarea
        className={styles.text}
        value={text}
        onChange={(e: any) => setText(e.target.value)}
        placeholder="Área de texto livre..."
      />
    </FadeInDiv>
  );
}