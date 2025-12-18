import React from "react";
import { DataRow } from "./DataRow";
import { createStatConfigs, createStatDisplayData, createResourceConfigs, createResourceDisplayData } from "../../utils/characterSheetUtils";
import type { Character } from "../../types";

interface Config {
  key: string;
  label: string;
  icon: string;
}

interface DataSectionProps<T extends Config> {
  title: string;
  data: Character;
  configs: T[];
  getDisplayData: (data: Character, configs: T[]) => any[];
  type: "stats" | "resources";
}

export const DataSection = <T extends Config>({ title, data, configs, getDisplayData, type }: DataSectionProps<T>) => {
  const displayData = getDisplayData(data, configs);

  return (
    <div className="ds-stats-section">
      <h3 className="ds-section-header">{title}</h3>
      <div className="ds-stats-grid">
        {displayData.map((item) => {
          if (type === "stats") {
            return <DataRow key={item.key} label={item.label} icon={item.icon} valueDisplay={{ type: "stat", value: item.value, modifier: item.modifier }} />;
          } else {
            return (
              <DataRow
                key={item.key}
                label={item.label}
                icon={item.icon}
                valueDisplay={{
                  type: "resource",
                  displayValue: item.displayValue,
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export const StatsSection: React.FC<{ data: Character }> = ({ data }) => <DataSection title="Stats" data={data} configs={createStatConfigs()} getDisplayData={createStatDisplayData} type="stats" />;

export const ResourcesSection: React.FC<{ data: Character }> = ({ data }) => <DataSection title="Resources" data={data} configs={createResourceConfigs()} getDisplayData={createResourceDisplayData} type="resources" />;
