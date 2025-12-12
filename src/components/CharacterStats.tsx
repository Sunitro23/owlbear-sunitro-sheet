import React, { memo } from 'react';
import StatItem from './StatItem';
import type { CharacterData } from '../api';

interface CharacterStatsProps {
  characterData: CharacterData;
  onUpdateStat: (statName: keyof CharacterData['stats'], field: 'value', newValue: number) => Promise<boolean>;
}

const STATS_CONFIG = [
  { key: 'memory' as const, name: 'Mémoire', iconClass: 'icon icon-attunement' },
  { key: 'endurance' as const, name: 'Endurance', iconClass: 'icon icon-endurance' },
  { key: 'vitality' as const, name: 'Vitalité', iconClass: 'icon icon-vitality' },
  { key: 'strength' as const, name: 'Force', iconClass: 'icon icon-strength' },
  { key: 'dexterity' as const, name: 'Dexterité', iconClass: 'icon icon-dexterity' },
  { key: 'intelligence' as const, name: 'Intelligence', iconClass: 'icon icon-intelligence' },
  { key: 'faith' as const, name: 'Foi', iconClass: 'icon icon-faith' },
  { key: 'luck' as const, name: 'Chance', iconClass: 'icon icon-luck' },
];

const CharacterStats: React.FC<CharacterStatsProps> = ({ 
  characterData, 
  onUpdateStat
}) => {
  const handleValueChange = async (statName: keyof CharacterData['stats'], newValue: number) => {
    await onUpdateStat(statName, 'value', newValue);
  };

  return (
    <section className="section">
      <h2>CARACTÉRISTIQUES</h2>
      <div className="stat-list">
        {STATS_CONFIG.map(({ key, name, iconClass }) => {
          const stat = characterData.stats[key];
          if (!stat) {
            // Skip missing stats to prevent runtime errors
            return null;
          }
          
          return (
            <StatItem 
              key={key}
              iconClass={iconClass} 
              name={name} 
              value={stat.value} 
              modifier={stat.modifier}
              isEditing={true}
              onValueChange={(v) => handleValueChange(key, v)}
              onModifierChange={undefined}
            />
          );
        })}
      </div>
    </section>
  );
};

export default memo(CharacterStats);
