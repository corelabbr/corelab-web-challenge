import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.scss';

interface TooltipProps {
    children: React.ReactNode;
    text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);
    const childRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = (e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

        // Posição inicial (acima do elemento)
        setPosition({
            top: rect.top - 10,
            left: rect.left + rect.width / 2
        });

        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    // Ajusta a posição do tooltip para garantir que ele fique visível na tela
    useEffect(() => {
        if (showTooltip && tooltipRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let newPosition = { ...position };

            // Evita que o tooltip fique cortado na direita
            if (position.left + tooltipRect.width > windowWidth) {
                newPosition.left = windowWidth - tooltipRect.width - 10;
            }

            // Evita que o tooltip fique cortado na esquerda
            if (position.left < 10) {
                newPosition.left = 10;
            }

            // Evita que o tooltip fique cortado em cima
            if (position.top < tooltipRect.height + 10) {
                // Posiciona abaixo do elemento em vez de acima
                if (childRef.current) {
                    const childRect = childRef.current.getBoundingClientRect();
                    newPosition.top = childRect.bottom + 10;
                }
            }

            if (position.top !== newPosition.top || position.left !== newPosition.left) {
                setPosition(newPosition);
            }
        }
    }, [showTooltip, position]);

    return (
        <div
            className="tooltip-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={childRef}
        >
            {children}

            {showTooltip && (
                <div
                    className="tooltip-bubble"
                    ref={tooltipRef}
                    style={{
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                        transform: 'translateX(-50%)'
                    }}
                >
                    {text}
                    <div className="tooltip-arrow"></div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;