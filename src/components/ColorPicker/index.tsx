import React from 'react';
import styles from './ColorPicker.module.scss';

import { COLORS } from '../../constants/colors';

interface IColorPickerProps {
  onSelectColor: (_color: string) => void;
  selected?: string;
  top?: number;
  left?: number;
  fixed?: boolean;
}

const ColorPicker: React.FC<IColorPickerProps> = ({ onSelectColor, selected, top, left, fixed }) => {
  const style: React.CSSProperties = {};
  if (typeof top === 'number' && typeof left === 'number') {
    style.position = fixed ? 'fixed' : 'absolute';
    style.top = top;
    style.left = left;
    style.zIndex = 9999;
  }
  return (
    <div className={styles.colorPicker} style={style}>
      <div className={styles.colorOptions}>
        <button
          key="clear"
          className={styles.colorOption}
          style={{ border: '1px dashed #ccc', background: 'none', position: 'relative' }}
          onClick={() => onSelectColor('')}
          aria-label="Remover cor"
        >
          <span style={{
            display: 'block',
            width: 16,
            height: 16,
            lineHeight: '16px',
            fontSize: 16,
            color: '#bbb',
            textAlign: 'center',
            pointerEvents: 'none',
            placeSelf: 'center'
          }}>×</span>
        </button>
        {COLORS.map(({ name }) => (
          <button
            key={name}
            className={[
              styles.colorOption,
              styles[name],
              selected === name ? styles.selected : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onSelectColor(name)}
            aria-label={`Select color ${name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
