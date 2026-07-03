"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import Toast from "@/components/Toast";
import {
  getJobById,
  updateJob,
} from "@/services/jobs.service";

export default function EditJobPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    experience: 0,
    salary: 0,
    description: "",
    requirements: "",
    skills: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const job = await getJobById(id as string);

      setForm({
        title: job.title,
        company: job.company,
        location: job.location,
        jobType: job.jobType,
        experience: job.experience,
        salary: job.salary,
        description: job.description,
        requirements: job.requirements.join(", "),
        skills: job.skills.join(", "),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateJob(id as string, {
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

      setToast({ message: "Job updated successfully.", type: "success" });

      router.push("/job");
    } catch (error) {
      console.error(error);
      setToast({ message: "Failed to update job.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className="max-w-4xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8">
        Edit Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 space-y-5"
      >

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border rounded-lg p-3"
        />

        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

        <input
          type="number"
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="number"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={5}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          placeholder="Requirements"
          rows={3}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills"
          rows={3}
          className="w-full border rounded-lg p-3"
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          {loading ? "Updating..." : "Update Job"}
        </button>

      </form>
      {toast ? (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      ) : null}
    </div>
    </ProtectedRoute>
  );
}