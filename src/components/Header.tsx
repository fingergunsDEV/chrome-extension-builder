
import { Menu, Layout } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  setIsSideMenuOpen: (isOpen: boolean) => void;
}

const Header = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  setIsSideMenuOpen 
}: HeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <header className="p-4 animate-fade-in">
      <div className="flex flex-col items-center gap-4 mb-4">
        {/* Logo */}
        <img 
          src="/lovable-uploads/63347b67-1502-475c-b2ff-56de31f49604.png" 
          alt="Holistic Growth Marketing Logo" 
          className="max-w-xs w-full md:max-w-sm h-auto mb-2"
        />
        
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            title="Toggle file tree"
            aria-label="Toggle file tree sidebar"
          >
            <Layout className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsSideMenuOpen(true)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            title="Open side menu"
            aria-label="Open side menu"
          >
            <Menu className="w-4 h-4" />
          </button>
          
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent truncate">
            {isMobile ? "Extension Builder" : "Chrome Extension Builder"}
          </h1>
        </div>
      </div>
      <p className="text-sm md:text-base text-muted-foreground">Create your extension with live preview and Emmet support</p>
    </header>
  );
};

export default Header;
