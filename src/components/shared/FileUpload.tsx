import React, { useState, useRef } from 'react';
import { Upload, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface FileUploadProps {
  onUploadComplete: (url: string, fileName: string) => void;
  acceptedTypes?: string;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  acceptedTypes = '.pdf,.docx,.doc,.zip,.jpg,.png',
  label = 'Upload Materials, Reports, or Files',
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setProgress(0);
    setError(null);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile(file.name);
          // Let's pass a simulated URL
          const simulatedUrl = `https://uet-portal.edu.pk/files/uploads/${Date.now()}_${file.name}`;
          onUploadComplete(simulatedUrl, file.name);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      simulateUpload(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      simulateUpload(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full" id="file-upload-container">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`w-full min-h-[140px] px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center text-center ${
          isDragActive
            ? 'border-[rgb(var(--university-accent))] bg-amber-50/20 dark:bg-amber-950/20'
            : uploadedFile
            ? 'border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/10'
            : 'border-slate-200 dark:border-slate-800 hover:border-[rgb(var(--university-primary))] dark:hover:border-slate-700'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedTypes}
          onChange={handleChange}
        />

        {isUploading ? (
          <div className="w-full max-w-[240px] space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Uploading document...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-[rgb(var(--university-primary))] dark:bg-[rgb(var(--university-accent))] h-full rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        ) : uploadedFile ? (
          <div className="flex flex-col items-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{uploadedFile}</p>
            <p className="text-xs text-slate-400">Click or drag another to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-full text-slate-400">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Drag & drop your file here, or <span className="text-[rgb(var(--university-accent))] font-medium underline">browse</span>
            </p>
            <p className="text-[10px] text-slate-400">Supported: PDF, DOCX, ZIP, JPG, PNG</p>
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center space-x-1.5 mt-2 text-rose-500 text-xs">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
