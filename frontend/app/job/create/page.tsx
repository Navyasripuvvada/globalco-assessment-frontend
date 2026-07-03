"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/services/jobs.service";
import ProtectedRoute from "@/components/ProtectedRoute";
import Toast from "@/components/Toast";

export default function CreateJobPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-Time",
    experience: 0,
    salary: 0,
    description: "",
    requirements: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createJob({
        ...form,
        experience: Number(form.experience),
        salary: Number(form.salary),
        requirements: form.requirements
          .split(",")
          .map((item) => item.trim()),

        skills: form.skills
          .split(",")
          .map((item) => item.trim()),
      });

      setToast({ message: "Job created successfully.", type: "success" });

      router.push("/job");
    } catch (error) {
      console.error(error);
      setToast({ message: "Failed to create job.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
     <ProtectedRoute>
    <div className="max-w-4xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Post a New Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >

        {/* Job Title */}

        <div>
          <label className="block font-medium mb-2">
            Job Title
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Company */}

        <div>
          <label className="block font-medium mb-2">
            Company
          </label>

          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Location */}

        <div>
          <label className="block font-medium mb-2">
            Location
          </label>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Job Type */}

        <div>
          <label className="block font-medium mb-2">
            Job Type
          </label>

          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>
        </div>

        {/* Experience */}

        <div>
          <label className="block font-medium mb-2">
            Experience (Years)
          </label>

          <input
            type="number"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Salary */}

        <div>
          <label className="block font-medium mb-2">
            Salary
          </label>

          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Description */}

        <div>
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Requirements */}

        <div>
          <label className="block font-medium mb-2">
            Requirements
          </label>

          <textarea
            rows={3}
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            placeholder="Node.js, NestJS, MongoDB"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Skills */}

        <div>
          <label className="block font-medium mb-2">
            Skills
          </label>

          <textarea
            rows={3}
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="TypeScript, REST API, Docker"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Submit */}

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Posting Job..." : "Post Job"}
        </button>

      </form>
      {toast ? (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      ) : null}
    </div>
    </ProtectedRoute>
  );
}