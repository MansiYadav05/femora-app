import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { addressService } from "../../services/addressService";
import { orderService } from "../../services/orderService";
import { paymentService } from "../../services/paymentService";
import { Address } from "../../data/mockData";
import { AddressCard } from "../../components/order/AddressCard";
import { PriceSummary } from "../../components/cart/PriceSummary";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Switch } from "../../components/ui/Switch";
import { Modal } from "../../components/ui/Modal";
import { isValidPhone, isValidPincode } from "../../utils/validators";
import { formatPrice } from "../../utils/formatPrice";
import toast from "react-hot-toast";

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    items,
    subtotal,
    deliveryFee: standardFee,
    total: baseTotal,
    discreetPackaging,
    toggleDiscreetPackaging,
    clearCart,
  } = useCart();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // Four Steps state: 1: Address, 2: Delivery & Packaging, 3: Payment, 4: Review
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Delivery options
  const [deliverySpeed, setDeliverySpeed] = useState<"Standard" | "Express">("Standard");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Credit/Debit Card" | "Cash on Delivery">("UPI");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // New Address Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    pincode: "",
    addressLine: "",
    locality: "",
    city: "",
    state: "",
    type: "Home" as const,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Discreet Checkout | Femora";
    window.scrollTo(0, 0);

    addressService.getAddresses().then((res) => {
      if (res.success && res.data.length > 0) {
        setAddresses(res.data);
        const def = res.data.find((a) => a.isDefault) || res.data[0];
        setSelectedAddress(def);
      }
    });
  }, []);

  // Compute final shipping fee factoring in Express delivery
  const expressSurcharge = deliverySpeed === "Express" ? 50 : 0;
  const finalDeliveryFee = standardFee + expressSurcharge;
  const finalTotal = subtotal + finalDeliveryFee;

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!newAddr.fullName.trim()) errors.fullName = "Full name is required";
    if (!isValidPhone(newAddr.phone)) errors.phone = "Enter a valid 10-digit Indian phone number";
    if (!isValidPincode(newAddr.pincode)) errors.pincode = "Enter a valid 6-digit Indian PIN code";
    if (!newAddr.addressLine.trim()) errors.addressLine = "House / Flat / Street address is required";
    if (!newAddr.city.trim()) errors.city = "City is required";
    if (!newAddr.state.trim()) errors.state = "State is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    addressService
      .addAddress({
        ...newAddr,
        isDefault: addresses.length === 0,
      })
      .then((res) => {
        if (res.success && res.data) {
          setAddresses((prev) => [...prev, res.data]);
          setSelectedAddress(res.data);
          setIsAddModalOpen(false);
          toast.success("Address added successfully");
        }
      });
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Payment process simulation
      const payRes = await paymentService.createPayment({
        amount: finalTotal,
        method: paymentMethod,
      });

      // 2. Place Order
      const orderPayload = {
        items: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          slug: i.product.slug,
          price: i.product.price,
          mrp: i.product.mrp,
          quantity: i.quantity,
          variant: i.selectedVariant,
          imageTheme: i.product.imageTheme,
        })),
        subtotal,
        deliveryFee: finalDeliveryFee,
        total: finalTotal,
        discreetPackaging,
        deliverySpeed,
        paymentMethod,
        shippingAddress: selectedAddress,
        deliveryInstructions,
      };

      const orderRes = await orderService.placeOrder(orderPayload);

      if (orderRes.success && orderRes.data) {
        await clearCart();
        navigate(`/order-success/${orderRes.data.id}`);
      } else {
        toast.error("Unable to confirm order. Please try again.");
      }
    } catch {
      toast.error("An error occurred during order processing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-heading font-semibold text-maroon mb-2">
          Your bag is currently empty
        </h2>
        <p className="text-sm text-muted mb-6">
          Add period care essentials to your bag before checking out.
        </p>
        <Link to="/shop">
          <Button variant="primary">Explore Products</Button>
        </Link>
      </div>
    );
  }

  const stepsList = [
    { num: 1, label: "Address", icon: MapPin },
    { num: 2, label: "Packaging & Speed", icon: Truck },
    { num: 3, label: "Payment", icon: CreditCard },
    { num: 4, label: "Review", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumbs items={[{ label: "Cart", path: "/cart" }, { label: "Checkout" }]} />

        {/* 4-Step Progress Indicator Bar */}
        <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-4 md:p-5">
          <div className="grid grid-cols-4 gap-2 text-center">
            {stepsList.map((s) => {
              const isPast = currentStep > s.num;
              const isCur = currentStep === s.num;
              const Icon = s.icon;

              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => s.num < currentStep && setCurrentStep(s.num as any)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-2 rounded-xl transition-colors ${isCur
                      ? "text-maroon font-bold bg-blush-bg/60"
                      : isPast
                        ? "text-teal-deep font-semibold cursor-pointer hover:bg-cream"
                        : "text-muted/60"
                    }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${isCur
                        ? "bg-maroon text-white"
                        : isPast
                          ? "bg-teal-deep text-white"
                          : "bg-maroon/10 text-muted"
                      }`}
                  >
                    {isPast ? "✓" : s.num}
                  </div>
                  <span className="text-xs truncate">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Area (Steps 1 to 4) */}
          <div className="lg:col-span-8 space-y-6">
            {/* STEP 1: ADDRESS */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-maroon/10">
                  <h2 className="font-heading font-semibold text-lg text-maroon flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rose" />
                    <span>Step 1: Select Delivery Address</span>
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setFormErrors({});
                      setIsAddModalOpen(true);
                    }}
                    className="text-xs font-semibold text-rose-button hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <AddressCard
                      key={addr.id}
                      address={addr}
                      selectable={true}
                      isSelected={selectedAddress?.id === addr.id}
                      onSelect={setSelectedAddress}
                    />
                  ))}
                </div>

                <div className="pt-4 border-t border-maroon/10 flex justify-end">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setCurrentStep(2)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    disabled={!selectedAddress}
                  >
                    Continue to Delivery & Packaging
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: DELIVERY SPEED & PACKAGING */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-6 space-y-6">
                <div className="pb-3 border-b border-maroon/10">
                  <h2 className="font-heading font-semibold text-lg text-maroon flex items-center gap-2">
                    <Truck className="w-5 h-5 text-teal" />
                    <span>Step 2: Delivery Speed & Discreet Packaging</span>
                  </h2>
                </div>

                {/* 100% Discreet Packaging Toggle */}
                <div className="p-4 rounded-xl bg-blush-bg/60 border border-blush/40 space-y-2">
                  <Switch
                    checked={discreetPackaging}
                    onChange={toggleDiscreetPackaging}
                    label="100% Plain Packaging (Recommended)"
                    description="Shipped in a plain brown carton with a neutral label. Zero brand names or period product mentions on outer package."
                  />
                  <div className="flex items-center gap-1.5 text-xs text-teal-deep font-medium pl-14">
                    <ShieldCheck className="w-4 h-4 text-teal" />
                    <span>Protected by Femora Discretion Shield</span>
                  </div>
                </div>

                {/* Delivery Speeds */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/80">
                    Select Delivery Speed:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setDeliverySpeed("Standard")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${deliverySpeed === "Standard"
                          ? "border-maroon bg-cream ring-2 ring-maroon shadow-sm"
                          : "border-maroon/15 hover:border-maroon/30"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-ink">Standard Discreet</span>
                        <span className="text-xs font-bold text-teal-deep">
                          {standardFee === 0 ? "FREE" : formatPrice(standardFee)}
                        </span>
                      </div>
                      <p className="text-xs text-muted">2 to 4 business days delivery</p>
                    </div>

                    <div
                      onClick={() => setDeliverySpeed("Express")}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${deliverySpeed === "Express"
                          ? "border-maroon bg-cream ring-2 ring-maroon shadow-sm"
                          : "border-maroon/15 hover:border-maroon/30"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-ink">Express Air Transit</span>
                        <span className="text-xs font-bold text-rose">+₹50</span>
                      </div>
                      <p className="text-xs text-muted">Next day / 24-48 hrs in metros</p>
                    </div>
                  </div>
                </div>

                {/* Optional Delivery Instructions */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink/80">
                    Delivery Instructions (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please leave parcel with apartment security, or ring bell twice."
                    value={deliveryInstructions}
                    onChange={(e) => setDeliveryInstructions(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-maroon/20 focus:outline-none focus:ring-2 focus:ring-aqua"
                  />
                </div>

                {/* Stepper Buttons */}
                <div className="pt-4 border-t border-maroon/10 flex justify-between">
                  <Button variant="ghost" size="md" onClick={() => setCurrentStep(1)}>
                    &larr; Back to Address
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setCurrentStep(3)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-6 space-y-6">
                <div className="pb-3 border-b border-maroon/10">
                  <h2 className="font-heading font-semibold text-lg text-maroon flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-rose" />
                    <span>Step 3: Select Payment Method (Secure)</span>
                  </h2>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: "UPI",
                      name: "UPI (Google Pay, PhonePe, Paytm, BHIM)",
                      desc: "Instant zero-fee transfer",
                    },
                    {
                      id: "Credit/Debit Card",
                      name: "Credit or Debit Card",
                      desc: "Visa, Mastercard, RuPay with 256-bit encryption",
                    },
                    {
                      id: "Cash on Delivery",
                      name: "Cash on Delivery (COD)",
                      desc: "Pay securely in cash at doorstep handover",
                    },
                  ].map((pm) => (
                    <div
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === pm.id
                          ? "border-maroon bg-cream ring-2 ring-maroon shadow-sm"
                          : "border-maroon/15 hover:border-maroon/30"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm text-ink">{pm.name}</p>
                          <p className="text-xs text-muted mt-0.5">{pm.desc}</p>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === pm.id}
                          onChange={() => setPaymentMethod(pm.id as any)}
                          className="w-4 h-4 text-maroon accent-maroon"
                        />
                      </div>

                      {/* Mock input details */}
                      {paymentMethod === "UPI" && pm.id === "UPI" && (
                        <div className="mt-3 pt-3 border-t border-maroon/10">
                          <Input
                            placeholder="Enter your VPA (e.g. mobile@okhdfcbank)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            helperText="Simulated payment: any test UPI ID works seamlessly."
                          />
                        </div>
                      )}

                      {paymentMethod === "Credit/Debit Card" && pm.id === "Credit/Debit Card" && (
                        <div className="mt-3 pt-3 border-t border-maroon/10 grid grid-cols-2 gap-2">
                          <div className="col-span-2">
                            <Input
                              placeholder="Card Number (4111 2222 3333 4444)"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                          </div>
                          <Input
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                          />
                          <Input
                            placeholder="CVV"
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-maroon/10 flex justify-between">
                  <Button variant="ghost" size="md" onClick={() => setCurrentStep(2)}>
                    &larr; Back to Packaging
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setCurrentStep(4)}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Review Final Order
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW */}
            {currentStep === 4 && (
              <div className="bg-white rounded-2xl border border-maroon/10 shadow-femora p-6 space-y-6">
                <div className="pb-3 border-b border-maroon/10">
                  <h2 className="font-heading font-semibold text-lg text-maroon flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-teal-deep" />
                    <span>Step 4: Final Review & Confirmation</span>
                  </h2>
                </div>

                {/* Review Address & Packaging Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-cream border border-maroon/10 space-y-1">
                    <span className="font-semibold uppercase tracking-wider text-muted text-[11px]">
                      Shipping Address
                    </span>
                    <p className="font-semibold text-ink">{selectedAddress?.fullName}</p>
                    <p className="text-muted">{selectedAddress?.addressLine}, {selectedAddress?.city}</p>
                    <p className="text-muted">PIN: {selectedAddress?.pincode} · Phone: {selectedAddress?.phone}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-cream border border-maroon/10 space-y-1">
                    <span className="font-semibold uppercase tracking-wider text-muted text-[11px]">
                      Delivery & Privacy
                    </span>
                    <p className="font-semibold text-ink">{deliverySpeed} Delivery</p>
                    <p className="text-teal-deep font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{discreetPackaging ? "100% Plain packaging enabled" : "Standard packing"}</span>
                    </p>
                    <p className="text-muted">Payment: {paymentMethod}</p>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink/80">
                    Order Items ({items.length}):
                  </span>
                  <div className="divide-y divide-maroon/10 border border-maroon/10 rounded-xl p-3 bg-cream/30">
                    {items.map((it, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <div className="truncate pr-4">
                          <p className="font-medium text-ink truncate">{it.product.name}</p>
                          <p className="text-[11px] text-muted">
                            Qty: {it.quantity} {it.selectedVariant ? `· ${it.selectedVariant}` : ""}
                          </p>
                        </div>
                        <span className="font-semibold text-maroon tabular-nums">
                          {formatPrice(it.product.price * it.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-maroon/10 flex justify-between">
                  <Button variant="ghost" size="md" onClick={() => setCurrentStep(3)}>
                    &larr; Back to Payment
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    onClick={handlePlaceOrder}
                    rightIcon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Place Order · {formatPrice(finalTotal)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <PriceSummary
              subtotal={subtotal}
              deliveryFee={finalDeliveryFee}
              total={finalTotal}
              discreetPackaging={discreetPackaging}
              showCheckoutButton={false}
            />
          </div>
        </div>
      </div>

      {/* Modal: Add New Address */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Delivery Address"
      >
        <form onSubmit={handleAddNewAddress} className="space-y-4">
          <Input
            label="Full Name"
            required
            placeholder="Your full name"
            value={newAddr.fullName}
            onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
            error={formErrors.fullName}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Phone Number"
              required
              placeholder="10-digit mobile"
              value={newAddr.phone}
              onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
              error={formErrors.phone}
            />
            <Input
              label="Pincode"
              required
              maxLength={6}
              placeholder="6-digit PIN"
              value={newAddr.pincode}
              onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
              error={formErrors.pincode}
            />
          </div>

          <Input
            label="Flat, House no., Apartment, Street"
            required
            placeholder="e.g. Flat 304, Green Heights"
            value={newAddr.addressLine}
            onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
            error={formErrors.addressLine}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              required
              placeholder="e.g. Bengaluru"
              value={newAddr.city}
              onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
              error={formErrors.city}
            />
            <Input
              label="State"
              required
              placeholder="e.g. Karnataka"
              value={newAddr.state}
              onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
              error={formErrors.state}
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
