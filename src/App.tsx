import React, { useState, memo } from "react";
import { useLocation } from "react-router-dom";
import CharacterSheet from "./sections/CharacterSheet/CharacterSheet";
import Items from "./sections/Items/Items";
import TabNavigation from "./components/TabNavigation";
import { useCharacterData } from "./hooks/useCharacterData";
import { CharacterSheetWrapper } from "./components/CharacterSheetWrapper";
import { extractCharacterId } from "./utils/urlUtils";
import type { NewCharacterData } from "./types/index";

type TabType = "equipment" | "character";

const App: React.FC = () => {
  const location = useLocation();
  const characterId = extractCharacterId(location);
  const { characterData, loading, error, updateCharacterData, refreshCharacterData } = useCharacterData(characterId);
  const [activeTab, setActiveTab] = useState<TabType>("character");

  const handleCharacterUpdate = async (updatedData: NewCharacterData) => {
    updateCharacterData(updatedData);
    await refreshCharacterData();
  };

  return (
    <CharacterSheetWrapper loading={loading} error={error} characterData={characterData}>
      {characterData && (
        <div className="w-screen min-h-screen h-auto bg-ds-bg-dark">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="block flex-1 min-h-[calc(100vh-80px)]">
            {activeTab === "equipment" && (
              <div className="flex-1 bg-ds-bg-panel overflow-y-auto">
                <Items characterData={characterData} onCharacterUpdate={handleCharacterUpdate} onRefresh={refreshCharacterData} />
              </div>
            )}
            {activeTab === "character" && (
              <div className="flex-1 bg-ds-bg-panel overflow-y-auto">
                <CharacterSheet data={characterData.character} title="" />
              </div>
            )}
          </div>
        </div>
      )}
    </CharacterSheetWrapper>
  );
};

export default memo(App);
