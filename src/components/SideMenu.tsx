
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  ChevronRight, 
  Settings, 
  FolderTree, 
  Plug, 
  LayoutTemplate, 
  Search, 
  Code, 
  TrendingUp, 
  Globe, 
  X
} from "lucide-react";

interface SideMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SideMenu = ({ isOpen, setIsOpen }: SideMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMobile) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen, isMobile]);

  // Handle escape key for accessibility
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, setIsOpen]);

  // Focus trap for accessibility
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Accessibility skip link */}
      <a href="#main-content" className="skip-to-content">Skip to content</a>
      
      {/* Overlay when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Side Menu */}
      <div 
        ref={menuRef}
        className={cn(
          "fixed top-0 left-0 h-full w-[85vw] max-w-[320px] bg-white dark:bg-gray-900 shadow-lg z-50 transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">CE</span>
            </div>
            <span className="font-semibold text-lg">Chrome Extensions</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4" aria-label="Main navigation">
          <p className="text-sm font-medium text-muted-foreground mb-3">Navigation</p>
          <ul className="space-y-2" role="list">
            <li>
              <Link 
                to="/" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LayoutTemplate className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/files" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FolderTree className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>Project Files</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/api" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Plug className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>API Integrations</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Starter Templates Section */}
        <div className="p-4 border-t">
          <p className="text-sm font-medium text-muted-foreground mb-3" id="templates-heading">SEO Starter Templates</p>
          <ul className="space-y-2" role="list" aria-labelledby="templates-heading">
            <li>
              <Link 
                to="/templates/keyword-research" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Search className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>Keyword Research Tool</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/templates/backlink-analyzer" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>Backlink Analyzer</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/templates/on-page-seo" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Code className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>On-Page SEO Checker</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/templates/serp-analyzer" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Globe className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>SERP Analyzer</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/templates/schema-generator" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Code className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>Schema Markup Generator</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
