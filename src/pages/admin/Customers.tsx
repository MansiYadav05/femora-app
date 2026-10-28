import React, { useEffect, useState } from "react";
import { Users, Mail, Phone, Calendar } from "lucide-react";
import { adminService } from "../../services/adminService";
import { Customer } from "../../data/mockData";
import { formatPrice } from "../../utils/formatPrice";

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Customer Accounts | Femora Admin";

    adminService.getCustomers().then((res) => {
      if (res.success && res.data) {
        setCustomers(res.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-heading font-bold text-maroon flex items-center gap-2">
          <Users className="w-6 h-6 text-rose" />
          <span>Customer Directory</span>
        </h1>
        <p className="text-xs text-muted mt-1">
          Read-only overview of registered Femora customers, order history, and lifetime values.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-muted uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Member Since</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4 text-right">Lifetime Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-ink text-sm">
                    {cust.name}
                  </td>
                  <td className="py-3.5 px-4 text-muted">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cust.email}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-muted">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cust.phone}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-muted tabular-nums">
                    {cust.joinedDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal/10 text-teal-deep">
                      {cust.totalOrders} orders
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-maroon tabular-nums text-sm">
                    {formatPrice(cust.totalSpent)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
