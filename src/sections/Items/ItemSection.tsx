import React, { useRef, useState } from 'react';
import type { NewCharacterData, EquipmentSlots, Item } from '../../types/index';
import ItemSlot from './ItemSlot';
import ItemModal from './ItemModal';

interface SlotConfig {
  type: 'equipped';
  slot: EquipmentSlots;
  label: string;
}

interface ItemSectionProps {
  title: string;
  layout: 'row' | 'grid';
  slots: SlotConfig[] | Array<{ item: any; index: number }>;
  characterData: NewCharacterData;
  showQuantity?: boolean;
  onCharacterUpdate?: (updatedData: NewCharacterData) => void;
  onRefresh?: () => Promise<void>;
}

const ItemSection: React.FC<ItemSectionProps> = ({ title, layout, slots, characterData, showQuantity = false, onRefresh }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const sectionClass = layout === 'row' ? 'ds-equipped-section' : 'ds-inventory-section';
  const titleClass = layout === 'row' ? 'ds-equipped-title' : 'ds-inventory-title';
  const containerClass = layout === 'row' ? 'ds-equipped-row' : 'ds-inventory-grid';

  return (
    <div className={sectionClass} ref={sectionRef}>
      <h3 className={titleClass}>{title}</h3>
      <div className={containerClass}>
        {layout === 'row'
          ? (slots as SlotConfig[]).map((slotConfig) => (
              <div key={slotConfig.slot} className='flex flex-col items-center gap-2 flex-1 min-w-0 relative cursor-pointer transition-all duration-200 hover:-translate-y-0.5' title={slotConfig.label}>
                <div className='text-sm font-bold text-ds-text-gold uppercase tracking-wider-md text-center mb-1 whitespace-nowrap overflow-hidden text-ellipsis w-full' style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
                  {slotConfig.label}
                </div>
                <ItemSlot type='equipped' characterData={characterData} slot={slotConfig.slot} label={slotConfig.label} />
              </div>
            ))
          : (slots as Array<{ item: any; index: number }>).map((slot) => <ItemSlot key={slot.index} type='inventory' item={slot.item} index={slot.index} showQuantity={showQuantity} onItemClick={handleItemClick} />)}
      </div>
      {isModalOpen && selectedItem && <ItemModal item={selectedItem} characterData={characterData} onClose={handleCloseModal} onRefresh={onRefresh} />}
    </div>
  );
};

export default ItemSection;
