export type Job = {
  id: string;
  title: string;
  companyName: string;
  applicationLink: string;
  minSalary?: number | null;
  maxSalary?: number | null;
  jobType?: string;
};

