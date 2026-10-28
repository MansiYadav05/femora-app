import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { isValidEmail } from "../../utils/validators";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-maroon/15 shadow-femora p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-blush-bg text-rose mx-auto flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-maroon">
            Reset Password
          </h1>
          <p className="text-xs text-muted leading-relaxed">
            Enter your registered email address and we will send a password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="p-5 rounded-2xl bg-teal/10 border border-teal/20 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-teal-deep mx-auto" />
            <h4 className="font-semibold text-sm text-teal-deep">Check your inbox</h4>
            <p className="text-xs text-ink/80 leading-relaxed">
              If an account exists for <strong className="text-maroon">{email}</strong>, we have sent instructions to reset your password.
            </p>
            <div className="pt-2">
              <Link to="/login">
                <Button variant="primary" size="sm">
                  Return to Login
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="name@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error || undefined}
            />

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Send Reset Link
            </Button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-xs font-semibold text-muted hover:text-maroon inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to sign in</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
