export default function ProductSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
          <div className="aspect-[4/5] bg-qalb-black/5" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-qalb-black/5 rounded w-3/4" />
            <div className="h-3 bg-qalb-black/5 rounded w-1/4" />
            <div className="h-3 bg-qalb-black/5 rounded w-1/3" />
            <div className="h-9 bg-qalb-black/5 rounded w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
