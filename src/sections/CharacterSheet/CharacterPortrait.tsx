import React from 'react';
import { PORTRAIT_PLACEHOLDER_ICON } from '../../utils/characterSheetConstants';
import type { Character } from '../../types';

interface CharacterPortraitProps {
  data: Character;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ data }) => {
  const { name, image } = { name: data?.name || 'Unknown Character', image: data?.image || '' };

  return (
    <div className='ds-character-portrait'>
      <div className='ds-character-name'>{name}</div>
      <div className='ds-portrait-frame'>
        {image ? (
          <img src={image} alt={name} className='ds-portrait-image' />
        ) : (
          <div className='ds-portrait-placeholder'>
            <span className='ds-portrait-icon'>{PORTRAIT_PLACEHOLDER_ICON}</span>
          </div>
        )}
      </div>
    </div>
  );
};
