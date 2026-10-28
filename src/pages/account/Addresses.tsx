import React, { useEffect, useState } from "react";
import { Plus, MapPin, ShieldCheck } from "lucide-react";
import { addressService } from "../../services/addressService";
import { Address } from "../../data/mockData";
import { AddressCard } from "../../components/order/AddressCard";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { isValidPhone, isValidPincode } from "../../utils/validators";
import toast from "react-hot-toast";

export const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    pincode: "",
    addressLine: "",
    locality: "",
    city: "",
    state: "",
    type: "Home" as "Home" | "Work" | "Other",
    isDefault: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = "Femora | Saved Addresses";
    window.scrollTo(0, 0);

    loadAddresses();
  }, []);

  const loadAddresses = () => {
    setLoading(true);
    addressService.getAddresses().then((res) => {
      if (res.success && res.data) {
        setAddresses(res.data);
      }
      setLoading(false);
    });
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      fullName: "",
      phone: "",
      pincode: "",
      addressLine: "",
      locality: "",
      city: "",
      state: "",
      type: "Home",
      isDefault: addresses.length === 0,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr: Address) => {
    setEditingId(addr.id);
    setFormData({
      fullName: addr.fullName,
      phone: addr.phone,
      pincode: addr.pincode,
      addressLine: addr.addressLine,
      locality: addr.locality,
      city: addr.city,
      state: addr.state,
      type: addr.type,
      isDefault: addr.isDefault,
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this delivery address?")) {
      const res = await addressService.deleteAddress(id);
      if (res.success) {
        toast.success("Address removed");
        loadAddresses();
      }
    }
  };

  const handleSetDefault = async (id: string) => {
    const res = await addressService.setDefault(id);
    if (res.success) {
      toast.success("Default address updated");
      loadAddresses();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!isValidPhone(formData.phone)) newErrors.phone = "Enter a valid 10-digit Indian phone number";
    if (!isValidPincode(formData.pincode)) newErrors.pincode = "Enter a valid 6-digit Indian PIN code";
    if (!formData.addressLine.trim()) newErrors.addressLine = "House / Flat / Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingId) {
      const res = await addressService.updateAddress(editingId, formData);
      if (res.success) {
        toast.success("Address updated successfully");
        setIsModalOpen(false);
        loadAddresses();
      }
    } else {
      const res = await addressService.addAddress(formData);
      if (res.success) {
        toast.success("Address added successfully");
        setIsModalOpen(false);
        loadAddresses();
      }
    }
  };

  return (
    <div className="min-h-screen bg-cream py-6 md:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Breadcrumbs items={[{ label: "My Account" }, { label: "Saved Addresses" }]} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-maroon/10">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-maroon flex items-center gap-2.5">
              <MapPin className="w-6 h-6 text-rose" />
              <span>Saved Delivery Addresses</span>
            </h1>
            <p className="text-xs text-muted mt-1">
              Save your residence, work, or hostel locations for quick 1-click discreet dispatch.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleOpenAdd}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add New Address
          </Button>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Edit Delivery Address" : "Add New Delivery Address"}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
          <Input
            label="Full Name"
            required
            placeholder="e.g. Pooja Sharma"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={errors.fullName}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Phone Number"
              required
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
            />
            <Input
              label="Pincode"
              required
              maxLength={6}
              placeholder="6-digit Indian PIN"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              error={errors.pincode}
            />
          </div>

          <Input
            label="Flat, Building, Street Address"
            required
            placeholder="e.g. Flat 402, Lotus Greens, 14th Main"
            value={formData.addressLine}
            onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
            error={errors.addressLine}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="City"
              required
              placeholder="e.g. Bengaluru"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              error={errors.city}
            />
            <Input
              label="State"
              required
              placeholder="e.g. Karnataka"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              error={errors.state}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-ink/80 mb-1.5">
              Address Type
            </label>
            <div className="flex gap-4">
              {(["Home", "Work", "Other"] as const).map((t) => (
                <label key={t} className="flex items-center gap-1.5 text-xs text-ink cursor-pointer">
                  <input
                    type="radio"
                    name="addressType"
                    checked={formData.type === t}
                    onChange={() => setFormData({ ...formData, type: t })}
                    className="accent-maroon"
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingId ? "Update Address" : "Save Address"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
