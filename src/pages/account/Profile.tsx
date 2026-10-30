import React, { useState } from "react";
import { User, Phone, Mail, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { isValidPhone } from "../../utils/validators";
import toast from "react-hot-toast";

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    if (!isValidPhone(phone)) {
      toast.error("Please enter a valid 10-digit Indian phone number");
      return;
    }

    setIsLoading(true);
    const res = await updateProfile({
      name,
      phone,
      password: newPassword || undefined,
    });
    setIsLoading(false);

    if (res.success) {
      toast.success("Profile updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      toast.error(res.message || "Could not update profile");
    }
  };

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Breadcrumbs items={[{ label: "My Account" }, { label: "Profile Settings" }]} />

        <div className="pb-4 border-b border-maroon/10">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-maroon">
            My Account & Profile
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage your personal profile, phone contact for courier SMS, and security password.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-maroon/10 shadow-femora p-6 sm:p-10">
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Account Details */}
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-lg text-maroon pb-2 border-b border-maroon/10">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  leftIcon={<User className="w-4 h-4" />}
                />

                <Input
                  label="Email Address"
                  type="email"
                  disabled
                  value={user?.email || ""}
                  helperText="Email is permanently linked to your order history."
                  leftIcon={<Mail className="w-4 h-4" />}
                />
              </div>

              <div className="max-w-md">
                <Input
                  label="Phone Number (For Courier Updates)"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  leftIcon={<Phone className="w-4 h-4" />}
                  helperText="Used strictly by delivery logistics for dispatch notifications."
                />
              </div>
            </div>

            {/* Change Password */}
            <div className="space-y-4 pt-4 border-t border-maroon/10">
              <h3 className="font-heading font-semibold text-lg text-maroon pb-2 border-b border-maroon/10">
                Change Password (Optional)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                />

                <Input
                  label="New Password"
                  type="password"
                  placeholder="At least 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  leftIcon={<Lock className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Privacy Shield Note */}
            <div className="p-4 bg-blush-bg/50 rounded-2xl border border-blush/40 flex items-start gap-3 text-xs text-maroon">
              <ShieldCheck className="w-5 h-5 text-teal-deep shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-sm">Discreet Account Guarantee</h5>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">
                  Your purchase details and period care frequency are kept strictly confidential under our Zero-Telemetry Privacy Commitment.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                rightIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
