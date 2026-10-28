import React from "react";
import { Link, Navigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";

export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-maroon border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-cream py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl border border-maroon/15 shadow-femora p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-rose/10 text-rose mx-auto flex items-center justify-center">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-maroon">
            Access Denied
          </h1>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            You are signed in as <strong className="text-ink">{user?.email}</strong> with customer privileges. Store operations and management are restricted to administrator accounts.
          </p>
          <div className="p-3 bg-cream rounded-xl text-xs text-muted">
            Tip: Log in with <code className="font-bold text-maroon">admin@femora.test</code> to preview the full admin operations console.
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Switch Account
              </Button>
            </Link>
            <Link to="/">
              <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
                Return to Store
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
