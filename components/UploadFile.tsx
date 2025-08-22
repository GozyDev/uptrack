"use client";
import { useRef, useState } from "react";
import { Upload, FileText, X, Loader2, CheckCircle } from "lucide-react";

export default function ResumeUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bufffile, setBuffFile] = useState<ArrayBuffer | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const validateAndSetFile = async (selectedFile: File) => {
    // Check file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      setErrorMessage("Please upload a PDF or DOCX file");
      return;
    }

    // Check file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage("File size must be less than 5MB");
      return;
    }
    const buffselectedFile = await selectedFile.arrayBuffer();
   
    setErrorMessage("");
    setBuffFile(buffselectedFile);
    setFile(selectedFile);
    uploadFile(selectedFile);
  };

  const uploadFile = async (resumeFile:File) => {
    setUploadStatus("uploading");

    try {
      const formData = new FormData();
      formData.append("file", resumeFile);

      // In a real implementation, you would use:

      const res = await fetch("/api/uploadFile", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      console.log("Parsed Resume:", data.text);

      setUploadStatus("success");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setErrorMessage("Failed to upload resume. Please try again.");
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadStatus("idle");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Upload Your Resume
        </h1>
        <p className="text-gray-600">
          Upload your resume in PDF or DOCX format
        </p>
      </div>

      {/* Hidden input */}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".pdf,.docx"
        onChange={handleFileChange}
      />

      {/* Drag & Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
          ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : file
              ? "border-green-500 bg-green-50"
              : "border-gray-300 bg-gray-50 hover:bg-gray-100"
          }
          ${uploadStatus === "error" ? "border-red-500 bg-red-50" : ""}
        `}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploadStatus === "uploading" ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-3" />
            <p className="text-gray-700 font-medium">
              Uploading your resume...
            </p>
          </div>
        ) : uploadStatus === "success" ? (
          <div className="flex flex-col items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
            <p className="text-green-700 font-medium mb-2">
              Resume uploaded successfully!
            </p>
            <div className="flex items-center justify-center mt-2 bg-white rounded-lg p-3 shadow-sm max-w-full">
              <FileText className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
              <span className="text-gray-700 truncate">{file?.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center justify-center">
            <FileText className="w-12 h-12 text-blue-500 mb-3" />
            <p className="text-gray-700 font-medium mb-1">Selected File</p>
            <div className="flex items-center justify-center mt-2 bg-white rounded-lg p-3 shadow-sm max-w-full">
              <FileText className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" />
              <div className="text-left overflow-hidden">
                <p className="text-gray-700 truncate">{file.name}</p>
                <p className="text-gray-500 text-sm">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-700 font-medium mb-1">
              Drag & Drop your resume here
            </p>
            <p className="text-gray-500 text-sm">or</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Browse Files
            </button>
            <p className="text-gray-500 text-xs mt-4">
              Supports PDF and DOCX files up to 5MB
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-start">
          <X className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      {/* Help Text */}
      {!file && !errorMessage && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>We'll parse your resume to help you create a better profile</p>
        </div>
      )}
    </div>
  );
}
