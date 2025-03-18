
import { Search, TrendingUp, Code, Globe } from "lucide-react";
import NavLink from "./NavLink";

interface TemplatesSectionProps {
  onLinkClick: () => void;
}

const TemplatesSection = ({ onLinkClick }: TemplatesSectionProps) => {
  return (
    <div className="p-4 border-t">
      <p className="text-sm font-medium text-muted-foreground mb-3" id="templates-heading">
        SEO Starter Templates
      </p>
      <ul className="space-y-2" role="list" aria-labelledby="templates-heading">
        <NavLink to="/templates/keyword-research" icon={Search} onClick={onLinkClick}>
          Keyword Research Tool
        </NavLink>
        <NavLink to="/templates/backlink-analyzer" icon={TrendingUp} onClick={onLinkClick}>
          Backlink Analyzer
        </NavLink>
        <NavLink to="/templates/on-page-seo" icon={Code} onClick={onLinkClick}>
          On-Page SEO Checker
        </NavLink>
        <NavLink to="/templates/serp-analyzer" icon={Globe} onClick={onLinkClick}>
          SERP Analyzer
        </NavLink>
        <NavLink to="/templates/schema-generator" icon={Code} onClick={onLinkClick}>
          Schema Markup Generator
        </NavLink>
      </ul>
    </div>
  );
};

export default TemplatesSection;
