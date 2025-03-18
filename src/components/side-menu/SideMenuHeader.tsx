
import { X } from "lucide-react";

interface SideMenuHeaderProps {
  onClose: () => void;
}

const SideMenuHeader = ({ onClose }: SideMenuHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 bg-primary rounded-md flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xl">CE</span>
        </div>
        <span className="font-semibold text-lg">Chrome Extensions</span>
      </div>
      <button 
        onClick={onClose} 
        className="p-2 hover:bg-secondary rounded-md transition-colors"
        aria-label="Close menu"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default SideMenuHeader;
