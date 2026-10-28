import {
  Customer,
  MOCK_ADMIN_STATS,
  MOCK_CUSTOMERS,
  Order,
  OrderStatus,
  Product,
} from "../data/mockData";
import { api, ApiResponse, simulateDelay, USE_MOCK } from "./api";
import { orderService } from "./orderService";
import { productService } from "./productService";

export const adminService = {
  async getStats(): Promise<ApiResponse<typeof MOCK_ADMIN_STATS>> {
    if (USE_MOCK) {
      await simulateDelay(200);
      const orders = orderService._getAllStoredOrders();
      const pendingCount = orders.filter(
        (o) => o.status === "Placed" || o.status === "Packed"
      ).length;
      return {
        success: true,
        data: {
          ...MOCK_ADMIN_STATS,
          pendingOrders: pendingCount,
        },
        message: "Stats retrieved",
      };
    }
    const res = await api.get<ApiResponse<typeof MOCK_ADMIN_STATS>>("/admin/stats");
    return res.data;
  },

  async getAllOrders(filters?: { status?: string; search?: string }): Promise<ApiResponse<Order[]>> {
    if (USE_MOCK) {
      await simulateDelay(250);
      let list = orderService._getAllStoredOrders();
      if (filters?.status && filters.status !== "All") {
        list = list.filter((o) => o.status.toLowerCase() === filters.status?.toLowerCase());
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(
          (o) =>
            o.orderNumber.toLowerCase().includes(q) ||
            o.shippingAddress.fullName.toLowerCase().includes(q) ||
            o.shippingAddress.phone.includes(q)
        );
      }
      return {
        success: true,
        data: list,
        message: "All orders retrieved",
      };
    }
    const res = await api.get<ApiResponse<Order[]>>("/admin/orders", { params: filters });
    return res.data;
  },

  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string
  ): Promise<ApiResponse<Order | null>> {
    if (USE_MOCK) {
      await simulateDelay(300);
      const updated = orderService._adminUpdateStatus(orderId, status, trackingNumber);
      return {
        success: !!updated,
        data: updated,
        message: updated ? `Order status updated to ${status}` : "Order not found",
      };
    }
    const res = await api.patch<ApiResponse<Order>>(`/admin/orders/${orderId}/status`, {
      status,
      trackingNumber,
    });
    return res.data;
  },

  async createProduct(productData: Partial<Product>): Promise<ApiResponse<Product>> {
    if (USE_MOCK) {
      await simulateDelay(400);
      const slug =
        productData.slug ||
        (productData.name || "new-product")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        slug,
        name: productData.name || "Untitled Product",
        category: productData.category || "Sanitary Pads",
        categorySlug: productData.categorySlug || "sanitary-pads",
        price: Number(productData.price) || 299,
        mrp: Number(productData.mrp) || 399,
        variants: productData.variants || [{ id: "v1", name: "Standard Pack" }],
        stock: Number(productData.stock) || 30,
        rating: 5.0,
        reviewCount: 0,
        shortDescription: productData.shortDescription || "Gentle organic feminine care product.",
        description: productData.description || "Formulated with plant-derived non-toxic ingredients.",
        ingredients: productData.ingredients || "100% Certified Organic Cotton.",
        howToUse: productData.howToUse || "Use as directed on label.",
        isOrganic: productData.isOrganic ?? true,
        isBestseller: productData.isBestseller ?? false,
        isFeatured: productData.isFeatured ?? false,
        imageTheme: productData.imageTheme || "pads",
        reviews: [],
        active: productData.active ?? true,
      };

      productService._updateLocalProduct(newProduct);
      return {
        success: true,
        data: newProduct,
        message: "Product created successfully",
      };
    }
    const res = await api.post<ApiResponse<Product>>("/admin/products", productData);
    return res.data;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<ApiResponse<Product>> {
    if (USE_MOCK) {
      await simulateDelay(350);
      const all = productService._getAllLocalProducts();
      const idx = all.findIndex((p) => p.id === id);
      if (idx === -1) {
        return { success: false, data: null as any, message: "Product not found" };
      }
      const updated = { ...all[idx], ...updates };
      productService._updateLocalProduct(updated);
      return {
        success: true,
        data: updated,
        message: "Product updated successfully",
      };
    }
    const res = await api.put<ApiResponse<Product>>(`/admin/products/${id}`, updates);
    return res.data;
  },

  async hideProduct(id: string, hidden: boolean): Promise<ApiResponse<Product>> {
    if (USE_MOCK) {
      await simulateDelay(250);
      const all = productService._getAllLocalProducts();
      const product = all.find((p) => p.id === id);
      if (!product) {
        return { success: false, data: null as any, message: "Product not found" };
      }
      product.active = !hidden;
      productService._updateLocalProduct(product);
      return {
        success: true,
        data: product,
        message: `Product is now ${hidden ? "hidden" : "visible"} in store`,
      };
    }
    const res = await api.patch<ApiResponse<Product>>(`/admin/products/${id}/visibility`, {
      hidden,
    });
    return res.data;
  },

  async getCustomers(): Promise<ApiResponse<Customer[]>> {
    if (USE_MOCK) {
      await simulateDelay(200);
      return {
        success: true,
        data: MOCK_CUSTOMERS,
        message: "Customers retrieved",
      };
    }
    const res = await api.get<ApiResponse<Customer[]>>("/admin/customers");
    return res.data;
  },
};
