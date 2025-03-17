
// Simple Emmet-like functionality for HTML expansion
export const expandEmmet = (abbreviation: string): string => {
  // Handle basic HTML tags with classes, IDs, and text content
  if (!abbreviation.includes('>') && !abbreviation.includes('+') && !abbreviation.includes('^')) {
    // Parse simple expressions like div.class#id{text}
    const match = abbreviation.match(/([a-zA-Z0-9]+)((?:\.[a-zA-Z0-9-_]+|#[a-zA-Z0-9-_]+|\{.*?\})*)/);
    if (!match) return abbreviation;
    
    const tag = match[1] || 'div';
    const attributes = match[2] || '';
    
    let classes = '';
    let id = '';
    let content = '';
    
    // Extract classes
    const classMatches = attributes.match(/\.[a-zA-Z0-9-_]+/g);
    if (classMatches) {
      classes = ` class="${classMatches.map(c => c.substring(1)).join(' ')}"`;
    }
    
    // Extract ID
    const idMatch = attributes.match(/#([a-zA-Z0-9-_]+)/);
    if (idMatch) {
      id = ` id="${idMatch[1]}"`;
    }
    
    // Extract content
    const contentMatch = attributes.match(/\{(.*?)\}/);
    if (contentMatch) {
      content = contentMatch[1];
    }
    
    return `<${tag}${classes}${id}>${content}</${tag}>`;
  }
  
  // For more complex expressions, just return the original (would need a more robust parser for full Emmet)
  return abbreviation;
};
