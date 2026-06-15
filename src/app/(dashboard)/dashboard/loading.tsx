export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      {/* Topbar skeleton */}
      <div className="border-b border-base-content/6 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-5 w-24 bg-base-content/10 rounded" />
          <div className="h-3 w-32 bg-base-content/6 rounded hidden sm:block" />
        </div>
        <div className="h-8 w-28 bg-base-content/8 rounded-md" />
      </div>

      <div className="px-4 sm:px-5 md:px-8 py-5 md:py-6 space-y-5 md:space-y-6 max-w-7xl">
        {/* Hero + stat cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 h-52 bg-base-content/6 rounded-xl" />
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            <div className="h-24 bg-base-content/6 rounded-xl" />
            <div className="h-24 bg-base-content/6 rounded-xl" />
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-2 h-64 bg-base-content/6 rounded-xl" />
          <div className="lg:col-span-3 h-64 bg-base-content/6 rounded-xl" />
        </div>

        {/* Recent transactions */}
        <div className="h-48 bg-base-content/6 rounded-xl" />
      </div>
    </div>
  );
}
