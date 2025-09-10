import { PRIORITY_OPTIONS, PRIORITY_MAP } from "../constants/priorities";

interface PriorityDropdownProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  ariaLabel?: string;
}

function PriorityDropdown({
  value,
  onChange,
  className = "",
  ariaLabel = "Selecionar prioridade",
}: PriorityDropdownProps) {
  const selectedPriority = PRIORITY_MAP[value] || PRIORITY_MAP[0];

  return (
    <div className={`priority-dropdown-container ${className}`}>
      <select
        value={value}
        onChange={(e) => {
          const newValue = Number(e.target.value);

          if (!isNaN(newValue) && PRIORITY_MAP[newValue]) {
            onChange(newValue);
          }
        }}
        className="priority-dropdown-select"
        style={{
          backgroundColor: selectedPriority.bgColor,
          color: selectedPriority.textColor,
          borderLeft: `4px solid ${selectedPriority.color}`,
        }}
        aria-label={ariaLabel}
      >
        {PRIORITY_OPTIONS.map((option) => {
          const priority = PRIORITY_MAP[option.value];
          return (
            <option
              key={option.value}
              value={option.value}
              style={{
                backgroundColor: priority.bgColor,
                color: priority.textColor,
              }}
            >
              {option.label}
            </option>
          );
        })}
      </select>
      <div
        className="dropdown-arrow"
        aria-hidden="true"
        style={{ color: selectedPriority.textColor }}
      >
        ▼
      </div>
    </div>
  );
}

export default PriorityDropdown;
