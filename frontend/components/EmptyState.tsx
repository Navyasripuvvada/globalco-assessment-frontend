import { SearchX } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="text-center py-20">
      <SearchX className="mx-auto h-14 w-14 text-gray-400" />

      <h2 className="mt-4 text-2xl font-bold text-gray-700">
        No Jobs Found
      </h2>

      <p className="mt-2 text-gray-500">
        Try changing your search or filter criteria.
      </p>
    </div>
  );
}