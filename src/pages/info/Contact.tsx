import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Clock, MessageSquare, CheckCircle2, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { isValidEmail } from "../../utils/validators";
import toast from "react-hot-toast";

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !isValidEmail(email) || !message.trim()) {
      toast.error("Please fill in all required fields with a valid email.");
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      toast.success("Message received! Our team will respond privately within 24 hours.");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-cream py-6 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 text-ink">
        <Breadcrumbs items={[{ label: "Contact Support" }]} />

        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-rose uppercase tracking-widest">
            We are here for you
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-maroon">
            Contact Femora Care
          </h1>
          <p className="text-xs sm:text-sm text-muted">
            Have questions about sizes, ingredients, or plain shipping? We respond with total confidentiality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-maroon/10 shadow-femora space-y-6">
            <h3 className="font-heading font-semibold text-xl text-maroon">
              Reach Our Care Team
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blush-bg flex items-center justify-center text-maroon shrink-0">
                  <Mail className="w-4 h-4 text-rose" />
                </div>
                <div>
                  <span className="font-semibold text-ink block">Direct Email Support</span>
                  <a href="mailto:support@femora.in" className="text-rose-button hover:underline">
                    support@femora.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blush-bg flex items-center justify-center text-maroon shrink-0">
                  <Phone className="w-4 h-4 text-teal-deep" />
                </div>
                <div>
                  <span className="font-semibold text-ink block">Helpline & WhatsApp</span>
                  <p className="text-muted">+91 (080) 4123-9988</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blush-bg flex items-center justify-center text-maroon shrink-0">
                  <Clock className="w-4 h-4 text-maroon" />
                </div>
                <div>
                  <span className="font-semibold text-ink block">Customer Care Hours</span>
                  <p className="text-muted">Monday to Saturday: 9:00 AM – 7:00 PM IST</p>
                  <p className="text-[11px] text-teal-deep mt-0.5">Average reply time under 2 hours</p>
                </div>
              </div>
            </div>

            {/* Link to FAQ */}
            <div className="p-4 rounded-2xl bg-cream border border-maroon/10 space-y-2">
              <h5 className="font-semibold text-xs text-maroon uppercase tracking-wider">
                Need immediate answers?
              </h5>
              <p className="text-xs text-muted">
                Find quick answers regarding plain packaging, delivery pincodes, and hygiene policies in our FAQ section.
              </p>
              <Link to="/faq" className="inline-block text-xs font-semibold text-rose-button hover:underline pt-1">
                Browse Care FAQs &rarr;
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-maroon/10 shadow-femora">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-teal/15 text-teal-deep mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-maroon">Message Sent Privately</h3>
                <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A representative from our feminine wellness team will get back to your email within 24 hours.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading font-semibold text-xl text-maroon pb-2 border-b border-maroon/10">
                  Send a Confidential Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    required
                    placeholder="e.g. Pooja"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label="Your Email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Input
                  label="Subject"
                  placeholder="e.g. Question about Cup Sizing or Order Delivery"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />

                <div>
                  <label className="block text-xs font-semibold text-ink/80 mb-1.5 uppercase tracking-wider">
                    Your Message <span className="text-rose">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Type your question or feedback..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-maroon/15 focus:outline-none focus:ring-2 focus:ring-aqua focus:border-teal"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-muted">
                  <ShieldCheck className="w-4 h-4 text-teal-deep shrink-0" />
                  <span>Your email and contact info will never be shared or marketed to.</span>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSending}
                  >
                    Send Confidential Message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
