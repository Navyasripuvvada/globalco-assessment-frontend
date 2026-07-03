"use client";

import { useEffect, useState } from "react";
import { getJobs } from "@/services/jobs.service";

import ProtectedRoute from "@/components/ProtectedRoute";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const [page, setPage] = useState(1);

  const limit = 6;

  useEffect(() => {
    fetchJobs();
  }, [search, location, jobType]);

  const extractJobs = (data: any) => {
    if (Array.isArray(data)) return data;
    if (!data || typeof data !== "object") return [];

    const candidates = [
      data.jobs,
      data.data,
      data.results,
      data.docs,
      data.data?.jobs,
      data.data?.results,
      data.data?.docs,
      data.result,
      data.payload,
    ];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) return candidate;
    }

    const objectKeys = Object.keys(data);
    for (const key of objectKeys) {
      if (Array.isArray(data[key])) return data[key];
    }

    return [];
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await getJobs({
        search,
        location,
        jobType,
      });

      const normalizedJobs = extractJobs(data);

      if (!normalizedJobs.length && data) {
        console.warn("Jobs response received but no array extracted:", data);
      }

      setJobs(normalizedJobs);
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const start = (page - 1) * limit;
  const end = start + limit;

  const currentJobs = jobs.slice(start, end);

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <section className="rounded-[32px] bg-slate-950 px-8 py-10 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Job search</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Discover top jobs in your field.
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-300">
              Quickly filter opportunities, compare roles, and apply with confidence—all from one modern dashboard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:w-auto">
            <div className="rounded-3xl bg-slate-900 px-6 py-5 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Open roles</p>
              <p className="mt-3 text-3xl font-semibold text-white">{jobs.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-900 px-6 py-5 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Showing</p>
              <p className="mt-3 text-3xl font-semibold text-white">{currentJobs.length}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-10 rounded-[32px] bg-white p-8 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={search} onChange={setSearch} />
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            {(search || location || jobType) && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setLocation("");
                  setJobType("");
                  setPage(1);
                }}
                className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Reset filters
              </button>
            )}
            <span>{jobs.length} total roles</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mt-8">
          <FilterSidebar
            location={location}
            setLocation={setLocation}
            jobType={jobType}
            setJobType={setJobType}
          />

          <div className="lg:col-span-3">
            {loading ? (
              <Loader />
            ) : currentJobs.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  {currentJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>

                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(jobs.length / limit)}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>

  );
}