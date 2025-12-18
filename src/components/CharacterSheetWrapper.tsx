import React from 'react';
import type { NewCharacterData } from '../types/index';

interface CharacterSheetWrapperProps {
  loading: boolean;
  error: string | null;
  characterData: NewCharacterData | null;
  children: React.ReactNode;
}

export const CharacterSheetWrapper: React.FC<CharacterSheetWrapperProps> = ({
  loading,
  error,
  characterData,
  children,
}) => {
  if (loading) {
    return (
      <div className="character-sheet">
        <div className="loading-message">Loading character data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="character-sheet">
        <div className="loading-message">Error: {error}</div>
      </div>
    );
  }

  if (!characterData) {
    return (
      <div className="character-sheet">
        <div className="loading-message">No character data available</div>
      </div>
    );
  }

  return <>{children}</>;
};
