import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import OBR from "@owlbear-rodeo/sdk";
import App from "./App";
import "./style.css";

const root = document.getElementById("app");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

OBR.onReady(async () => {
  // Get current metadata to restore popovers on extension reload
  const metadata = await OBR.player.getMetadata();
  const openPopovers = metadata["sunito.character-sheet/openPopovers"] as string[] || [];
  
  // Restore any previously open popovers
  for (const popoverId of openPopovers) {
    // Extract character ID from popover ID format: "sunito.character-sheet/popover-{characterId}"
    const characterId = popoverId.replace('sunito.character-sheet/popover-', '');
    const url = characterId ? `/character/${characterId}` : "/";
    
    // Try to restore popover with retry logic
    let success = false;
    let attempts = 0;
    const maxAttempts = 2;
    
    while (!success && attempts < maxAttempts) {
      try {
        await OBR.popover.open({ 
          id: popoverId, 
          url, 
          height: 864, 
          width: 576
        });
        success = true;
      } catch (error) {
        attempts++;
        console.warn(`Failed to restore popover ${popoverId} (attempt ${attempts}/${maxAttempts}):`, error);
        
        if (attempts < maxAttempts) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 300));
        } else {
          console.warn(`Popover ${popoverId} could not be restored. User may need to manually reopen it.`);
        }
      }
    }
  }

  // Create context menu for character tokens
  OBR.contextMenu.create({
    id: "sunito.character-sheet/context-menu",
    icons: [{ 
      icon: "/icon.svg", 
      label: "Character Sheet",
      filter: { every: [{ key: "layer", value: "CHARACTER" }] }
    }],
    onClick: async (context) => {
      const characterId = context.items[0]?.id;
      const url = characterId ? `/character/${characterId}` : "/";
      const popoverId = `sunito.character-sheet/popover${characterId ? `-${characterId}` : ""}`;
      
      try {
        // Check if popover is already open and toggle it
        const metadata = await OBR.player.getMetadata();
        const openPopovers = metadata["sunito.character-sheet/openPopovers"] as string[] || [];
        const isCurrentlyOpen = openPopovers.includes(popoverId);
        
        if (isCurrentlyOpen) {
          // Close the popover if it's already open
          await OBR.popover.close(popoverId);
          await updateOpenPopoversMetadata(popoverId, false);
        } else {
          // Close any existing popovers first, then open new one
          await OBR.popover.close(popoverId);
          
          // Try to open new popover with retry logic
          let success = false;
          let attempts = 0;
          const maxAttempts = 3;
          
          while (!success && attempts < maxAttempts) {
            try {
              await OBR.popover.open({ 
                id: popoverId, 
                url, 
                height: 864, 
                width: 576
              });
              success = true;
              await updateOpenPopoversMetadata(popoverId, true);
            } catch (error) {
              attempts++;
              console.warn(`Failed to open popover (attempt ${attempts}/${maxAttempts}):`, error);
              
              if (attempts < maxAttempts) {
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, 500));
              } else {
                // Final error message with troubleshooting tips
                console.error("Failed to open popover after 3 attempts. This may be due to:");
                console.error("1. Browser extension interference (try disabling ad blockers)");
                console.error("2. Browser cache issues (try Ctrl+F5 or Cmd+Shift+R)");
                console.error("3. Platform version compatibility");
                console.error("4. Network connectivity issues");
                
                // Still update metadata to prevent state inconsistency
                await updateOpenPopoversMetadata(popoverId, false);
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to toggle popover:", error);
      }
    },
  });

  // Note: Metadata change listener removed due to API limitations
  // Popover state is managed through direct metadata updates
});

// Helper function to manage open popovers metadata
async function updateOpenPopoversMetadata(popoverId: string, isOpen: boolean) {
  const metadata = await OBR.player.getMetadata();
  let openPopovers = metadata["sunito.character-sheet/openPopovers"] as string[] || [];
  
  if (isOpen) {
    if (!openPopovers.includes(popoverId)) {
      openPopovers.push(popoverId);
    }
  } else {
    openPopovers = openPopovers.filter(id => id !== popoverId);
  }
  
  await OBR.player.setMetadata({
    "sunito.character-sheet/openPopovers": openPopovers
  });
}
