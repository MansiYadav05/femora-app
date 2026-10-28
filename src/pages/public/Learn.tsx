import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ArrowRight, Sparkles, Leaf } from "lucide-react";
import { productService } from "../../services/productService";
import { Article } from "../../data/mockData";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { LotusDivider } from "../../components/common/LotusDivider";

export const Learn: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Period Health & Wellness Articles | Femora Learn";
    window.scrollTo(0, 0);

    productService.getArticles().then((res) => {
      if (res.success && res.data) {
        setArticles(res.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: "Period Health & Learn" }]} />

        {/* Hero Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-maroon via-maroon-dark to-maroon text-white p-8 md:p-12 shadow-femora border border-maroon-dark">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-aqua text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Evidence-Based Menstrual Care</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight">
              Period Health & Mindful Living
            </h1>
            <p className="text-sm md:text-base text-cream/90 leading-relaxed font-normal">
              Shame-free, medically sound guides on understanding your hormonal cycle, preventing pad rashes, managing dysmenorrhea, and transitioning to sustainable cups.
            </p>
          </div>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-maroon/10 shadow-femora hover:shadow-femora-hover transition-all p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="font-semibold text-teal-deep uppercase tracking-wider text-[11px] bg-teal/10 px-2.5 py-0.5 rounded">
                    {art.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-muted">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <Link to={`/learn/${art.slug}`} className="block group">
                  <h3 className="font-heading font-bold text-xl text-ink group-hover:text-maroon transition-colors leading-snug">
                    {art.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-maroon/5 flex items-center justify-between mt-4">
                <span className="text-xs text-muted">{art.publishedDate}</span>
                <Link
                  to={`/learn/${art.slug}`}
                  className="text-xs font-semibold text-rose-button hover:text-maroon inline-flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <LotusDivider />
      </div>
    </div>
  );
};
