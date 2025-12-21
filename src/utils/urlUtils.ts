/**
 * Extracts character ID from URL parameters, path, or OwlBear obrref parameter
 */
export const extractCharacterId = (location: { search: string; pathname: string }): string => {
  // First try to extract from URL path (direct character URL)
  if (location.pathname) {
    const pathParts = location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    
    if (lastPart && lastPart.length > 10 && lastPart.includes('-')) {
      console.log("Extracted character ID from path:", lastPart);
      return lastPart;
    }
  }
  
  // Check for OwlBear obrref parameter
  const urlParams = new URLSearchParams(location.search);
  const obrref = urlParams.get('obrref');
  
  if (obrref) {
    try {
      // Decode the base64 obrref to extract character ID
      const decoded = atob(obrref);
      console.log("Decoded obrref:", decoded);
      
      // Try to extract character ID from the decoded URL
      try {
        const url = new URL(decoded);
        const pathParts = url.pathname.split('/');
        const characterId = pathParts[pathParts.length - 1];
        
        if (characterId && characterId !== 'character' && characterId.length > 0) {
          console.log("Extracted character ID from URL:", characterId);
          return characterId;
        }
      } catch (urlError) {
        console.log("URL parsing failed, trying alternative extraction");
      }
      
      // Alternative: extract from the end of the decoded string
      const spaceIndex = decoded.lastIndexOf(' ');
      if (spaceIndex > 0) {
        const potentialId = decoded.substring(spaceIndex + 1);
        if (potentialId && potentialId.length > 10) {
          console.log("Extracted character ID from substring:", potentialId);
          return potentialId;
        }
      }
    } catch (error) {
      console.warn("Failed to extract character ID from obrref:", error);
    }
  }
  
  // Fallback to a default character ID
  console.log("Using default character ID: 1");
  return "1";
};
