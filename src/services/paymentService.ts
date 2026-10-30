import { api, ApiResponse, simulateDelay, USE_MOCK } from "./api";

export interface PaymentIntent {
  paymentId: string;
  orderId?: string;
  amount: number;
  currency: string;
  method: "UPI" | "Credit/Debit Card" | "Cash on Delivery";
  status: "created" | "completed" | "failed";
}

export const paymentService = {
  async createPayment(params: {
    amount: number;
    method: "UPI" | "Credit/Debit Card" | "Cash on Delivery";
    orderId?: string;
  }): Promise<ApiResponse<PaymentIntent>> {
    if (USE_MOCK) {
      await simulateDelay(300);
      const paymentIntent: PaymentIntent = {
        paymentId: `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        orderId: params.orderId,
        amount: params.amount,
        currency: "INR",
        method: params.method,
        status: params.method === "Cash on Delivery" ? "completed" : "created",
      };
      return {
        success: true,
        data: paymentIntent,
        message: "Payment initiated",
      };
    }

    const res = await api.post<ApiResponse<PaymentIntent>>("/payments", params);
    return res.data;
  },

  async verifyPayment(paymentId: string): Promise<ApiResponse<{ verified: boolean }>> {
    if (USE_MOCK) {
      await simulateDelay(400);
      return {
        success: true,
        data: { verified: true },
        message: "Payment verified successfully",
      };
    }

    const res = await api.get<ApiResponse<{ verified: boolean }>>(`/payments/${paymentId}/verify`);
    return res.data;
  },
};
