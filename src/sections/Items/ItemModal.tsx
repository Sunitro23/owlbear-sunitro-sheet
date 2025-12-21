import React, { useEffect, useRef } from "react";
import type { Item, EquipmentSlots, NewCharacterData } from "../../types/index";
import { createTooltipContent, getEquippedItem } from "../../utils/itemUtils";
import { equipItem } from "../../services/characterApi";

interface ItemModalProps {
  item: Item | null;
  characterData: NewCharacterData;
  onClose: () => void;
  onRefresh?: () => Promise<void>;
}

const ItemModal: React.FC<ItemModalProps> = ({ item, characterData, onClose, onRefresh }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  if (!item) return null;

  // Focus management and keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Tab") {
        // Trap focus within modal
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            // Shift + Tab: if focus is on first element, focus last
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            // Tab: if focus is on last element, focus first
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    // Focus the close button when modal opens
    closeButtonRef.current?.focus();

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleEquipToSlot = async (slot: EquipmentSlots) => {
    try {
      const currentEquippedItem = getEquippedItem(characterData, slot);
      const willReplace = currentEquippedItem && currentEquippedItem.name !== "Empty";

      if (willReplace) {
        const confirmed = window.confirm(`Equip ${item.name} to ${slot.replace("_", " ")}?\n\nThis will unequip ${currentEquippedItem.name}.`);
        if (!confirmed) return;
      }

      await equipItem(characterData.id, { item_name: item.name, slot });
      if (onRefresh) await onRefresh();
      onClose();
    } catch (error) {
      console.error("Failed to equip item:", error);
      alert("Failed to equip item. Please try again.");
    }
  };

  const getSlotDisplayName = (slot: EquipmentSlots): string => {
    switch (slot) {
      case "right_hand":
        return "Right Hand (Primary)";
      case "left_hand":
        return "Left Hand (Secondary)";
      case "armor":
        return "Body Armor";
      case "consumable":
        return "Quick Slot";
      case "spell_1":
        return "Spell Slot 1";
      case "spell_2":
        return "Spell Slot 2";
      case "spell_3":
        return "Spell Slot 3";
      case "spell_4":
        return "Spell Slot 4";
      default:
        return slot.replace("_", " ");
    }
  };

  let availableSlots: EquipmentSlots[] = [];
  if (item.type === "weapon") availableSlots = ["right_hand", "left_hand"];
  else if (item.type === "armor") availableSlots = ["armor"];
  else if (item.type === "consumable") availableSlots = ["consumable"];
  else if (item.type === "catalyst") availableSlots = ["right_hand", "left_hand"];
  else if (item.type === "spell") availableSlots = ["spell_1", "spell_2", "spell_3", "spell_4"];
  else availableSlots = ["consumable"];

  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 flex items-center justify-center z-10001 backdrop-blur-3px" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-modal-title"
      aria-describedby="item-modal-description"
    >
      <div 
        ref={modalRef}
        className="relative bg-gradient-to-br from-ds-stone-dark to-ds-stone-medium border-ds-border-dark rounded-8px max-w-500px w-90% max-h-80vh overflow-y-auto shadow-0 shadow-10px shadow-30px shadow-black shadow-opacity-80 shadow-0 shadow-0 shadow-30px shadow-ds-border-gold shadow-opacity-20 z-10002"
        tabIndex={-1}
      >
        <div className="flex justify-between items-center px-20px py-15px border-b border-ds-border-dark bg-ds-stone-dark rounded-t-6px">
          <h2 id="item-modal-title" className="m-0 text-18px text-ds-text-bright uppercase tracking-wider">
            {item.name}
          </h2>
          <button 
            ref={closeButtonRef}
            className="ds-modal-close-button"
            onClick={onClose}
            aria-label="Close item details"
            title="Close (Esc)"
          >
            ×
          </button>
        </div>
        <div className="px-20px py-20px max-h-60vh overflow-y-auto">
          <div 
            id="item-modal-description"
            className="mb-20px rounded-4px p-15px bg-black bg-opacity-30 border border-ds-border-dark"
            dangerouslySetInnerHTML={{ __html: createTooltipContent(item) }} 
          />
          {availableSlots.length > 0 && (
            <div className="border-t border-ds-border-dark pt-15px mt-15px">
              <h3 className="m-0 mb-15px text-16px text-ds-text-bright uppercase tracking-wider-sm">Equip Options</h3>
              <div className="grid gap-8px">
                {availableSlots.map((slot) => {
                  const currentEquippedItem = getEquippedItem(characterData, slot);
                  const willReplace = currentEquippedItem && currentEquippedItem.name !== "Empty";
                  return (
                    <button 
                      key={slot} 
                      className={`ds-equip-button ${willReplace ? "replace" : ""}`}
                      onClick={() => handleEquipToSlot(slot)}
                      title={willReplace ? `Replace ${currentEquippedItem.name}` : `Equip to ${getSlotDisplayName(slot)}`}
                      aria-label={willReplace ? `Replace ${currentEquippedItem.name} with ${item.name}` : `Equip ${item.name} to ${getSlotDisplayName(slot)}`}
                    >
                      <div className="flex flex-col gap-3px">
                        <span className="font-bold text-14px text-ds-text-bright">{getSlotDisplayName(slot)}</span>
                        {willReplace && <span className="text-11px text-ds-text-dim font-style-italic">(current: {currentEquippedItem.name})</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="mt-20px pt-15px border-t border-ds-border-dark text-12px text-ds-text-dim text-center">
            Use Esc to close • Click outside to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
