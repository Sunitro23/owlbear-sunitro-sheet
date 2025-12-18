import React from 'react';
import type { Character } from '../../types';
import { CharacterPortrait } from './CharacterPortrait';
import { ResourcesSection } from './ResourcesSection';
import { StatsSection } from './StatsSection';

interface CharacterSheetProps {
  data: Character;
  title?: string;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({ data }) => {
  return (
    <div className='ds-character-panel'>
      <CharacterPortrait data={data} />
      <ResourcesSection data={data} />
      <StatsSection data={data} />
    </div>
  );
};

export default CharacterSheet;
