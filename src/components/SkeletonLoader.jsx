export function ProfileSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-white rounded-2xl border border-zinc-100 shadow-sm p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-28 h-28 rounded-full skeleton-shimmer shrink-0" />
        <div className="flex-1 space-y-4 w-full">
          <div className="h-7 w-48 skeleton-shimmer rounded mx-auto sm:mx-0" />
          <div className="h-4 w-32 skeleton-shimmer rounded mx-auto sm:mx-0" />
          <div className="h-4 w-full skeleton-shimmer rounded" />
          <div className="h-4 w-3/4 skeleton-shimmer rounded" />
          <div className="flex gap-4 justify-center sm:justify-start">
            <div className="h-4 w-28 skeleton-shimmer rounded" />
            <div className="h-4 w-28 skeleton-shimmer rounded" />
            <div className="h-4 w-20 skeleton-shimmer rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="flex justify-center gap-6 mt-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-zinc-100 shadow-sm min-w-[130px]">
          <div className="h-8 w-16 skeleton-shimmer rounded" />
          <div className="h-4 w-20 skeleton-shimmer rounded" />
        </div>
      ))}
    </div>
  );
}

export function ReposGridSkeleton() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-8">
      <div className="h-6 w-40 skeleton-shimmer rounded mb-5" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 bg-white rounded-xl border border-zinc-100 shadow-sm space-y-3">
            <div className="h-5 w-3/4 skeleton-shimmer rounded" />
            <div className="h-4 w-full skeleton-shimmer rounded" />
            <div className="h-4 w-2/3 skeleton-shimmer rounded" />
            <div className="flex gap-4 pt-2">
              <div className="h-4 w-16 skeleton-shimmer rounded" />
              <div className="h-4 w-16 skeleton-shimmer rounded" />
              <div className="h-4 w-20 skeleton-shimmer rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}