interface SaleBadgeProps {
  percentage: number;
}

export default function SaleBadge({ percentage }: SaleBadgeProps) {
  return (
    <div className="absolute top-3 left-3 z-10">
      <span className="bg-qalb-gold text-qalb-black text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider uppercase">
        -{percentage}%
      </span>
    </div>
  );
}
