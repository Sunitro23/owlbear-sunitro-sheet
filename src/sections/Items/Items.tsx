import React from "react";
import type { NewCharacterData } from "../../types/index";
import EquippedSection from "./EquippedSection";
import InventorySection from "./InventorySection";

interface ItemsProps {
  characterData: NewCharacterData;
  onCharacterUpdate?: (updatedData: NewCharacterData) => void;
  onRefresh?: () => Promise<void>;
}

const Items: React.FC<ItemsProps> = ({ characterData, onCharacterUpdate, onRefresh }) => {
  return (
    <div className="flex flex-col h-full p-10px">
      <EquippedSection characterData={characterData} onCharacterUpdate={onCharacterUpdate} onRefresh={onRefresh} />
      <InventorySection characterData={characterData} onRefresh={onRefresh} />

      {/* Bottom Controls */}
      <div className="flex justify-center gap-15px p-10px bg-ds-stone-dark border-t border-ds-border-dark text-11px">
        <div className="ds-control-hint">
          <span className="ds-control-button">A</span>
          <span>::OK</span>
        </div>
        <div className="ds-control-hint">
          <span className="ds-control-button">B</span>
          <span>::Back</span>
        </div>
        <div className="ds-control-hint">
          <span className="ds-control-button">X</span>
          <span>::Remove</span>
        </div>
        <div className="ds-control-hint">
          <span className="ds-control-button">Y</span>
          <span>::Switch</span>
        </div>
        <div className="ds-control-hint">
          <span className="ds-control-button">⚇</span>
          <span>::Simple</span>
        </div>
        <div className="ds-control-hint">
          <span className="ds-control-button">⌂</span>
          <span>::Help</span>
        </div>
      </div>
    </div>
  );
};

export default Items;
