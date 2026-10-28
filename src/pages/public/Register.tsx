import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Lock, Mail, User, Phone, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { getPasswordStrength, isValidEmail, isValidPhone } from "../../utils/validators";
import logoImg from "../../assets/logo.webp";
import toast from "react-hot-toast";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const pwdStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Please enter your full name";
    if (!isValidEmail(email)) newErrors.email = "Please enter a valid email address";
    if (!isValidPhone(phone)) newErrors.phone = "Enter a valid 10-digit Indian phone number";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!agreeTerms) newErrors.agreeTerms = "You must agree to privacy & terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    const res = await register({ name, email, phone, password });
    setIsLoading(false);

    if (res.success) {
      toast.success("Account created successfully! Welcome to Femora.");
      navigate("/account/profile");
    } else {
      setErrors({ form: res.message || "Registration failed." });
    }
  };

  return (
    <div className="min-h-screen bg-cream py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden border border-maroon/15 shadow-2xl bg-white">
        {/* Left Brand Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-maroon via-maroon-dark to-maroon p-8 text-white flex flex-col justify-between text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-maroon-dark border border-blush/30 shadow-md">
                <img src={logoImg} alt="Femora" className="w-full h-full object-cover scale-110" />
              </div>
              <div>
                <span className="font-heading font-bold text-2xl leading-none">Femora</span>
                <p className="text-[10px] text-blush tracking-wider uppercase mt-0.5">Organic & Discreet Care</p>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-heading font-bold leading-snug">
              Begin your gentle period wellness routine
            </h2>
            <p className="text-xs text-cream/80 mt-3 leading-relaxed">
              Create a free account to easily reorder organic essentials, track orders, and keep saved delivery locations private.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-2 text-xs text-cream/90 text-left">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-aqua shrink-0" />
              <span>100% Plain packaging on all parcels</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-aqua shrink-0" />
              <span>Zero spam, discreet email notifications</span>
            </div>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="font-heading font-bold text-2xl text-maroon">Create your account</h3>
            <p className="text-xs text-muted mt-1">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-rose-button hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              required
              placeholder="e.g. Pooja Sharma"
              leftIcon={<User className="w-4 h-4" />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />

            <Input
              label="Email Address"
              type="email"
              required
              placeholder="name@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <Input
              label="Phone Number"
              type="tel"
              required
              placeholder="10-digit mobile number"
              leftIcon={<Phone className="w-4 h-4" />}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />

            {/* Password with Strength Hint */}
            <div className="space-y-1.5">
              <Input
                label="Create Password"
                type="password"
                required
                placeholder="At least 6 characters"
                leftIcon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              {password && (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted">Password strength:</span>
                    <span
                      className={`font-semibold ${
                        pwdStrength.score >= 2 ? "text-teal-deep" : "text-amber-600"
                      }`}
                    >
                      {pwdStrength.label}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-maroon/10 rounded-full overflow-hidden flex gap-1">
                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-full ${
                          step <= pwdStrength.score
                            ? step === 1
                              ? "bg-rose"
                              : step === 2
                              ? "bg-amber-400"
                              : "bg-teal-deep"
                            : "bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Agreement Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-muted">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded text-rose focus:ring-aqua"
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="text-maroon underline">Terms</Link> and{" "}
                  <Link to="/privacy-policy" className="text-maroon underline">Privacy Policy</Link>.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-xs text-rose mt-1">• {errors.agreeTerms}</p>
              )}
            </div>

            {errors.form && (
              <p className="text-xs text-rose font-medium bg-rose/10 p-2.5 rounded-xl border border-rose/20">
                {errors.form}
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
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
