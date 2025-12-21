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
    <div className="px-20px pt-0 pb-20px border-b border-ds-border-dark mb-10px">
      <h3 className="ds-section-title">{title}</h3>
      <div className="flex flex-col gap-8px pb-15px">
        {displayData.map((item) => {
          if (type === "stats") {
            return <DataRow key={item.key} label={item.label} icon={item.icon} valueDisplay={{ type: "stat", value: item.value, modifier: item.modifier }} />;
          } else {
            const valueDisplay: { type: "resource"; displayValue: string } = { type: "resource", displayValue: item.displayValue as string };
            return <DataRow key={item.key} label={item.label} icon={item.icon} valueDisplay={valueDisplay} />;
          }
        })}
      </div>
    </div>
  );
};

export const StatsSection: React.FC<{ data: Character }> = ({ data }) => <DataSection title="Stats" data={data} configs={createStatConfigs()} getDisplayData={createStatDisplayData} type="stats" />;

export const ResourcesSection: React.FC<{ data: Character }> = ({ data }) => <DataSection title="Resources" data={data} configs={createResourceConfigs()} getDisplayData={createResourceDisplayData} type="resources" />;
