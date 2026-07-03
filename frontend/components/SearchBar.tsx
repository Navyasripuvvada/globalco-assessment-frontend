"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="mb-6 rounded-[28px] border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:border-blue-300">
      <div className="flex items-center gap-3">
        <Search className="h-5 w-5 text-slate-500" />
        <input
          type="text"
          placeholder="Search by job title, company, or skill..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search jobs"
          className="w-full border-none bg-transparent text-slate-800 placeholder:text-slate-400 focus:ring-0"
        />
      </div>
    </div>
  );
}