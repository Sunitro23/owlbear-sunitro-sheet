import React, { memo } from 'react';
import type { Spell } from '../../../types';

interface SpellsSectionProps {
  spells: Spell[];
}

interface SpellEffect {
  effect_type: string;
  value: string;
}

const SpellsSection: React.FC<SpellsSectionProps> = ({ spells }) => {
  const renderSpellEffects = (effects: SpellEffect[]) => {
    return effects.map((effect, index) => (
      <div key={index} className="spell-effect">
        <span className={`effect-icon icon-${effect.effect_type}`}></span>
        <span className="effect-value">{effect.value}</span>
        <span className="effect-label">{effect.effect_type}</span>
      </div>
    ));
  };

  return (
    <section className="spells-section">
      <h2>SORTS</h2>
      <div className="spells-grid">
        {spells.map((spell: Spell, index: number) => (
          <div key={index} className="spell-card">
            <div className="spell-header">
              <span className={`spell-icon icon-${spell.spell_type}`}></span>
              <h4 className="spell-name">{spell.name}</h4>
              <span className="spell-type">{spell.spell_type}</span>
            </div>
            <div className="spell-effects">
              {renderSpellEffects(spell.effects)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(SpellsSection);
