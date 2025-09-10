interface FavoriteButtonProps {
  isFavorite: boolean;
  onChange: (isFavorite: boolean) => void;
  size?: number;
  className?: string;
  disabled?: boolean;
}

function FavoriteButton({
  isFavorite,
  onChange,
  size = 24,
  className = "",
  disabled = false,
}: FavoriteButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    onChange(!isFavorite);
  };

  return (
    <button
      onClick={handleClick}
      className={`favorite-btn ${className}`}
      title={isFavorite ? "Remover favorito" : "Adicionar favorito"}
      style={{
        width: size + 16,
        height: size + 16,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      disabled={disabled}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={isFavorite ? "#FFD700" : "none"}
        stroke={isFavorite ? "none" : "#666"}
        strokeWidth="1.5"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </button>
  );
}

export default FavoriteButton;
