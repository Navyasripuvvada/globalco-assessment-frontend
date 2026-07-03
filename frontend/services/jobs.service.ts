import { get, post, patch, remove } from "./api";


export const getJobs = async (params?: {
  search?: string;
  location?: string;
  jobType?: string;
  page?: number;
  limit?: number;
  sort?: string;
}) => {
  return await get("/jobs", params);
};

export const getJobById = async (id: string) => {
  return await get(`/jobs/${id}`);
};


export const createJob = async (data: {
  title: string;
  company: string;
  location: string;
  jobType: string;
  experience: number;
  salary: number;
  description: string;
  requirements: string[];
  skills: string[];
}) => {
  return await post("/jobs", data);
};


export const updateJob = async (id: string, data: any) => {
  return await patch(`/jobs/${id}`, data);
};


export const deleteJob = async (id: string) => {
  return await remove(`/jobs/${id}`);
};
