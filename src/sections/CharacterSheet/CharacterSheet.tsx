import React from 'react';
import type { Character } from '../../types';
import { CharacterPortrait } from './CharacterPortrait';
import { ResourcesSection, StatsSection } from './DataSection';

interface CharacterSheetProps {
  data: Character;
  title?: string;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({ data }) => {
  return (
    <div className='p-0 overflow-y-auto bg-transparent'>
      <CharacterPortrait data={data} />
      <ResourcesSection data={data} />
      <StatsSection data={data} />
    </div>
  );
};

export default CharacterSheet;
