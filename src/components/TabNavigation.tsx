import React from "react";

type TabType = "equipment" | "character";

interface MobileTabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const getTabButtonClass = (isActive: boolean) => `
  flex-1 flex flex-col items-center justify-center px-8px py-12px 
  bg-ds-stone-medium border-0 border-r border-ds-border-dark 
  text-ds-text-gold cursor-pointer transition-all duration-200 
  hover:bg-ds-stone-light hover:text-ds-text-bright last:border-r-0
  ${isActive ? "bg-ds-bg-panel text-ds-text-bright border-b-3 border-ds-border-gold -mb-2px" : ""}
`;

const TabNavigation: React.FC<MobileTabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "equipment" as TabType, icon: "⚔", label: "Equipment" },
    { id: "character" as TabType, icon: "👤", label: "Character" }
  ];

  return (
    <div className="flex flex-row bg-ds-stone-dark border-b-2 border-ds-border-dark relative z-10">
      {tabs.map(({ id, icon, label }) => (
        <button
          key={id}
          className={getTabButtonClass(activeTab === id)}
          onClick={() => onTabChange(id)}
        >
          <div className="text-xl mb-1 block">{icon}</div>
          <span className="text-xs font-bold uppercase tracking-wider-md">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
