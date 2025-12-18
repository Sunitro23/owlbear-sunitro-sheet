import React from 'react';
import type { NewCharacterData } from '../../types/index';
import { createUnifiedInventory } from '../../utils/itemUtils';
import ItemSection from './ItemSection';

interface InventorySectionProps {
  characterData: NewCharacterData;
  onRefresh?: () => Promise<void>;
}

const InventorySection: React.FC<InventorySectionProps> = ({ characterData, onRefresh }) => {
  const unifiedInventory = createUnifiedInventory(characterData);
  const inventorySlots = unifiedInventory.map((item, index) => ({
    item,
    index,
  }));

  return <ItemSection title='Inventory' layout='grid' slots={inventorySlots} characterData={characterData} showQuantity={true} onRefresh={onRefresh} />;
};

export default InventorySection;
