import React from 'react';
import type { NewCharacterData } from '../../types/index';
import ItemSection from './ItemSection';

interface EquippedSectionProps {
  characterData: NewCharacterData;
  onCharacterUpdate?: (updatedData: NewCharacterData) => void;
  onRefresh?: () => Promise<void>;
}

const equippedSlotConfigs = [
  {
    type: 'equipped' as const,
    slot: 'right_hand' as const,
    label: 'Right Hand',
  },
  { type: 'equipped' as const, slot: 'left_hand' as const, label: 'Left Hand' },
  { type: 'equipped' as const, slot: 'armor' as const, label: 'Armor' },
  {
    type: 'equipped' as const,
    slot: 'consumable' as const,
    label: 'Consumable',
  },
  { type: 'equipped' as const, slot: 'spell_1' as const, label: 'Spell 1' },
  { type: 'equipped' as const, slot: 'spell_2' as const, label: 'Spell 2' },
  { type: 'equipped' as const, slot: 'spell_3' as const, label: 'Spell 3' },
  { type: 'equipped' as const, slot: 'spell_4' as const, label: 'Spell 4' },
];

const EquippedSection: React.FC<EquippedSectionProps> = ({ characterData, onCharacterUpdate, onRefresh }) => <ItemSection title='Equipment' layout='row' slots={equippedSlotConfigs} characterData={characterData} onCharacterUpdate={onCharacterUpdate} onRefresh={onRefresh} />;

export default EquippedSection;
