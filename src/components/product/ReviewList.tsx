import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Review } from "../../data/mockData";
import { Rating } from "../ui/Rating";

export interface ReviewListProps {
  reviews: Review[];
  overallRating: number;
  totalCount: number;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  overallRating,
  totalCount,
}) => {
  return (
    <div className="space-y-6">
      {/* Rating Snapshot Card */}
      <div className="p-5 bg-white rounded-2xl border border-maroon/10 shadow-femora flex flex-col sm:flex-row items-center gap-6 justify-between">
        <div className="text-center sm:text-left">
          <div className="flex items-baseline gap-2 justify-center sm:justify-start">
            <span className="text-4xl font-bold font-heading text-maroon tabular-nums">
              {overallRating.toFixed(1)}
            </span>
            <span className="text-sm text-muted">/ 5.0</span>
          </div>
          <div className="mt-1">
            <Rating score={overallRating} count={totalCount} size="md" />
          </div>
          <p className="text-xs text-muted mt-1">Based on {totalCount} verified buyer reviews</p>
        </div>

        {/* 100% Skin Friendly Verification Seal */}
        <div className="bg-blush-bg/50 p-3.5 rounded-xl border border-blush/40 text-xs text-ink/80 max-w-xs space-y-1">
          <div className="flex items-center gap-1.5 text-teal-deep font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Verified Period Care Reviews</span>
          </div>
          <p className="text-[11px] text-muted leading-tight">
            All reviews reflect authentic feedback from menstruators using Femora products across India.
          </p>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8 text-sm text-muted bg-white rounded-xl border border-maroon/10">
          No written customer reviews yet for this variant. Be the first to try it!
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 bg-white rounded-xl border border-maroon/10 shadow-xs space-y-2 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-ink">{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-teal-deep bg-teal/10 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3 text-teal" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted">{rev.date}</span>
              </div>

              <Rating score={rev.rating} showCount={false} size="sm" />

              {rev.title && (
                <h4 className="font-semibold text-sm text-ink pt-1">{rev.title}</h4>
              )}

              <p className="text-xs md:text-sm text-muted leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
