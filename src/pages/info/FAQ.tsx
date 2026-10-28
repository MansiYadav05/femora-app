import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, Search, ShieldCheck } from "lucide-react";
import { MOCK_FAQS, FAQItem } from "../../data/mockData";
import { Accordion } from "../../components/ui/Accordion";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";

export const FAQ: React.FC = () => {
  const [activeGroup, setActiveGroup] = useState<string>("All");
  const [search, setSearch] = useState("");

  const groups = ["All", "Delivery & Privacy", "Products", "Ordering", "Returns"] as const;

  const filteredFaqs = MOCK_FAQS.filter((faq) => {
    const matchesGroup = activeGroup === "All" || faq.category === activeGroup;
    const matchesSearch =
      !search.trim() ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 text-ink">
        <Breadcrumbs items={[{ label: "Frequently Asked Questions" }]} />

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-maroon text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
            <HelpCircle className="w-6 h-6 text-aqua" />
          </div>
          <span className="text-xs font-bold text-rose uppercase tracking-widest">
            Help & Guidance
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-maroon">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Everything you need to know about discreet packaging, organic cotton materials, delivery schedules, and hygiene return policies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search questions (e.g. discreet, packaging, cup wash)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs sm:text-sm rounded-full pl-10 pr-4 py-3 bg-white border border-maroon/20 focus:outline-none focus:ring-2 focus:ring-aqua shadow-xs"
          />
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Group Tabs as specified: ordering, delivery and privacy, returns, products */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap">
          {groups.map((grp) => (
            <button
              key={grp}
              onClick={() => setActiveGroup(grp)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                activeGroup === grp
                  ? "bg-maroon text-white font-semibold shadow-xs"
                  : "bg-white text-ink/80 hover:bg-blush-bg border border-maroon/10"
              }`}
            >
              {grp}
            </button>
          ))}
        </div>

        {/* Accordions */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-maroon/10 p-6">
            <p className="text-sm text-muted">No answers found matching your query.</p>
          </div>
        ) : (
          <Accordion
            items={filteredFaqs.map((faq) => ({
              id: faq.id,
              title: faq.question,
              content: (
                <div className="space-y-2">
                  <p>{faq.answer}</p>
                  <span className="inline-block text-[10px] font-semibold text-rose uppercase tracking-wider">
                    Category: {faq.category}
                  </span>
                </div>
              ),
            }))}
            defaultOpenId={filteredFaqs[0]?.id}
          />
        )}

        {/* Still have questions banner */}
        <div className="p-6 bg-white rounded-3xl border border-maroon/10 shadow-femora text-center space-y-3">
          <h4 className="font-heading font-semibold text-lg text-maroon">
            Have a question that isn&apos;t covered here?
          </h4>
          <p className="text-xs text-muted max-w-md mx-auto">
            Our customer care team is available Monday through Saturday to answer any questions about product sizing, care, or delivery.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold bg-rose-button text-white hover:bg-rose transition-colors"
            >
              Contact Support Privately
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
