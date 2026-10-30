import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, ArrowRight, Lock, Mail, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import logoImg from "../../assets/logo.webp";
import toast from "react-hot-toast";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Return url if redirected from protected route
  const from = (location.state as any)?.from?.pathname || "/account/profile";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setError(null);
    setIsLoading(true);

    const res = await login({ email, password });
    setIsLoading(false);

    if (res.success) {
      toast.success("Welcome back to Femora!", { icon: "🌸" });
      navigate(from, { replace: true });
    } else {
      setError(res.message || "Failed to sign in. Please verify your details.");
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@femora.test");
    setPassword("Admin@123");
  };

  return (
    <div className="min-h-screen bg-cream py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-maroon/15 shadow-2xl bg-white">
        {/* Left Maroon Brand Panel with Logo as requested */}
        <div className="md:col-span-5 bg-gradient-to-br from-maroon via-maroon-dark to-maroon p-8 text-white flex flex-col justify-between text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-maroon-dark border border-blush/30 shadow-md">
                <img src={logoImg} alt="Femora Logo" className="w-full h-full object-cover scale-110" />
              </div>
              <div>
                <span className="font-heading font-bold text-2xl leading-none">Femora</span>
                <p className="text-[10px] text-blush tracking-wider uppercase mt-0.5">Discreet Organic Care</p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-heading font-bold leading-snug">
              Welcome to your private wellness haven
            </h2>
            <p className="text-xs text-cream/80 mt-3 leading-relaxed">
              Sign in to manage discreet orders, view delivery status timelines, and access saved addresses.
            </p>
          </div>

          {/* Privacy Guarantee Note */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <div className="flex items-start gap-2.5 text-xs text-cream/90 text-left">
              <ShieldCheck className="w-4 h-4 text-aqua shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Discreet Promise:</strong> Your order history, personal care choices, and details remain strictly private.
              </p>
            </div>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="font-heading font-bold text-2xl text-maroon">Sign in to your account</h3>
            <p className="text-xs text-muted mt-1">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-semibold text-rose-button hover:underline">
                Create one now
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="name@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div>
              <Input
                label="Password"
                type="password"
                required
                placeholder="••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end mt-1.5">
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-rose hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose font-medium bg-rose/10 p-2.5 rounded-xl border border-rose/20">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          {/* Demo Fill Helper */}
          <div className="mt-8 pt-6 border-t border-maroon/10">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2 text-center">
              Admin Demo:
            </p>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={handleFillDemo}
                className="px-3 py-1.5 rounded-lg border border-maroon/15 text-xs text-maroon hover:bg-maroon hover:text-white transition-colors font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-rose" />
                <span>Admin Login</span>
              </button>
            </div>
            <p className="text-[10px] text-muted text-center mt-2">
              Note: The email <code>admin@femora.test</code> receives the store administrator role.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
