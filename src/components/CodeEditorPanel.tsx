
import { useState, KeyboardEvent } from "react";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { expandEmmet } from "@/utils/emmetHelper";

interface CodeEditorPanelProps { 
  content: string; 
  onChange: (value: string) => void; 
  language: string;
  fileName?: string;
}

const CodeEditorPanel = ({ 
  content, 
  onChange, 
  language,
  fileName
}: CodeEditorPanelProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key handling
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      const newValue = content.substring(0, start) + '  ' + content.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted tab
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
      }, 0);
    }
    
    // Emmet expansion with Tab key after typing an abbreviation
    if (e.key === 'Tab' && !e.shiftKey) {
      const start = e.currentTarget.selectionStart;
      const textBeforeCursor = content.substring(0, start);
      
      // Check if there's a potential Emmet abbreviation before the cursor
      const abbreviationMatch = textBeforeCursor.match(/[a-zA-Z0-9.#\{\}]+$/);
      
      if (abbreviationMatch) {
        const abbreviation = abbreviationMatch[0];
        const abbreviationStart = start - abbreviation.length;
        
        // Only try to expand if we're in HTML mode
        if (language.toLowerCase() === 'html') {
          const expanded = expandEmmet(abbreviation);
          
          // If expansion changed something, replace the abbreviation
          if (expanded !== abbreviation) {
            e.preventDefault();
            
            const newValue = content.substring(0, abbreviationStart) + expanded + content.substring(start);
            onChange(newValue);
            
            // Position cursor at the end of the expanded HTML
            setTimeout(() => {
              e.currentTarget.selectionStart = e.currentTarget.selectionEnd = abbreviationStart + expanded.length;
            }, 0);
          }
        }
      }
    }
  };

  return (
    <div className="editor-container min-h-[300px] h-[calc(100vh-240px)] sm:h-[calc(100vh-200px)] animate-fade-in shadow-lg border border-border/30">
      <div className="flex items-center justify-between mb-2 text-editor-line bg-editor-bg/40 p-2 rounded-t-lg">
        <span className="text-sm font-medium">{fileName || language}</span>
        <Save 
          className="w-4 h-4 hover:text-white cursor-pointer transition-colors" 
          onClick={() => toast({ 
            title: "Changes saved", 
            description: `${fileName || language} has been saved successfully.` 
          })} 
          aria-label="Save file"
        />
      </div>
      <textarea
        className="w-full h-[calc(100%-2rem)] bg-transparent resize-none focus:outline-none p-4 font-mono text-sm"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        placeholder={`Write your ${language} code here...`}
        aria-label={`${language} code editor`}
      />
    </div>
  );
};

export default CodeEditorPanel;
