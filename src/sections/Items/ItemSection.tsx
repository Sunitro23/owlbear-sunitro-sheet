import React, { useState } from "react";
import type { NewCharacterData, EquipmentSlots, Item } from "../../types/index";
import ItemSlot from "./ItemSlot";
import ItemModal from "./ItemModal";

interface SlotConfig {
  type: "equipped";
  slot: EquipmentSlots;
  icon: string;
}

interface ItemSectionProps {
  title: string;
  layout: "row" | "grid";
  slots: SlotConfig[] | Array<{ item: any; index: number }>;
  characterData: NewCharacterData;
  showQuantity?: boolean;
  onCharacterUpdate?: (updatedData: NewCharacterData) => void;
  onRefresh?: () => Promise<void>;
}

const getSectionClasses = (layout: "row" | "grid") => ({
  section: layout === "row" 
    ? "mb-25px bg-ds-stone-medium border-ds-border-dark rounded-4px p-25px relative mt-15px"
    : "flex-1 bg-ds-stone-medium border-ds-border-dark rounded-4px p-20px mb-15px overflow-y-auto max-h-full",
  title: layout === "row"
    ? "text-20px font-bold text-ds-text-bright uppercase tracking-wider mb-0 pb-8px border-b border-ds-border-dark bg-ds-stone-dark p-12px m-0 -ml-25px -mr-25px -mt-25px rounded-t-2px"
    : "text-16px font-bold text-ds-text-bright uppercase tracking-wider mb-15px pb-8px bg-ds-stone-dark p-8px m-0 -ml-20px -mr-20px -mt-20px rounded-t-2px border-b border-ds-border-dark",
  container: layout === "row"
    ? "flex gap-20px justify-between items-start"
    : "grid grid-cols-8 gap-2px bg-ds-stone-dark p-10px border border-ds-border-dark rounded-4px relative z-1"
});

const ItemSection: React.FC<ItemSectionProps> = ({ title, layout, slots, characterData, showQuantity = false, onRefresh }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleItemClick = (item: Item) => setSelectedItem(item);
  const handleCloseModal = () => setSelectedItem(null);
  const classes = getSectionClasses(layout);

  const renderSlots = () => {
    if (layout === "row") {
      return (slots as SlotConfig[]).map((slotConfig) => (
        <div key={slotConfig.slot} className="flex flex-col items-center gap-2 flex-1 min-w-0 relative cursor-pointer transition-all duration-200 hover:-translate-y-0.5" title={slotConfig.icon}>
          <div className="text-lg mb-1" style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)" }}>
            {slotConfig.icon}
          </div>
          <ItemSlot type="equipped" characterData={characterData} slot={slotConfig.slot} />
        </div>
      ));
    }

    return (slots as Array<{ item: any; index: number }>).map((slot) => (
      <ItemSlot key={slot.index} type="inventory" item={slot.item} index={slot.index} showQuantity={showQuantity} onItemClick={handleItemClick} />
    ));
  };

  return (
    <div className={classes.section}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.container}>
        {renderSlots()}
      </div>
      {selectedItem && (
        <ItemModal 
          item={selectedItem} 
          characterData={characterData} 
          onClose={handleCloseModal} 
          onRefresh={onRefresh} 
        />
      )}
    </div>
  );
};

export default ItemSection;
