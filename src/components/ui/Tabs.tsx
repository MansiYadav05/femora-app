import React from "react";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: "line" | "segmented";
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = "",
  variant = "line",
}) => {
  if (variant === "segmented") {
    return (
      <div className={`flex items-center gap-1 p-1 bg-maroon/5 rounded-full border border-maroon/10 ${className}`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? "bg-maroon text-white shadow-sm"
                  : "text-muted hover:text-maroon hover:bg-white/60"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? "bg-white/20 text-white" : "bg-maroon/10 text-maroon"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex border-b border-maroon/15 gap-6 overflow-x-auto no-scrollbar ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap shrink-0 relative cursor-pointer ${
              isActive ? "text-maroon font-semibold" : "text-muted hover:text-ink"
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded text-[11px] ${isActive ? "bg-blush-bg text-rose" : "bg-slate-100 text-muted"}`}>
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-button rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
