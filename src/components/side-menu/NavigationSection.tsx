
import { LayoutTemplate, Settings, FolderTree, Plug } from "lucide-react";
import NavLink from "./NavLink";

interface NavigationSectionProps {
  onLinkClick: () => void;
}

const NavigationSection = ({ onLinkClick }: NavigationSectionProps) => {
  return (
    <nav className="p-4" aria-label="Main navigation">
      <p className="text-sm font-medium text-muted-foreground mb-3">Navigation</p>
      <ul className="space-y-2" role="list">
        <NavLink to="/" icon={LayoutTemplate} onClick={onLinkClick}>Home</NavLink>
        <NavLink to="/settings" icon={Settings} onClick={onLinkClick}>Settings</NavLink>
        <NavLink to="/files" icon={FolderTree} onClick={onLinkClick}>Project Files</NavLink>
        <NavLink to="/api" icon={Plug} onClick={onLinkClick}>API Integrations</NavLink>
      </ul>
    </nav>
  );
};

export default NavigationSection;
