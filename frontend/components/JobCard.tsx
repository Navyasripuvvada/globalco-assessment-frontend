"use client";

import Link from "next/link";
import {
  Building2,
  MapPin,
  IndianRupee,
  Briefcase,
} from "lucide-react";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  jobType: string;
  experience: number;
  salary: number;
  description: string;
  skills: string[];
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {job.title}
          </h2>

          <div className="flex items-center text-gray-500 mt-2">
            <Building2 size={18} />
            <span className="ml-2">{job.company}</span>
          </div>

          <div className="flex items-center text-gray-500 mt-2">
            <MapPin size={18} />
            <span className="ml-2">{job.location}</span>
          </div>
        </div>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {job.jobType}
        </span>

      </div>

      {/* Description */}

      <p className="text-gray-600 mt-5 line-clamp-3">
        {job.description}
      </p>

      {/* Salary & Experience */}

      <div className="flex gap-6 mt-5">

        <div className="flex items-center text-gray-700">
          <IndianRupee size={18} />
          <span>
            {job.salary.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <Briefcase size={18} />
          <span>{job.experience} Years</span>
        </div>

      </div>

      {/* Skills */}

      <div className="flex flex-wrap gap-2 mt-6">

        {job.skills?.slice(0, 4).map((skill) => (
          <span
            key={skill}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}

      </div>

      <div className="mt-8">
        <Link
          href={`/job/${job._id}`}
          className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition"
        >
          Apply for this job
        </Link>
      </div>

    </div>
  );
}