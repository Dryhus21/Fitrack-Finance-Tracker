export default function TransactionsLoading() {
  return (
    <div className="animate-pulse">
      {/* Topbar skeleton */}
      <div className="border-b border-base-content/6 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-5 w-28 bg-base-content/10 rounded" />
          <div className="h-3 w-36 bg-base-content/6 rounded hidden sm:block" />
        </div>
        <div className="h-8 w-28 bg-base-content/8 rounded-md" />
      </div>

      <div className="px-4 sm:px-5 md:px-8 py-5 md:py-6 max-w-7xl space-y-4">
        {/* Search + filter bar */}
        <div className="flex gap-3">
          <div className="h-10 flex-1 bg-base-content/6 rounded-md" />
          <div className="h-10 w-32 bg-base-content/6 rounded-md" />
          <div className="h-10 w-28 bg-base-content/8 rounded-md" />
        </div>

        {/* Table rows */}
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-14 bg-base-content/5 rounded-lg"
              style={{ opacity: 1 - i * 0.12 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
