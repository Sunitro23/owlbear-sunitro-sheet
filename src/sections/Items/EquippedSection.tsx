import React from "react";
import type { NewCharacterData } from "../../types/index";
import ItemSection from "./ItemSection";

interface EquippedSectionProps {
  characterData: NewCharacterData;
  onCharacterUpdate?: (updatedData: NewCharacterData) => void;
  onRefresh?: () => Promise<void>;
}

const equippedSlotConfigs = [
  { type: "equipped" as const, slot: "right_hand" as const, icon: "⚔️" },
  { type: "equipped" as const, slot: "left_hand" as const, icon: "🗡️" },
  { type: "equipped" as const, slot: "armor" as const, icon: "🛡️" },
  { type: "equipped" as const, slot: "consumable" as const, icon: "🧪" },
  { type: "equipped" as const, slot: "spell_1" as const, icon: "✨" },
  { type: "equipped" as const, slot: "spell_2" as const, icon: "✨" },
  { type: "equipped" as const, slot: "spell_3" as const, icon: "✨" },
  { type: "equipped" as const, slot: "spell_4" as const, icon: "✨" },
];

const EquippedSection: React.FC<EquippedSectionProps> = ({ characterData, onCharacterUpdate, onRefresh }) => <ItemSection title="" layout="row" slots={equippedSlotConfigs} characterData={characterData} onCharacterUpdate={onCharacterUpdate} onRefresh={onRefresh} />;

export default EquippedSection;
