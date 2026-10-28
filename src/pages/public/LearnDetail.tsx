import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BookOpen, Clock, Calendar, ArrowLeft, ShieldCheck, Share2 } from "lucide-react";
import { productService } from "../../services/productService";
import { Article } from "../../data/mockData";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/common/EmptyState";
import toast from "react-hot-toast";

export const LearnDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    if (slug) {
      productService.getArticle(slug).then((res) => {
        if (res.success && res.data) {
          setArticle(res.data);
          document.title = `${res.data.title} | Femora Learn`;
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (!article && !loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <EmptyState
          title="Article Not Found"
          description="The educational article you requested could not be located."
          actionLabel="Return to Health Articles"
          actionTo="/learn"
        />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Breadcrumbs
          items={[
            { label: "Period Health", path: "/learn" },
            { label: article?.title || "Article" },
          ]}
        />

        {article && (
          <article className="bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 sm:p-10 md:p-12 space-y-8">
            {/* Header info */}
            <div className="space-y-4 border-b border-maroon/10 pb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-teal-deep bg-teal/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="text-xs text-muted">·</span>
                <span className="text-xs text-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-maroon leading-tight">
                {article.title}
              </h1>

              <div className="flex items-center justify-between text-xs text-muted pt-2">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Published on {article.publishedDate}</span>
                </span>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-button hover:underline cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-ink/85">
              {article.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Privacy & Discretion note */}
            <div className="p-4 bg-blush-bg/50 rounded-2xl border border-blush/40 flex items-start gap-3 text-xs text-maroon">
              <ShieldCheck className="w-5 h-5 text-teal-deep shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-sm">Femora Shame-Free Health Mission</h5>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">
                  We believe period health belongs in normal, honest conversation. Our products are formulated to treat your body gently, and our delivery is 100% discreet so you are always in control of your privacy.
                </p>
              </div>
            </div>

            {/* Back to Learn */}
            <div className="pt-4 border-t border-maroon/10 flex items-center justify-between">
              <Link to="/learn">
                <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                  Back to Articles
                </Button>
              </Link>

              <Link to="/shop">
                <Button variant="primary" size="sm">
                  Shop Period Care
                </Button>
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};
