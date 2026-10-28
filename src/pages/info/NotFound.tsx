import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Home, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";

export const NotFound: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-maroon/15 shadow-femora p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-blush-bg text-rose mx-auto flex items-center justify-center font-heading font-bold text-2xl">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-heading font-bold text-maroon">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            The page you are looking for might have been moved or is temporarily unavailable. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search organic pads, cups, roll-ons..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs rounded-full pl-10 pr-4 py-2.5 bg-cream border border-maroon/20 focus:outline-none focus:ring-2 focus:ring-aqua"
          />
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </form>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Home className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </Link>
          <Link to="/shop" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto">
              Browse Store
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
