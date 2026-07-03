"use client";

interface FilterSidebarProps {
  location: string;
  setLocation: (value: string) => void;

  jobType?: string;
  setJobType?: (value: string) => void;
}

export default function FilterSidebar({
  location,
  setLocation,
  jobType = "",
  setJobType,
}: FilterSidebarProps) {
  const clearFilters = () => {
    setLocation("");

    if (setJobType) {
      setJobType("");
    }
  };

  return (
    <div className="sticky top-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">Filters</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
          <input
            type="text"
            placeholder="Hyderabad"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType?.(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Jobs</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="w-full rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}