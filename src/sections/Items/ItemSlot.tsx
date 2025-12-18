import React from 'react';
import type { Item, EquipmentSlots, NewCharacterData } from '../../types/index';
import { getEquippedItem } from '../../utils/itemUtils';

type SlotType = 'equipped' | 'inventory';

interface ItemSlotProps {
  type: SlotType;
  item?: Item | null;
  index?: number;
  characterData?: NewCharacterData;
  slot?: EquipmentSlots;
  label?: string;
  showQuantity?: boolean;
  onItemClick?: (item: Item) => void;
}

const getEmptySlotIcon = (slot?: EquipmentSlots): string => {
  switch (slot) {
    case 'right_hand':
    case 'left_hand':
      return '⚔️';
    case 'armor':
      return '🛡️';
    case 'consumable':
      return '🧪';
    case 'spell_1':
    case 'spell_2':
    case 'spell_3':
    case 'spell_4':
      return '✨';
    default:
      return '○';
  }
};

const ItemSlot: React.FC<ItemSlotProps> = ({ type, item, index, characterData, slot, showQuantity = false, onItemClick }) => {
  const equippedItem = type === 'equipped' && characterData && slot ? getEquippedItem(characterData, slot) : item;
  const currentItem = type === 'equipped' ? equippedItem : item;

  if (type === 'inventory' && !currentItem && index !== undefined) {
    return (
      <div className='aspect-square bg-ds-stone-medium border border-ds-border-dark relative cursor-pointer transition-all duration-100'>
        <div className='w-full h-full p-0.5 flex justify-center items-center bg-ds-stone-dark relative'></div>
      </div>
    );
  }

  if (type === 'inventory') {
    return (
      <div
        className='aspect-square bg-ds-stone-medium border border-ds-border-dark relative cursor-pointer transition-all duration-100 hover:bg-ds-stone-light hover:border-ds-border-gold'
        onClick={(e) => {
          e.stopPropagation();
          if (currentItem && onItemClick) onItemClick(currentItem);
        }}>
        <div className='w-full h-full p-0.5 flex justify-center items-center bg-ds-stone-medium relative'>
          {currentItem && currentItem.image ? <img src={currentItem.image} alt={currentItem.name} className='ds-item-icon' /> : currentItem && !currentItem.image ? <div className='ds-item-placeholder'>{currentItem.type.charAt(0).toUpperCase()}</div> : null}
          {currentItem && showQuantity && (currentItem.type === 'consumable' || currentItem.type === 'spell') && currentItem.uses > 1 && <span className='ds-item-quantity'>{currentItem.uses}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className='equipped-slot'>
      <div className='item-square'>
        {currentItem && currentItem.image ? (
          <img src={currentItem.image} alt={currentItem.name} className='item-icon' />
        ) : (
          <div className='empty-slot'>
            <span className='empty-icon'>{getEmptySlotIcon(slot)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemSlot;
