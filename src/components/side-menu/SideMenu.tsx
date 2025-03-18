
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import SideMenuHeader from "./SideMenuHeader";
import NavigationSection from "./NavigationSection";
import TemplatesSection from "./TemplatesSection";

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
        <SideMenuHeader onClose={() => setIsOpen(false)} />
        <NavigationSection onLinkClick={() => setIsOpen(false)} />
        <TemplatesSection onLinkClick={() => setIsOpen(false)} />
      </div>
    </>
  );
};

export default SideMenu;
