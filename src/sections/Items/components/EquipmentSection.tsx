import React, { memo } from 'react';
import type { Equipment } from '../../../types';

interface EquipmentSectionProps {
  equipment: Equipment;
}

interface DamageType {
  type: string;
  value: string;
}

interface StatusEffect {
  status: string;
  value: string;
}

const EquipmentSection: React.FC<EquipmentSectionProps> = ({ equipment }) => {
  const renderDamageTypes = (damageTypes: DamageType[]) => {
    return damageTypes.map((damage, index) => (
      <div key={index} className="damage-type">
        <span className={`damage-icon icon-${damage.type}`}></span>
        <span className="damage-value">{damage.value}</span>
        <span className="damage-label">{damage.type}</span>
      </div>
    ));
  };

  const renderStatusEffects = (statusEffects: StatusEffect[]) => {
    return statusEffects.map((effect, index) => (
      <div key={index} className="status-effect">
        <span className={`status-icon icon-${effect.status}`}></span>
        <span className="status-value">{effect.value}</span>
        <span className="status-label">{effect.status}</span>
      </div>
    ));
  };

  return (
    <section className="equipment-section">
      <h2>ÉQUIPEMENT</h2>
      
      <div className="equipped-items">
        <div className="equipped-slot main-hand">
          <div className="slot-header">
            <span className="slot-icon icon-weapon"></span>
            <span className="slot-label">Main Principale</span>
          </div>
          {equipment.main_hand && (
            <div className="item-card weapon-card">
              <div className="item-header">
                <span className={`item-icon icon-${equipment.main_hand.type}`}></span>
                <h3 className="item-name">{equipment.main_hand.name}</h3>
              </div>
              <div className="item-details">
                <div className="damage-types">
                  {renderDamageTypes(equipment.main_hand.damage_types)}
                </div>
                {equipment.main_hand.status_effects.length > 0 && (
                  <div className="status-effects">
                    {renderStatusEffects(equipment.main_hand.status_effects)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="equipped-slot off-hand">
          <div className="slot-header">
            <span className="slot-icon icon-shield"></span>
            <span className="slot-label">Main Secondaire</span>
          </div>
          {equipment.off_hand && (
            <div className="item-card shield-card">
              <div className="item-header">
                <span className={`item-icon icon-${equipment.off_hand.type}`}></span>
                <h3 className="item-name">{equipment.off_hand.name}</h3>
              </div>
              <div className="item-details">
                <div className="shield-stats">
                  <div className="shield-type">
                    <span className="shield-type-label">Type:</span>
                    <span className="shield-type-value">{equipment.off_hand.shield_type}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="equipped-slot armor">
          <div className="slot-header">
            <span className="slot-icon icon-armor"></span>
            <span className="slot-label">Armure</span>
          </div>
          {equipment.armor && (
            <div className="item-card armor-card">
              <div className="item-header">
                <span className="item-icon icon-armor"></span>
                <h3 className="item-name">{equipment.armor.name}</h3>
              </div>
              <div className="item-details">
                <div className="armor-types">
                  {equipment.armor.types.map((type: string, index: number) => (
                    <span key={index} className={`armor-type armor-${type}`}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(EquipmentSection);
