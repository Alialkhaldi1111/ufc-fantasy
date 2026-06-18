import { Star } from 'lucide-react';

export interface Review {
  name: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified?: boolean;
  avatar?: string;
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#39FF14] to-cyan-400 flex items-center justify-center font-bold text-black text-sm">
          {review.name[0]}
        </div>
        <div>
          <div className="font-semibold text-white text-sm">{review.name}</div>
          <div className="text-xs text-gray-500">{review.date}</div>
        </div>
        {review.verified && (
          <span className="ml-auto text-xs text-[#39FF14] bg-[#39FF14]/10 px-2 py-0.5 rounded-full">
            ✓ Verified
          </span>
        )}
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
          />
        ))}
      </div>
      <div className="font-semibold text-white text-sm">{review.title}</div>
      <p className="text-gray-300 text-sm leading-relaxed">{review.body}</p>
    </div>
  );
}
