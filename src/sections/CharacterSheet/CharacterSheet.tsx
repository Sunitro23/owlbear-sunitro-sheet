import React from 'react';
import CharacterStats from '../../components/CharacterStats';
import BasePower from '../../components/BasePower';
import CharacterInfo from '../../components/CharacterInfo';
import type { CharacterData } from '../../types';

interface CharacterSheetProps {
  characterData: CharacterData;
  onUpdateStat: (statName: keyof CharacterData['stats'], field: 'value', newValue: number) => Promise<boolean>;
}

const CharacterSheet: React.FC<CharacterSheetProps> = ({ characterData, onUpdateStat }) => {
  return (
    <div className="main-content character-content">
      <div className="left-column">
        <CharacterStats 
          characterData={characterData}
          onUpdateStat={onUpdateStat}
        />
        <BasePower 
          characterData={characterData}
        />
      </div>
      
      <div className="right-column">
        <CharacterInfo characterData={characterData} />
      </div>
    </div>
  );
};

export default CharacterSheet;
