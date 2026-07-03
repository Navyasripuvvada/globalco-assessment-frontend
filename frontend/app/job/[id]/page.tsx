"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Building2,
  IndianRupee,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

import { getJobById } from "@/services/jobs.service";
import Loader from "@/components/Loader";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  experience: number;
  salary: number;
  description: string;
  requirements: string[];
  skills: string[];
}

export default function JobDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchJob();
  }, []);

  const normalizeJob = (data: any) => {
    const rawData = data?.data ?? data?.job ?? data ?? {};

    const requirements = Array.isArray(rawData.requirements)
      ? rawData.requirements
      : typeof rawData.requirements === "string"
      ? rawData.requirements.split(",").map((item: string) => item.trim()).filter(Boolean)
      : [];

    const skills = Array.isArray(rawData.skills)
      ? rawData.skills
      : typeof rawData.skills === "string"
      ? rawData.skills.split(",").map((item: string) => item.trim()).filter(Boolean)
      : [];

    return {
      _id: rawData._id ?? rawData.id ?? id,
      title: rawData.title ?? rawData.name ?? "Untitled Role",
      company: rawData.company ?? rawData.employer ?? "Unknown Company",
      location: rawData.location ?? rawData.city ?? "Remote",
      jobType: rawData.jobType ?? rawData.type ?? "Not specified",
      experience: rawData.experience != null ? Number(rawData.experience) : 0,
      salary: rawData.salary != null ? Number(rawData.salary) : 0,
      description:
        rawData.description ?? rawData.details ?? "No description provided.",
      requirements,
      skills,
    };
  };

  const fetchJob = async () => {
    try {
      const data = await getJobById(id);
      setJob(normalizeJob(data));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    setIsApplying(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsApplying(false);
    setApplied(true);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  if (loading) return <Loader />;

  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Job Not Found</h2>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto px-6 py-10">

      <Link
        href="/job"
        className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-8"
      >
        <ArrowLeft size={18} />
        Back to Jobs
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}

        <div className="flex justify-between items-start">

          <div>

            <h1 className="text-4xl font-bold">
              {job.title}
            </h1>

            <div className="flex items-center gap-2 mt-5 text-gray-600">
              <Building2 size={18} />
              {job.company}
            </div>

            <div className="flex items-center gap-2 mt-3 text-gray-600">
              <MapPin size={18} />
              {job.location}
            </div>

          </div>

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            {job.jobType}
          </span>

        </div>

        {/* Salary & Experience */}

        <div className="flex gap-8 mt-8">

          <div className="flex items-center gap-2">
            <IndianRupee />
            <span className="font-semibold">
              ₹ {job.salary != null ? job.salary.toLocaleString() : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase />
            <span>{job.experience != null ? `${job.experience} Years Experience` : "Experience not specified"}</span>
          </div>

        </div>

        {/* Description */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Job Description
          </h2>

          <p className="text-gray-700 leading-8">
            {job.description}
          </p>

        </div>

        {/* Requirements */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Requirements
          </h2>

          {job.requirements && job.requirements.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No specific requirements listed for this role.</p>
          )}

        </div>

        {/* Skills */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Skills Required
          </h2>

          {job.skills && job.skills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No skills specified for this job.</p>
          )}

        </div>

        {/* Action Buttons */}

        <div className="mt-12">
          <button
            type="button"
            onClick={handleApply}
            disabled={applied || isApplying}
            className="w-full rounded-xl bg-emerald-600 py-4 text-lg font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {isApplying ? "Applying..." : applied ? "Applied" : "Apply Now"}
          </button>
        </div>

        {showToast && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 shadow-sm">
            Application submitted successfully! We&apos;ll contact you soon.
          </div>
        )}

      </div>

    </div>
    </ProtectedRoute>
  );
}