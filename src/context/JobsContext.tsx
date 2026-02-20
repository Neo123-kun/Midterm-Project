import { createContext, useContext, useState, ReactNode } from 'react';
import { Job } from '../types/job';

type JobsContextType = {
  savedJobs: Job[];
  saveJob: (job: Job) => void;
  removeJob: (id: string) => void;
};

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  const saveJob = (job: Job) => {
    setSavedJobs((prev) => {
      // prevent duplicate
      if (prev.find((j) => j.id === job.id)) {
        return prev;
      }
      return [...prev, job];
    });
  };

  const removeJob = (id: string) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <JobsContext.Provider value={{ savedJobs, saveJob, removeJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used inside JobsProvider');
  }
  return context;
};
