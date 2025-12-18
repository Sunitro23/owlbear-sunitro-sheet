import React from 'react';

type TabType = 'equipment' | 'character';

interface MobileTabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const MobileTabNavigation: React.FC<MobileTabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="mobile-tab-navigation">
      <button
        className={`mobile-tab-button ${activeTab === 'equipment' ? 'active' : ''}`}
        onClick={() => onTabChange('equipment')}
      >
        <div className="text-xl mb-1 block">⚔</div>
        <span className="text-xs font-bold uppercase tracking-wider-md">Equipment</span>
      </button>
      <button
        className={`mobile-tab-button ${activeTab === 'character' ? 'active' : ''}`}
        onClick={() => onTabChange('character')}
      >
        <div className="text-xl mb-1 block">👤</div>
        <span className="text-xs font-bold uppercase tracking-wider-md">Character</span>
      </button>
    </div>
  );
};

export default MobileTabNavigation;
