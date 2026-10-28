import React, { useEffect, useState } from "react";
import { ShieldCheck, Truck, Sparkles, Clock } from "lucide-react";

const ANNOUNCEMENTS = [
  { icon: ShieldCheck, text: "100% Plain packaging on every order. Zero product names outside." },
  { icon: Truck, text: "Free Discreet Delivery across India on orders above ₹499." },
  { icon: Sparkles, text: "GOTS Certified 100% Organic Cotton. Rash-free and toxin-free." },
  { icon: Clock, text: "Same-day dispatch for orders placed before 2:00 PM." },
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[index];
  const Icon = current.icon;

  return (
    <div className="bg-maroon text-white text-xs py-2 px-4 border-b border-maroon-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center overflow-hidden">
        <Icon className="w-3.5 h-3.5 text-aqua shrink-0 animate-pulse" />
        <p className="truncate font-medium tracking-wide">
          {current.text}
        </p>
      </div>
    </div>
  );
};
