import React, { memo } from 'react';
import type { WeaponItem, ShieldItem } from '../../../types';

interface InventorySectionProps {
  inventory: Array<WeaponItem | ShieldItem>;
}

interface DamageType {
  type: string;
  value: string;
}

const InventorySection: React.FC<InventorySectionProps> = ({ inventory }) => {
  const renderDamageTypes = (damageTypes: DamageType[]) => {
    return damageTypes.map((damage, index) => (
      <div key={index} className="damage-type">
        <span className={`damage-icon icon-${damage.type}`}></span>
        <span className="damage-value">{damage.value}</span>
        <span className="damage-label">{damage.type}</span>
      </div>
    ));
  };

  return (
    <section className="inventory-section">
      <h2>INVENTAIRE</h2>
      <div className="inventory-grid">
        {inventory.map((item: WeaponItem | ShieldItem, index: number) => (
          <div key={index} className="inventory-item">
            <div className="item-header">
              <span className={`item-icon icon-${item.type}`}></span>
              <h4 className="item-name">{item.name}</h4>
            </div>
            <div className="item-details">
              {item.type === 'weapon' && 'damage_types' in item && (
                <div className="damage-types">
                  {renderDamageTypes((item as WeaponItem).damage_types)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(InventorySection);
