import React from 'react';
import ReactDOM from 'react-dom/client';
import OBR from '@owlbear-rodeo/sdk';
import App from './App';
import './style.css';

const root = document.getElementById('app');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  );
}

OBR.onReady(async () => {
  OBR.contextMenu.create({
    id: "sunito.character-sheet/context-menu",
    icons: [
      {
        icon: "/icon.svg",
        label: "Character Sheet",
        filter: {
          every: [{ key: "layer", value: "CHARACTER" }],
        },
      },
    ],
    onClick(_context) {
      OBR.popover.open({
        id: "sunito.character-sheet/popover",
        url: "/",
        height: 864,
        width: 576,
      });
    },
  });
});
