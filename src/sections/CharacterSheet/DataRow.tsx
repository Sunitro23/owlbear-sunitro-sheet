import React from 'react';
import { ICON_SIZE } from '../../utils/characterSheetConstants';

// Union type for different value display modes
type ValueDisplay = { type: 'stat'; value: number; modifier: number } | { type: 'resource'; displayValue: string };

interface DataRowProps {
  label: string;
  icon: string;
  valueDisplay: ValueDisplay;
}

export const DataRow: React.FC<DataRowProps> = ({ label, icon, valueDisplay }) => {
  const renderValue = () => {
    switch (valueDisplay.type) {
      case 'stat':
        return (
          <>
            <span className='ds-stat-value'>{valueDisplay.value}</span>
            <span className='ds-stat-modifier'>
              ({valueDisplay.modifier >= 0 ? '+' : ''}
              {valueDisplay.modifier})
            </span>
          </>
        );
      case 'resource':
        return <span className='ds-stat-value'>{valueDisplay.displayValue}</span>;
    }
  };

  return (
    <div className='ds-stat-row'>
      {icon && <img src={icon} alt={label} className='ds-stat-icon' style={ICON_SIZE} />}
      <span className='ds-stat-label'>{label}</span>
      {renderValue()}
    </div>
  );
};

// Legacy exports for backward compatibility (will be removed)
export const StatRow: React.FC<{ label: string; icon: string; value: number; modifier: number }> = (props) => <DataRow label={props.label} icon={props.icon} valueDisplay={{ type: 'stat', value: props.value, modifier: props.modifier }} />;

export const ResourceRow: React.FC<{ label: string; icon: string; displayValue: string }> = (props) => <DataRow label={props.label} icon={props.icon} valueDisplay={{ type: 'resource', displayValue: props.displayValue }} />;
