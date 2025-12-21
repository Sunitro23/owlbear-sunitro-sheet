import React from "react";
import { PORTRAIT_PLACEHOLDER_ICON } from "../../utils/characterSheetConstants";
import type { Character } from "../../types";

interface CharacterPortraitProps {
  data: Character;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ data }) => {
  const { name, image } = { name: data?.name || "Unknown Character", image: data?.image || "" };

  return (
    <div className="text-center p-20px border-b border-ds-border-dark mb-10px">
      <div className="text-20px font-bold text-ds-text-bright mb-10px uppercase tracking-wider">{name}</div>
      <div className="w-120px h-120px mx-auto border-2 border-ds-border-gold bg-ds-stone-dark flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" style={{ filter: "sepia(0.3) brightness(0.9) contrast(1.1)", background: "var(--ds-stone-dark)" }} />
        ) : (
          <div className="w-full h-full bg-ds-stone-medium flex items-center justify-center">
            <span className="text-48px text-ds-text-dim">{PORTRAIT_PLACEHOLDER_ICON}</span>
          </div>
        )}
      </div>
    </div>
  );
};
