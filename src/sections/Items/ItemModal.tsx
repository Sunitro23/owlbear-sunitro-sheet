import React from 'react';
import type { Item, EquipmentSlots, NewCharacterData } from '../../types/index';
import { createTooltipContent, getEquippedItem } from '../../utils/itemUtils';
import { equipItem } from '../../services/characterApi';

interface ItemModalProps {
  item: Item | null;
  characterData: NewCharacterData;
  onClose: () => void;
  onRefresh?: () => Promise<void>;
}

const ItemModal: React.FC<ItemModalProps> = ({ item, characterData, onClose, onRefresh }) => {
  if (!item) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleEquipToSlot = async (slot: EquipmentSlots) => {
    try {
      const currentEquippedItem = getEquippedItem(characterData, slot);
      const willReplace = currentEquippedItem && currentEquippedItem.name !== 'Empty';

      if (willReplace) {
        const confirmed = window.confirm(`Equip ${item.name} to ${slot.replace('_', ' ')}?\n\nThis will unequip ${currentEquippedItem.name}.`);
        if (!confirmed) return;
      }

      await equipItem(1, { item_name: item.name, slot });
      if (onRefresh) await onRefresh();
      onClose();
    } catch (error) {
      console.error('Failed to equip item:', error);
    }
  };

  const getSlotDisplayName = (slot: EquipmentSlots): string => {
    switch (slot) {
      case 'right_hand':
        return 'Right Hand (Primary)';
      case 'left_hand':
        return 'Left Hand (Secondary)';
      case 'armor':
        return 'Body Armor';
      case 'consumable':
        return 'Quick Slot';
      case 'spell_1':
        return 'Spell Slot 1';
      case 'spell_2':
        return 'Spell Slot 2';
      case 'spell_3':
        return 'Spell Slot 3';
      case 'spell_4':
        return 'Spell Slot 4';
      default:
        return slot.replace('_', ' ');
    }
  };

  let availableSlots: EquipmentSlots[] = [];
  if (item.type === 'weapon') availableSlots = ['right_hand', 'left_hand'];
  else if (item.type === 'armor') availableSlots = ['armor'];
  else if (item.type === 'consumable') availableSlots = ['consumable'];
  else if (item.type === 'catalyst') availableSlots = ['right_hand', 'left_hand'];
  else if (item.type === 'spell') availableSlots = ['spell_1', 'spell_2', 'spell_3', 'spell_4'];
  else availableSlots = ['consumable'];

  return (
    <div className='modal-overlay' onClick={handleBackdropClick}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>Item Details</h2>
          <button className='modal-close' onClick={onClose}>
            ×
          </button>
        </div>
        <div className='modal-body'>
          <div className='item-detail-content' dangerouslySetInnerHTML={{ __html: createTooltipContent(item) }} />
          {availableSlots.length > 0 && (
            <div className='equip-section'>
              <h3>Equip Options</h3>
              <div className='equip-buttons'>
                {availableSlots.map((slot) => {
                  const currentEquippedItem = getEquippedItem(characterData, slot);
                  const willReplace = currentEquippedItem && currentEquippedItem.name !== 'Empty';
                  return (
                    <button key={slot} className={`equip-button ${willReplace ? 'replace' : ''}`} onClick={() => handleEquipToSlot(slot)} title={willReplace ? `Replace ${currentEquippedItem.name}` : `Equip to ${getSlotDisplayName(slot)}`}>
                      <div className='equip-button-content'>
                        <span className='equip-slot-name'>{getSlotDisplayName(slot)}</span>
                        {willReplace && <span className='current-equipped-brief'>(current: {currentEquippedItem.name})</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
