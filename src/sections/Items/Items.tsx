import React from 'react';
import { useCharacterData } from '../../hooks/useCharacterData';
import EquipmentSection from './components/EquipmentSection';
import InventorySection from './components/InventorySection';
import SpellsSection from './components/SpellsSection';

const Items: React.FC = () => {
  const { characterData } = useCharacterData(1);
  
  if (!characterData) {
    return <div>No character data available</div>;
  }

  return (
    <div className="equipment-tab">
      <EquipmentSection equipment={characterData.equipment} />
      <InventorySection inventory={characterData.inventory} />
      <SpellsSection spells={characterData.spells} />
    </div>
  );
};

export default Items;
