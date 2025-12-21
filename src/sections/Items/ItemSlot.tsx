import React from "react";
import type { Item, EquipmentSlots, NewCharacterData } from "../../types/index";
import { getEquippedItem } from "../../utils/itemUtils";

type SlotType = "equipped" | "inventory";

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
  const iconMap: Record<EquipmentSlots | string, string> = {
    right_hand: "⚔️",
    left_hand: "⚔️",
    armor: "🛡️",
    consumable: "🧪",
    spell_1: "✨",
    spell_2: "✨",
    spell_3: "✨",
    spell_4: "✨"
  };
  return iconMap[slot || ""] || "○";
};

const getItemContent = (item: Item | null | undefined, showQuantity: boolean) => {
  if (!item) return null;
  
  if (item.image) {
    return <img src={item.image} alt={item.name} className="h-full w-full object-contain" />;
  }
  
  return (
    <>
      <div className="text-10px text-ds-text-dim font-bold">{item.type.charAt(0).toUpperCase()}</div>
      {showQuantity && (item.type === "consumable" || item.type === "spell") && item.uses > 1 && (
        <span className="absolute bottom-1 right-2 text-8px text-ds-text-bright bg-black bg-opacity-60 px-1 py-0.5 rounded-2px">
          {item.uses}
        </span>
      )}
    </>
  );
};

const ItemSlot: React.FC<ItemSlotProps> = ({ type, item, characterData, slot, showQuantity = false, onItemClick }) => {
  const currentItem = type === "equipped" && characterData && slot 
    ? getEquippedItem(characterData, slot) 
    : item;

  const isEmpty = !currentItem;
  const isInventory = type === "inventory";
  const baseClasses = "aspect-square bg-ds-stone-medium border border-ds-border-dark relative cursor-pointer transition-all duration-100";
  const interactiveClasses = isInventory && !isEmpty ? "hover:bg-ds-stone-light hover:border-ds-border-gold" : "";

  const handleClick = (e: React.MouseEvent) => {
    if (isInventory && currentItem && onItemClick) {
      e.stopPropagation();
      onItemClick(currentItem);
    }
  };

  if (isInventory && isEmpty) {
    return (
      <div className={baseClasses}>
        <div className="w-full h-full p-2 flex justify-center bg-ds-stone-dark relative" />
      </div>
    );
  }

  if (isInventory) {
    return (
      <div className={`${baseClasses} ${interactiveClasses}`} onClick={handleClick}>
        <div className="w-full h-full p-2 flex justify-center items-center bg-ds-stone-medium relative">
          {getItemContent(currentItem, showQuantity)}
        </div>
      </div>
    );
  }

  return (
    <div className="relative cursor-pointer">
      <div className="ds-item-square">
        <div className="absolute top-2px left-2px right-2px bottom-2px bg-gradient-to-br from-ds-border-gold from-opacity-10 to-transparent rounded-6px pointer-events-none" />
        {currentItem?.image ? (
          <img src={currentItem.image} alt={currentItem.name} className="p-2px w-64px h-full object-contain" />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-ds-stone-medium bg-opacity-50">
            <span className="font-bold text-24px" style={{ textShadow: "0 0 4px rgba(201, 185, 150, 0.2)" }}>
              {getEmptySlotIcon(slot)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemSlot;
