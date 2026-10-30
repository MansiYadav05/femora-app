import { Address } from "../data/mockData";
import { api, ApiResponse, simulateDelay, USE_MOCK } from "./api";

const STORAGE_KEY_ADDRESSES = "femora_addresses";

function getStoredAddresses(): Address[] {
  const raw = localStorage.getItem(STORAGE_KEY_ADDRESSES);
  if (!raw) return [];
  try {
    const stored = JSON.parse(raw) as Address[];
    const addresses = stored.filter((address) => !["addr-1", "addr-2", "addr-3"].includes(address.id));
    if (addresses.length !== stored.length) saveStoredAddresses(addresses);
    return addresses;
  } catch {
    return [];
  }
}

function saveStoredAddresses(addresses: Address[]) {
  localStorage.setItem(STORAGE_KEY_ADDRESSES, JSON.stringify(addresses));
}

export const addressService = {
  async getAddresses(): Promise<ApiResponse<Address[]>> {
    if (USE_MOCK) {
      await simulateDelay(200);
      return {
        success: true,
        data: getStoredAddresses(),
        message: "Addresses fetched",
      };
    }
    const res = await api.get<ApiResponse<Address[]>>("/addresses");
    return res.data;
  },

  async addAddress(addressData: Omit<Address, "id">): Promise<ApiResponse<Address>> {
    if (USE_MOCK) {
      await simulateDelay(300);
      const addresses = getStoredAddresses();
      const newAddress: Address = {
        ...addressData,
        id: `addr-${Date.now()}`,
      };
      if (newAddress.isDefault || addresses.length === 0) {
        addresses.forEach((a) => (a.isDefault = false));
        newAddress.isDefault = true;
      }
      addresses.push(newAddress);
      saveStoredAddresses(addresses);
      return {
        success: true,
        data: newAddress,
        message: "Address added successfully",
      };
    }
    const res = await api.post<ApiResponse<Address>>("/addresses", addressData);
    return res.data;
  },

  async updateAddress(id: string, addressData: Partial<Address>): Promise<ApiResponse<Address>> {
    if (USE_MOCK) {
      await simulateDelay(250);
      const addresses = getStoredAddresses();
      const idx = addresses.findIndex((a) => a.id === id);
      if (idx === -1) {
        return { success: false, data: null as any, message: "Address not found" };
      }
      if (addressData.isDefault) {
        addresses.forEach((a) => (a.isDefault = false));
      }
      addresses[idx] = { ...addresses[idx], ...addressData };
      saveStoredAddresses(addresses);
      return {
        success: true,
        data: addresses[idx],
        message: "Address updated successfully",
      };
    }
    const res = await api.put<ApiResponse<Address>>(`/addresses/${id}`, addressData);
    return res.data;
  },

  async deleteAddress(id: string): Promise<ApiResponse<boolean>> {
    if (USE_MOCK) {
      await simulateDelay(200);
      const addresses = getStoredAddresses();
      const filtered = addresses.filter((a) => a.id !== id);
      if (filtered.length > 0 && !filtered.some((a) => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      saveStoredAddresses(filtered);
      return {
        success: true,
        data: true,
        message: "Address removed",
      };
    }
    const res = await api.delete<ApiResponse<boolean>>(`/addresses/${id}`);
    return res.data;
  },

  async setDefault(id: string): Promise<ApiResponse<Address[]>> {
    if (USE_MOCK) {
      await simulateDelay(150);
      const addresses = getStoredAddresses();
      addresses.forEach((a) => {
        a.isDefault = a.id === id;
      });
      saveStoredAddresses(addresses);
      return {
        success: true,
        data: addresses,
        message: "Default address updated",
      };
    }
    const res = await api.patch<ApiResponse<Address[]>>(`/addresses/${id}/default`);
    return res.data;
  },
};
