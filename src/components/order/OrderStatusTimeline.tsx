import React from "react";
import { Check, Clock, AlertCircle } from "lucide-react";

export interface TimelineStep {
  status: string;
  timestamp: string;
  note: string;
  completed: boolean;
}

export interface OrderStatusTimelineProps {
  timeline: TimelineStep[];
  currentStatus: string;
}

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({
  timeline,
  currentStatus,
}) => {
  const isCancelled = currentStatus === "Cancelled";

  if (isCancelled) {
    return (
      <div className="p-4 bg-rose/10 border border-rose/30 rounded-xl flex items-start gap-3 text-rose">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-sm">Order Status: Cancelled</h4>
          <p className="text-xs text-ink/80 mt-1">
            This shipment was cancelled prior to carrier dispatch. Any processed payments are being refunded back to your source account within 2-3 business days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-maroon/15">
      {timeline.map((step, idx) => {
        const isCurrent = step.status === currentStatus;

        return (
          <div key={idx} className="relative flex items-start gap-4">
            {/* Step icon node */}
            <div
              className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors ${
                step.completed
                  ? "bg-teal-deep text-white ring-4 ring-white"
                  : isCurrent
                  ? "bg-maroon text-white ring-4 ring-maroon/20"
                  : "bg-maroon/15 text-muted ring-4 ring-white"
              }`}
            >
              {step.completed ? (
                <Check className="w-3 h-3" />
              ) : (
                <Clock className="w-2.5 h-2.5" />
              )}
            </div>

            {/* Step Text Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className={`text-sm font-semibold ${
                    isCurrent ? "text-maroon font-bold" : step.completed ? "text-ink" : "text-muted"
                  }`}
                >
                  {step.status}
                </span>
                {step.timestamp && (
                  <span className="text-[11px] text-muted shrink-0 tabular-nums">
                    {step.timestamp}
                  </span>
                )}
              </div>
              {step.note && (
                <p className="text-xs text-muted leading-relaxed mt-0.5">{step.note}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
