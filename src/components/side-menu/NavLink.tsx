
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ to, icon: Icon, children, onClick }: NavLinkProps) => {
  return (
    <li>
      <Link 
        to={to} 
        className="flex items-center gap-3 p-2 hover:bg-secondary rounded-md transition-colors"
        onClick={onClick}
      >
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        <span>{children}</span>
      </Link>
    </li>
  );
};

export default NavLink;
