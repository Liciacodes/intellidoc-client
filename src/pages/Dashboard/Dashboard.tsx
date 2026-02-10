import { useEffect, useRef, useState } from "react";
import { useDocumentStore } from "../../store/useDocumentStore";
import { useUserStore } from "../../store/useUserStore";
import { createApiEndpoint } from "../../config/api";

interface UploadedFile {
  id: string;
  title: string;
  size: number;
  type: string;
  file: File;
}

const Dashboard: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { addDocuments, documents: storedDocuments } = useDocumentStore();
  const { user } = useUserStore();

  useEffect(() => {
    const fetchRecentDocument = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching recent documents for dashboard');

        const response = await fetch(createApiEndpoint('api/documents'), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const docs = await response.json();
          addDocuments(docs);
        } else {
          console.log('Failed to fetch document');
        }
      } catch (error) {
        console.log('Error fetching documents', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentDocument();
  }, [addDocuments]);

  const aiTools = [
    {
      name: "Summarize",
      icon: "summarize",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
      desc: "Get a concise summary of any document.",
    },
    {
      name: "Draft New Doc",
      icon: "edit_document",
      bgColor: "bg-green-500/10",
      textColor: "text-green-500",
      desc: "Start a new document with AI assistance.",
      disabled: true, // Mark as coming soon
    },
    {
      name: "Ask about a Doc",
      icon: "quiz",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-500",
      desc: "Ask questions and get answers from your docs.",
    },
  ];

  const uploadFileToBackend = async (file: File, title: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to upload files.');
        return null;
      }
      const response = await fetch(
        "http://localhost:5000/api/documents/uploads",
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload file");
      }

      const result = await response.json();
      console.log("File uploaded successfully:", result);
      return result;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(`Error uploading ${file.name}: ${error}`);
      return null;
    }
  };

  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ];
    return allowedTypes.includes(file.type);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const newLocalFiles: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        validFiles.push(file);
        newLocalFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          title: file.name,
          size: file.size,
          type: file.type,
          file: file,
        });
      } else {
        alert(`File type not supported: ${file.name}`);
      }
    });

    setUploadedFiles((prev) => [...prev, ...newLocalFiles]);

    for (const file of validFiles) {
      const uploadedDoc = await uploadFileToBackend(file, file.name);

      if (uploadedDoc) {
        addDocuments([uploadedDoc]);
        console.log('Backend response:', uploadedDoc);
      }
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
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <>
      {/* Material Symbols Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />

      <div className="w-full">
        {/* Page Heading - Responsive */}
        <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-2xl md:text-3xl font-bold leading-tight">
              Welcome back, {user?.name || 'Olivia'}!
            </p>
            <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm md:text-base font-normal">
              Here's a summary of your recent activity and tools.
            </p>
          </div>
        </div>

        {/* Main Grid - Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column: Recent Docs + AI Actions (Desktop) */}
          <div className="lg:col-span-2 space-y-8 md:space-y-10">
            {/* Recent Documents */}
            <div>
              <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-lg md:text-xl font-bold mb-3 md:mb-4">
                Your Recent Documents
              </h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm">
                    Loading documents...
                  </p>
                </div>
              ) : storedDocuments.length === 0 ? (
                <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
                  <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                    folder_open
                  </span>
                  <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm">
                    No recent documents uploaded yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {storedDocuments.slice(0, 4).map((doc) => {
                    let icon = "description";
                    let bgColor = "bg-dashboard-primary/10";
                    let textColor = "text-dashboard-primary";

                    if (doc.fileType === "application/pdf") {
                      icon = "picture_as_pdf";
                      bgColor = "bg-red-500/10";
                      textColor = "text-red-500";
                    } else if (doc.fileType === "text/plain") {
                      icon = "article";
                      bgColor = "bg-gray-500/10";
                      textColor = "text-gray-500";
                    } else if (
                      doc.fileType ===
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                      doc.fileType === "application/msword"
                    ) {
                      icon = "description";
                      bgColor = "bg-blue-500/10";
                      textColor = "text-blue-500";
                    }

                    return (
                      <div
                        key={doc.id}
                        className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark p-4 md:p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3 md:mb-4">
                          <div className={`${bgColor} p-2 rounded-lg`}>
                            <span className={`material-symbols-outlined ${textColor} text-xl md:text-2xl`}>
                              {icon}
                            </span>
                          </div>
                          <button className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                            <span className="material-symbols-outlined text-lg">
                              more_horiz
                            </span>
                          </button>
                        </div>
                        <h3 className="text-dashboard-text-light dark:text-dashboard-text-dark text-sm md:text-base font-semibold mb-1 truncate">
                          {doc.title}
                        </h3>
                        <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-xs md:text-sm">
                          Uploaded:{" "}
                          {doc.uploadedAt
                            ? new Date(doc.uploadedAt).toLocaleDateString()
                            : "Just now"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Upload Section - MOBILE ONLY (appears here on mobile) */}
            <div className="lg:hidden">
              <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-lg md:text-xl font-bold mb-3 md:mb-4">
                Upload New Documents
              </h2>

              <div
                className={`bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark p-4 md:p-6 rounded-xl border ${
                  isDragging
                    ? "border-dashboard-accent"
                    : "border-gray-200 dark:border-gray-700"
                } transition-colors`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 md:p-8 flex flex-col items-center justify-center text-center">
                  <div className="bg-dashboard-accent/10 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                    <span className="material-symbols-outlined text-dashboard-accent text-3xl md:text-4xl">
                      upload_file
                    </span>
                  </div>
                  <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-sm md:text-base font-medium mb-2">
                    Drag & drop files here
                  </p>
                  <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-xs md:text-sm mb-3 md:mb-4">
                    or
                  </p>
                  <button
                    onClick={handleBrowseClick}
                    className="bg-dashboard-accent text-white py-2 px-5 rounded-lg text-sm font-semibold hover:bg-dashboard-accent/90 transition-colors"
                  >
                    Browse Files
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleFileInputChange}
                  />
                  <p className="text-xs text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mt-3 md:mt-4">
                    Supports: PDF, DOCX, TXT
                  </p>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 md:mt-6">
                    <h3 className="text-dashboard-text-light dark:text-dashboard-text-dark text-sm font-semibold mb-2 md:mb-3">
                      Uploaded Files
                    </h3>
                    <ul className="space-y-2 md:space-y-3">
                      {uploadedFiles.map((file) => (
                        <li
                          key={file.id}
                          className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2.5 md:p-3 rounded-md text-sm"
                        >
                          <div className="flex flex-col truncate flex-1 min-w-0">
                            <span className="truncate text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-xs md:text-sm">
                              {file.title}
                            </span>
                            <span className="text-xs text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                              {formatFileSize(file.size)}
                            </span>
                          </div>

                          <button
                            onClick={() => handleRemoveFile(file.id)}
                            className="ml-3 text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                            title="Remove file"
                          >
                            <span className="material-symbols-outlined text-base">
                              delete
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* AI Quick Actions */}
            <div>
              <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-lg md:text-xl font-bold mb-3 md:mb-4">
                AI Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {aiTools.map((tool) => (
                  <div
                    key={tool.name}
                    className={`flex flex-col items-center justify-center p-5 md:p-6 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all ${
                      tool.disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <div className={`${tool.bgColor} p-2.5 md:p-3 rounded-lg mb-3 md:mb-4 relative`}>
                      <span className={`material-symbols-outlined ${tool.textColor} text-2xl md:text-3xl`}>
                        {tool.icon}
                      </span>
                      {tool.disabled && (
                        <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                          Soon
                        </span>
                      )}
                    </div>
                    <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-sm md:text-base font-semibold mb-1">
                      {tool.name}
                    </p>
                    <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-xs md:text-sm text-center">
                      {tool.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Upload Section (DESKTOP ONLY) */}
          <div className="hidden lg:block lg:col-span-1">
            <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold mb-4">
              Upload New Documents
            </h2>

            <div
              className={`bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark p-6 rounded-xl border ${
                isDragging
                  ? "border-dashboard-accent"
                  : "border-gray-200 dark:border-gray-700"
              } transition-colors sticky top-4`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                <div className="bg-dashboard-accent/10 p-4 rounded-full mb-4">
                  <span className="material-symbols-outlined text-dashboard-accent text-4xl">
                    upload_file
                  </span>
                </div>
                <p className="text-dashboard-text-light dark:text-dashboard-text-dark font-medium mb-2">
                  Drag & drop files here
                </p>
                <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm mb-4">
                  or
                </p>
                <button
                  onClick={handleBrowseClick}
                  className="bg-dashboard-accent text-white py-2 px-5 rounded-lg text-sm font-semibold hover:bg-dashboard-accent/90 transition-colors"
                >
                  Browse Files
                </button>
                <p className="text-xs text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mt-4">
                  Supports: PDF, DOCX, TXT
                </p>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-dashboard-text-light dark:text-dashboard-text-dark font-semibold mb-3">
                    Uploaded Files
                  </h3>
                  <ul className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <li
                        key={file.id}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm"
                      >
                        <div className="flex flex-col truncate flex-1 min-w-0">
                          <span className="truncate text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                            {file.title}
                          </span>
                          <span className="text-xs text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                            {formatFileSize(file.size)}
                          </span>
                        </div>

                        <button
                          onClick={() => handleRemoveFile(file.id)}
                          className="ml-3 text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                          title="Remove file"
                        >
                          <span className="material-symbols-outlined text-base">
                            delete
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;