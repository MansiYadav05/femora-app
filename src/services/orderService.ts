import { Order, OrderStatus } from "../data/mockData";
import { api, ApiResponse, simulateDelay, USE_MOCK } from "./api";

const STORAGE_KEY_ORDERS = "femora_orders";

function getStoredOrders(): Order[] {
  const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
  if (!raw) return [];
  try {
    const stored = JSON.parse(raw) as Order[];
    const sampleOrderNumbers = new Set(["FEM-82914", "FEM-83002", "FEM-83115", "FEM-83240", "FEM-82450"]);
    const orders = stored.filter((order) => !sampleOrderNumbers.has(order.orderNumber));
    if (orders.length !== stored.length) saveStoredOrders(orders);
    return orders;
  } catch {
    return [];
  }
}

function saveStoredOrders(orders: Order[]) {
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
}

export const orderService = {
  async getOrders(statusFilter?: string): Promise<ApiResponse<Order[]>> {
    if (USE_MOCK) {
      await simulateDelay(250);
      let list = getStoredOrders();
      if (statusFilter && statusFilter !== "All") {
        list = list.filter((o) => o.status.toLowerCase() === statusFilter.toLowerCase());
      }
      return {
        success: true,
        data: list,
        message: "Orders retrieved",
      };
    }
    const res = await api.get<ApiResponse<Order[]>>("/orders", {
      params: { status: statusFilter },
    });
    return res.data;
  },

  async getOrder(id: string): Promise<ApiResponse<Order | null>> {
    if (USE_MOCK) {
      await simulateDelay(200);
      const orders = getStoredOrders();
      const order = orders.find(
        (o) => o.id === id || o.orderNumber.toLowerCase() === id.toLowerCase()
      ) || null;
      return {
        success: !!order,
        data: order,
        message: order ? "Order details retrieved" : "Order not found",
      };
    }
    const res = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return res.data;
  },

  async placeOrder(
    orderData: Omit<Order, "id" | "orderNumber" | "date" | "timeline" | "status" | "estimatedDelivery">
  ): Promise<ApiResponse<Order>> {
    if (USE_MOCK) {
      await simulateDelay(500);
      const orders = getStoredOrders();
      const randomId = Math.floor(10000 + Math.random() * 90000);
      const orderNumber = `FEM-${randomId}`;
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0];

      // Estimated delivery date (3 days later)
      const estDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
      const estStr = estDate.toISOString().split("T")[0];

      const newOrder: Order = {
        ...orderData,
        id: `ord-${randomId}`,
        orderNumber,
        date: dateStr,
        status: "Placed",
        trackingNumber: `TRK-IN-${randomId}`,
        estimatedDelivery: estStr,
        timeline: [
          {
            status: "Placed",
            timestamp: `${dateStr} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            note: orderData.discreetPackaging
              ? "Order confirmed with 100% discreet packaging"
              : "Order confirmed",
            completed: true,
          },
          {
            status: "Packed",
            timestamp: "",
            note: "Preparing package for dispatch",
            completed: false,
          },
          {
            status: "Shipped",
            timestamp: "",
            note: "Carrier pickup scheduled",
            completed: false,
          },
          {
            status: "Out for delivery",
            timestamp: "",
            note: "Delivery route assigned",
            completed: false,
          },
          {
            status: "Delivered",
            timestamp: "",
            note: "Handover to recipient in neutral packaging",
            completed: false,
          },
        ],
      };

      orders.unshift(newOrder);
      saveStoredOrders(orders);

      return {
        success: true,
        data: newOrder,
        message: "Your order has been received and confirmed.",
      };
    }

    const res = await api.post<ApiResponse<Order>>("/orders", orderData);
    return res.data;
  },

  async cancelOrder(id: string, reason?: string): Promise<ApiResponse<Order>> {
    if (USE_MOCK) {
      await simulateDelay(350);
      const orders = getStoredOrders();
      const idx = orders.findIndex((o) => o.id === id || o.orderNumber === id);
      if (idx === -1) {
        return { success: false, data: null as any, message: "Order not found" };
      }

      const order = orders[idx];
      if (order.status !== "Placed" && order.status !== "Packed") {
        return {
          success: false,
          data: order,
          message: "Order cannot be cancelled once dispatched with courier.",
        };
      }

      order.status = "Cancelled";
      order.timeline.push({
        status: "Cancelled",
        timestamp: new Date().toLocaleString(),
        note: reason || "Cancelled by customer before dispatch. Refund will be credited within 2-3 business days.",
        completed: true,
      });

      orders[idx] = order;
      saveStoredOrders(orders);

      return {
        success: true,
        data: order,
        message: "Order has been successfully cancelled.",
      };
    }

    const res = await api.post<ApiResponse<Order>>(`/orders/${id}/cancel`, { reason });
    return res.data;
  },

  async trackOrder(orderNumber: string, phone: string): Promise<ApiResponse<Order | null>> {
    if (USE_MOCK) {
      await simulateDelay(400);
      const orders = getStoredOrders();
      const cleanPhone = phone.replace(/[\s\-+()]/g, "").slice(-10);
      const cleanOrderNum = orderNumber.trim().toUpperCase();

      const matched = orders.find((o) => {
        const orderMatch =
          o.orderNumber.toUpperCase() === cleanOrderNum ||
          o.id.toUpperCase() === cleanOrderNum ||
          o.trackingNumber?.toUpperCase() === cleanOrderNum;
        const phoneMatch = o.shippingAddress.phone.replace(/[\s\-+()]/g, "").slice(-10) === cleanPhone;
        return orderMatch && phoneMatch;
      });

      if (!matched) {
        return {
          success: false,
          data: null,
          message: "No order found matching this order number and phone combination. Please check the details and try again.",
        };
      }

      return {
        success: true,
        data: matched,
        message: "Shipment status found",
      };
    }

    const res = await api.get<ApiResponse<Order>>("/orders/track", {
      params: { orderNumber, phone },
    });
    return res.data;
  },

  // Helper for admin updates
  _adminUpdateStatus(orderId: string, newStatus: OrderStatus, trackingNumber?: string): Order | null {
    const orders = getStoredOrders();
    const idx = orders.findIndex((o) => o.id === orderId || o.orderNumber === orderId);
    if (idx === -1) return null;

    const order = orders[idx];
    order.status = newStatus;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    // Update timeline
    const foundStep = order.timeline.find((t) => t.status === newStatus);
    if (foundStep) {
      foundStep.completed = true;
      foundStep.timestamp = new Date().toLocaleString();
    } else {
      order.timeline.push({
        status: newStatus,
        timestamp: new Date().toLocaleString(),
        note: `Status updated to ${newStatus}`,
        completed: true,
      });
    }

    orders[idx] = order;
    saveStoredOrders(orders);
    return order;
  },

  _getAllStoredOrders(): Order[] {
    return getStoredOrders();
  },
};
