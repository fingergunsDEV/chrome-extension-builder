
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
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
  return (
    <>
      {/* Overlay when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Side Menu */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-900 shadow-lg z-50 transition-transform duration-300 transform",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">CE</span>
            </div>
            <span className="font-semibold text-lg">Chrome Extensions</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4">
          <p className="text-sm font-medium text-muted-foreground mb-3">Navigation</p>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LayoutTemplate className="h-5 w-5 text-primary" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-5 w-5 text-primary" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/files" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <FolderTree className="h-5 w-5 text-primary" />
                <span>Project Files</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/api" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Plug className="h-5 w-5 text-primary" />
                <span>API Integrations</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Starter Templates Section */}
        <div className="p-4 border-t">
          <p className="text-sm font-medium text-muted-foreground mb-3">SEO Starter Templates</p>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/templates/keyword-research" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Search className="h-5 w-5 text-primary" />
                <span>Keyword Research Tool</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/templates/backlink-analyzer" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Backlink Analyzer</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/templates/on-page-seo" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Code className="h-5 w-5 text-primary" />
                <span>On-Page SEO Checker</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/templates/serp-analyzer" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Globe className="h-5 w-5 text-primary" />
                <span>SERP Analyzer</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/templates/schema-generator" 
                className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Code className="h-5 w-5 text-primary" />
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
