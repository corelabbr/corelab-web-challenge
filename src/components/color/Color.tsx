
import React from 'react';
import './Color.scss';

interface ColorProps {
    nameColor: string;
    cor: string;
    authentication: () => void;
    showColor: boolean;
}

export default function Color({ nameColor, cor, authentication, showColor }: ColorProps) {
    return (
        <main
            className={`color-ball ${nameColor === 'branco' ? 'color-white' : ''}`}
            style={{ backgroundColor: cor, display: showColor ? 'none' : 'block' }}
            onClick={authentication}
        >
        </main>
    );
}
