import React, { useState, memo } from 'react';
import CharacterSheet from './sections/CharacterSheet/CharacterSheet.tsx';
import Items from './sections/Items/Items.tsx';
import MobileTabNavigation from './components/MobileTabNavigation.tsx';
import { useCharacterData } from './hooks/useCharacterData.ts';
import { CharacterSheetWrapper } from './components/CharacterSheetWrapper.tsx';
import type { NewCharacterData } from './types/index';

type TabType = 'equipment' | 'character';

const DesktopLayout: React.FC<{
  characterData: NewCharacterData;
  onCharacterUpdate: (updatedData: NewCharacterData) => void;
  onRefresh: () => Promise<void>;
}> = ({ characterData, onCharacterUpdate, onRefresh }) => (
      <div className="flex w-full">
    {/* Left Panel - Equipment Grid */}
    <div className="equipment-panel-left">
      <div className="equipment-header">
        <div className="equipment-tab-icon">⚔</div>
        <span className="equipment-title">Equipment</span>
        <span className="equipment-subtitle">Select item to equip</span>
      </div>
      <Items characterData={characterData} onCharacterUpdate={onCharacterUpdate} onRefresh={onRefresh} />
    </div>

    {/* Right Panel - Character Stats */}
    <div className="character-panel-right">
      <div className="player-status-section">
        <h3 className="section-title">Player Status</h3>
        <CharacterSheet
          data={characterData.character}
          title=""
        />
      </div>
    </div>
  </div>
);

const MobileLayout: React.FC<{
  characterData: NewCharacterData;
  activeTab: TabType;
  onCharacterUpdate: (updatedData: NewCharacterData) => void;
  onRefresh: () => Promise<void>;
}> = ({ characterData, activeTab, onCharacterUpdate, onRefresh }) => (
  <div className="block flex-1 min-h-[calc(100vh-80px)] lg:hidden">
    {activeTab === 'equipment' && (
      <div className="mobile-panel">
        <div className="equipment-header">
          <div className="equipment-tab-icon">⚔</div>
          <span className="equipment-title">Equipment</span>
          <span className="equipment-subtitle">Select item to equip</span>
        </div>
        <Items characterData={characterData} onCharacterUpdate={onCharacterUpdate} onRefresh={onRefresh} />
      </div>
    )}
    {activeTab === 'character' && (
      <div className="mobile-panel">
        <div className="character-header">
          <h3 className="section-title">Player Status</h3>
        </div>
        <CharacterSheet
          data={characterData.character}
          title=""
        />
      </div>
    )}
  </div>
);

const App: React.FC = () => {
  const { characterData, loading, error, updateCharacterData, refreshCharacterData } = useCharacterData();
  const [activeTab, setActiveTab] = useState<TabType>('equipment');

  const handleCharacterUpdate = async (updatedData: NewCharacterData) => {
    // Update with the provided data immediately for responsiveness
    updateCharacterData(updatedData);
    // Then refresh from API to ensure data consistency
    await refreshCharacterData();
  };

  return (
    <CharacterSheetWrapper loading={loading} error={error} characterData={characterData}>
      <div className="dark-souls-ui">
        {/* Mobile Tab Navigation */}
        <MobileTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <DesktopLayout characterData={characterData!} onCharacterUpdate={handleCharacterUpdate} onRefresh={refreshCharacterData} />
        <MobileLayout characterData={characterData!} activeTab={activeTab} onCharacterUpdate={handleCharacterUpdate} onRefresh={refreshCharacterData} />
      </div>
    </CharacterSheetWrapper>
  );
};



export default memo(App);
