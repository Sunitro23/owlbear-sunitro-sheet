import React from 'react';
import type { NewCharacterData } from '../../types/index';
import EquippedSection from './EquippedSection';
import InventorySection from './InventorySection';

interface ItemsProps {
  characterData: NewCharacterData;
  onCharacterUpdate?: (updatedData: NewCharacterData) => void;
  onRefresh?: () => Promise<void>;
}

const Items: React.FC<ItemsProps> = ({ characterData, onCharacterUpdate, onRefresh }) => {
  return (
    <div className="ds-equipment-panel">
      <EquippedSection characterData={characterData} onCharacterUpdate={onCharacterUpdate} onRefresh={onRefresh} />
      <InventorySection characterData={characterData} onRefresh={onRefresh} />

      {/* Bottom Controls */}
      <div className="ds-controls">
        <div className="ds-control-hint">
          <span className="ds-button">A</span>
          <span>::OK</span>
        </div>
        <div className="ds-control-hint">
          <span className="ds-button">B</span>
          <span>::Back</span>
        </div>
        <div className="ds-control-hint">
          <span className="ds-button">X</span>
          <span>::Remove</span>
        </div>
        <div className="ds-control-hint">
          <span className="ds-button">Y</span>
          <span>::Switch</span>
        </div>
        <div className="ds-control-hint">
          <span className="ds-button">⚇</span>
          <span>::Simple</span>
        </div>
        <div className="ds-control-hint">
          <span className="ds-button">⌂</span>
          <span>::Help</span>
        </div>
      </div>
    </div>
  );
};

export default Items;
