import React, { memo, useState, useEffect } from 'react';

interface StatItemProps {
  iconClass: string;
  name: string;
  value: number | string;
  modifier?: number | string;
  isEditing: boolean;
  onValueChange?: (value: number) => void;
  onModifierChange?: (modifier: number) => void;
  disabled?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ 
  iconClass, 
  name, 
  value, 
  modifier, 
  isEditing, 
  onValueChange, 
  onModifierChange: _onModifierChange,
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue);
    if (!isNaN(numValue) && onValueChange) {
      onValueChange(numValue);
    } else if (onValueChange) {
      onValueChange(Number(value));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="stat-item">
      <span className={`stat-icon ${iconClass}`}></span>
      <span className="stat-name">{name}</span>
      <span className="stat-values">
        {isEditing ? (
          <>
            <input
              type="number"
              className="stat-input stat-value-input"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyPress={handleKeyPress}
              disabled={disabled}
              min="0"
              step="1"
            />
            {modifier !== undefined && (
              <>
                <span className="stat-separator">/</span>
                <input
                  type="number"
                  className="stat-input stat-modifier-input"
                  value={modifier}
                  disabled={true}
                  readOnly
                />
              </>
            )}
          </>
        ) : (
          <>
            <span className="stat-value">{value}</span>
            {modifier !== undefined && (
              <>
                <span className="stat-separator">/</span>
                <span className="stat-modifier">{modifier}</span>
              </>
            )}
          </>
        )}
      </span>
    </div>
  );
};

export default memo(StatItem);
