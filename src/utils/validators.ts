// Validation helpers for Indian e-commerce forms

// Indian phone numbers: 10 digits starting with 6, 7, 8, or 9
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-+()]/g, "");
  // If starts with country code 91
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return /^[6-9]\d{9}$/.test(cleaned.slice(2));
  }
  return /^[6-9]\d{9}$/.test(cleaned);
}

// Indian postal codes: 6 digits, non-zero first digit
export function isValidPincode(pincode: string): boolean {
  const cleaned = pincode.trim();
  return /^[1-9][0-9]{5}$/.test(cleaned);
}

// Simple email validation
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

// Password strength checker (at least 6 characters)
export function getPasswordStrength(password: string): {
  score: number; // 0 to 3
  label: string;
} {
  if (!password) return { score: 0, label: "Enter password" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8 && /[A-Z]/.test(password)) score++;
  if (/[0-9!@#$%^&*]/.test(password)) score++;

  const labels = ["Weak", "Fair", "Good", "Strong"];
  return {
    score,
    label: labels[score] || "Weak",
  };
}
