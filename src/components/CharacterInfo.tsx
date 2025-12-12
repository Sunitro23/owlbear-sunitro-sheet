import React, { memo } from 'react';
import type { CharacterInfoProps } from '../types';

const CharacterInfo: React.FC<CharacterInfoProps> = ({ characterData }) => (
  <div className="portrait-section">
    <div className="portrait-frame">
      <div className="portrait-placeholder">
        <div className="no-image-icon"></div>
      </div>
    </div>
    <h3 className="character-name">{characterData.name}</h3>
    
    <div className="character-info">
      <div className="info-item">
        <span className="info-icon icon icon-level"></span>
        <span className="info-label">Niveau</span>
        <span className="info-value">{characterData.level}</span>
      </div>
      <div className="info-item">
        <span className="info-icon icon icon-hollowing"></span>
        <span className="info-label">Carcasse</span>
        <span className="info-value">{characterData.hollowing}</span>
      </div>
      <div className="info-item">
        <span className="info-icon icon icon-souls"></span>
        <span className="info-label">Âmes</span>
        <span className="info-value">{characterData.souls}</span>
      </div>
    </div>
  </div>
);

export default memo(CharacterInfo);
