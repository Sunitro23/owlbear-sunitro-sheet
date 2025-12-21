import React from "react";
import { ICON_SIZE } from "../../utils/characterSheetConstants";

// Union type for different value display modes
type ValueDisplay = { type: "stat"; value: number; modifier: number } | { type: "resource"; displayValue: string };

interface DataRowProps {
  label: string;
  icon: string;
  valueDisplay: ValueDisplay;
}

export const DataRow: React.FC<DataRowProps> = ({ label, icon, valueDisplay }) => {
  const renderValue = () => {
    switch (valueDisplay.type) {
      case "stat":
        return (
          <>
            <span className="text-15px font-bold text-ds-text-bright text-right min-w-50px">{valueDisplay.value}</span>
            <span className="text-14px text-ds-text-dim min-w-35px text-right">
              ({valueDisplay.modifier >= 0 ? "+" : ""}
              {valueDisplay.modifier})
            </span>
          </>
        );
      case "resource":
        return <span className="text-15px font-bold text-ds-text-bright text-right min-w-50px">{valueDisplay.displayValue}</span>;
    }
  };

  return (
    <div className="grid grid-cols-[32px_1fr_auto_auto] gap-10px items-center px-8px py-6px bg-ds-stone-medium border border-ds-border-dark transition-bg duration-100 hover:bg-ds-stone-light">
      {icon && <img src={icon} alt={label} className="text-18px text-center text-ds-border-gold" style={ICON_SIZE} />}
      <span className="text-15px text-ds-text-gold text-left">{label}</span>
      {renderValue()}
    </div>
  );
};

// Legacy exports for backward compatibility (will be removed)
export const StatRow: React.FC<{ label: string; icon: string; value: number; modifier: number }> = (props) => <DataRow label={props.label} icon={props.icon} valueDisplay={{ type: "stat", value: props.value, modifier: props.modifier }} />;

export const ResourceRow: React.FC<{ label: string; icon: string; displayValue: string }> = (props) => <DataRow label={props.label} icon={props.icon} valueDisplay={{ type: "resource", displayValue: props.displayValue }} />;
