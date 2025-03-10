"use client";
import { createContext, useContext, useState } from "react";

import type { ReactNode, SetStateAction } from "react";

type ResumeContextProps = {
  files: File[]; // Array of File objects
  setFiles: (fileInput: SetStateAction<File[]>) => void; // Function to set the files state
  progress: number;
  setProgress: (progressInput: number) => void;
  isUploading: boolean;
  setIsUploading: (progressInput: boolean) => void;
  previews: string[]; // Array of string URLs for image previews
  setPreviews: (previewInput: SetStateAction<string[]>) => void;
};

// Create the context
const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

interface ResumeProviderProps {
  children: ReactNode;
}

const ResumeProvider: React.FC<ResumeProviderProps> = ({ children }) => {
  const [files, setFiles] = useState<File[]>([]); // Store multiple files
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previews, setPreviews] = useState<string[]>([]); // Store previews for multiple images

  const appContextValue: ResumeContextProps = {
    files,
    setFiles,
    progress,
    setProgress,
    isUploading,
    setIsUploading,
    previews,
    setPreviews,
  };

  return (
    <ResumeContext.Provider value={appContextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

// Custom hook
const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within an ResumeProvider");
  }
  return context;
};

export { ResumeProvider, useResumeContext };
