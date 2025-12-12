import React, { memo } from 'react';
import StatItem from './StatItem';
import type { BasePowerProps } from '../types';

const BASE_POWER_CONFIG = [
  { key: 'hp' as const, name: 'PV', iconClass: 'icon icon-hp' },
  { key: 'ap' as const, name: "Point d'Actions", iconClass: 'icon icon-stamina' },
  { key: 'attunement' as const, name: 'Emplacements de Sorts', iconClass: 'icon icon-slots-used' },
];

const BasePower: React.FC<BasePowerProps> = ({ 
  characterData
}) => (
  <section className="section">
    <h2>PUISSANCE DE BASE</h2>
    <div className="stat-list">
      {BASE_POWER_CONFIG.map(({ key, name, iconClass }) => (
        <StatItem 
          key={key}
          iconClass={iconClass} 
          name={name} 
          value={characterData.basePower[key].value} 
          modifier={characterData.basePower[key].max}
          isEditing={false}
          onValueChange={undefined}
          onModifierChange={undefined}
        />
      ))}
    </div>
  </section>
);

export default memo(BasePower);
