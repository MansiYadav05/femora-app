import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
  className = "",
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-maroon/10 rounded-xl border border-maroon/10 bg-white shadow-femora overflow-hidden ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="transition-colors">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left text-sm md:text-base font-medium text-ink hover:text-maroon hover:bg-blush-bg/30 transition-colors focus-visible:ring-2 focus-visible:ring-aqua"
              aria-expanded={isOpen}
            >
              <span className="pr-4">{item.title}</span>
              <ChevronDown
                className={`w-4 h-4 text-maroon shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-5 pt-1 text-sm text-muted leading-relaxed border-t border-maroon/5 bg-cream/40">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
