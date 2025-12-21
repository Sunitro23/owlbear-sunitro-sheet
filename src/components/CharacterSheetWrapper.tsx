import React from "react";
import type { NewCharacterData } from "../types/index";

interface CharacterSheetWrapperProps {
  loading: boolean;
  error: string | null;
  characterData: NewCharacterData | null;
  children: React.ReactNode;
}

export const CharacterSheetWrapper: React.FC<CharacterSheetWrapperProps> = ({ loading, error, characterData, children }) => {
  if (loading) {
    return (
      <div className="ds-loading-screen" role="status" aria-live="polite">
        <div className="flex flex-col items-center gap-15px p-20px bg-ds-stone-dark border border-ds-border-dark rounded-8px">
          <div className="w-40px h-40px border-4 border-ds-border-gold border-t-ds-accent-red rounded-full animate-spin" aria-hidden="true"></div>
          <div className="text-16px text-ds-text-bright font-medium">
            Loading character data...
          </div>
          <div className="text-12px text-ds-text-dim">
            Please wait while we fetch your character information
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ds-loading-screen" role="alert">
        <div className="flex flex-col items-center gap-15px p-20px bg-ds-stone-dark border border-ds-accent-red rounded-8px">
          <div className="w-40px h-40px border-4 border-ds-accent-red border-t-transparent rounded-full" aria-hidden="true"></div>
          <div className="text-16px text-ds-text-bright font-medium text-center">
            Error Loading Character
          </div>
          <div className="text-14px text-ds-text-dim text-center max-w-300px">
            {error}
          </div>
          <button 
            className="ds-button ds-button-primary mt-10px"
            onClick={() => window.location.reload()}
            aria-label="Retry loading character data"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!characterData) {
    return (
      <div className="ds-loading-screen" role="status">
        <div className="flex flex-col items-center gap-15px p-20px bg-ds-stone-dark border border-ds-border-dark rounded-8px">
          <div className="text-48px" aria-hidden="true">👤</div>
          <div className="text-16px text-ds-text-bright font-medium">
            No Character Data
          </div>
          <div className="text-12px text-ds-text-dim text-center max-w-300px">
            This character token doesn't have associated character data yet. 
            Please ensure the character exists in your campaign.
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
