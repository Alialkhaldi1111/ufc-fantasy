interface ReviewCardProps {
  name: string;
  avatar?: string;
  rating?: number;
  date: string;
  body: string;
  verified?: boolean;
  title?: string;
}

export function ReviewCard({
  name,
  rating = 5,
  date,
  body,
  verified = true,
  title,
}: ReviewCardProps) {
  return (
    <div className="bg-[#0f1520] border border-white/10 rounded-xl p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#39FF14]/30 to-[#39FF14]/10 flex items-center justify-center text-white font-bold text-sm">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{name}</p>
            <p className="text-white/40 text-xs">{date}</p>
          </div>
        </div>
        {verified && (
          <span className="text-xs bg-[#39FF14]/10 text-[#39FF14] px-2 py-0.5 rounded-full">
            Verified Purchase
          </span>
        )}
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? 'text-yellow-400' : 'text-white/20'}>
            ★
          </span>
        ))}
      </div>
      {title && <p className="font-semibold text-white">{title}</p>}
      <p className="text-white/70 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
