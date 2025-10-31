import { useRef, useState } from "react";
import { useDocumentStore } from "../../store/useDocumentStore";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

const Dashboard: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {addDocuments} = useDocumentStore();

  const documents = [
    {
      name: "Quarterly_Report.docx",
      icon: "description",
      bgColor: "bg-dashboard-primary/10",
      textColor: "text-dashboard-primary",
      accessed: "2 hours ago",
    },
    {
      name: "Project_Proposal.pdf",
      icon: "picture_as_pdf",
      bgColor: "bg-red-500/10",
      textColor: "text-red-500",
      accessed: "1 day ago",
    },
    {
      name: "Meeting_Notes.txt",
      icon: "article",
      bgColor: "bg-gray-500/10",
      textColor: "text-gray-500",
      accessed: "3 days ago",
    },
  ];

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
    },
    {
      name: "Ask about a Doc",
      icon: "quiz",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-500",
      desc: "Ask questions and get answers from your docs.",
    },
  ];

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

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          file: file,
        });
      } else {
        alert(`File type not supported: ${file.name}`);
      }
    });
    setUploadedFiles((prev) => [...prev, ...newFiles]);
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

      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-3xl font-bold leading-tight">
              Welcome back, Olivia!
            </p>
            <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-base font-normal">
              Here's a summary of your recent activity and tools.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side: Recent Docs + AI Actions */}
          <div className="lg:col-span-2">
            {/* Recent Documents */}
            <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold mb-4">
              Your Recent Documents
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark p-5 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${doc.bgColor} p-2 rounded-lg`}>
                      <span
                        className={`material-symbols-outlined ${doc.textColor}`}
                      >
                        {doc.icon}
                      </span>
                    </div>
                    <button className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                      <span className="material-symbols-outlined text-lg">
                        more_horiz
                      </span>
                    </button>
                  </div>
                  <h3 className="text-dashboard-text-light dark:text-dashboard-text-dark font-semibold mb-1">
                    {doc.name}
                  </h3>
                  <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm">
                    Accessed: {doc.accessed}
                  </p>
                </div>
              ))}
            </div>

            {/* AI Quick Actions */}
            <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold mt-10 mb-4">
              AI Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {aiTools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center justify-center p-6 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <div className={`${tool.bgColor} p-3 rounded-lg mb-4`}>
                    <span
                      className={`material-symbols-outlined ${tool.textColor} text-3xl`}
                    >
                      {tool.icon}
                    </span>
                  </div>
                  <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-base font-semibold mb-1">
                    {tool.name}
                  </p>
                  <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm text-center">
                    {tool.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side: Upload Section */}
          <div className="lg:col-span-1">
            <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold mb-4">
              Upload New Documents
            </h2>

            <div
              className={`bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark p-6 rounded-xl border ${
                isDragging
                  ? "border-dashboard-accent"
                  : "border-gray-200 dark:border-gray-700"
              } transition-colors`}
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
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  onChange={handleFileInputChange}
                />
                <p className="text-xs text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mt-4">
                  Supports: PDF, DOCX, TXT
                </p>
              </div>

              {/* Uploaded Files List */}
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
                        <div className="flex flex-col truncate">
                          <span className="truncate text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">{file.name}</span>
                          <span className="text-xs text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                            {formatFileSize(file.size)}
                          </span>
                        </div>

                        <button
                          onClick={() => handleRemoveFile(file.id)}
                          className="ml-3 text-red-500 hover:text-red-600 transition-colors"
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




// import { useRef, useState } from "react";

// interface UploadedFile {
//     id: string;
//     name: string;
//     size: number;
//     type: string;
//     file: File;
//   }



// const Dashboard: React.FC = () => {
//     const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
//     const [isDragging, setIsDragging] = useState<boolean>(false);
//     const fileInputRef = useRef<HTMLInputElement | null>(null);
  
//   const documents = [
//     {
//       name: "Quarterly_Report.docx",
//       icon: "description",
//       bgColor: "bg-dashboard-primary/10",
//       textColor: "text-dashboard-primary",
//       accessed: "2 hours ago",
//     },
//     {
//       name: "Project_Proposal.pdf",
//       icon: "picture_as_pdf",
//       bgColor: "bg-red-500/10",
//       textColor: "text-red-500",
//       accessed: "1 day ago",
//     },
//     {
//       name: "Meeting_Notes.txt",
//       icon: "article",
//       bgColor: "bg-gray-500/10",
//       textColor: "text-gray-500",
//       accessed: "3 days ago",
//     },
//   ];

//   // AI tools data with proper color classes
//   const aiTools = [
//     {
//       name: "Summarize",
//       icon: "summarize",
//       bgColor: "bg-purple-500/10",
//       textColor: "text-purple-500",
//       desc: "Get a concise summary of any document.",
//     },
//     {
//       name: "Draft New Doc",
//       icon: "edit_document",
//       bgColor: "bg-green-500/10",
//       textColor: "text-green-500",
//       desc: "Start a new document with AI assistance.",
//     },
//     {
//       name: "Ask about a Doc",
//       icon: "quiz",
//       bgColor: "bg-orange-500/10",
//       textColor: "text-orange-500",
//       desc: "Ask questions and get answers from your docs.",
//     },
//   ];

// const validateFile = (file: File) : boolean => {
// const allowedTypes = [
//     "application/pdf",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "application/msword",
//     "text/plain",
//   ];
//   return allowedTypes.includes(file.type);
//   }

// const getFileIcon = (type: string) => {
// if (type.includes("pdf")) return {icon: "picture_as_pdf", bgColor: "bg-red-500/10", textColor: "text-red-500"};
//  if (type.includes("word")) return { icon: "description", color: "text-dashboard-primary" };
//     if (type.includes("text")) return { icon: "article", color: "text-gray-500" };
//     return { icon: "insert_drive_file", color: "text-gray-500" };
// }

// const formatFileSize = (bytes: number): string => {
//  if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
// }

// const handleFiles = (files: FileList | null) => {
//     if (!files) return ;

//  const newFiles: UploadedFile[] = [];
//  Array.from(files).forEach((file) => {
//     if (validateFile(file)) {
//         newFiles.push({
//             id: Math.random().toString(36).substr(2, 9),
//             name: file.name,
//             size: file.size,
//             type: file.type,
//             file: file,
//         })
//      } else {
//             alert(`File type not supported: ${file.name}`);
//         }
   
//  })
//  setUploadedFiles((prev) => [...prev, ...newFiles]);
// }

// const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     setIsDragging(true);
// }

// const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
   
//     setIsDragging(false);
// }


// const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     handleFiles(files);
// }

// const handleBrowseClick = () => {
//     fileInputRef.current?.click();
// }
// const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     handleFiles(files);
// }
//   return (
   
//       <div className="max-w-7xl mx-auto">
//         {/* Page Heading */}
//         <div className="flex flex-wrap justify-between gap-4 mb-8">
//           <div className="flex flex-col gap-1">
//             <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-3xl font-bold leading-tight">
//               Welcome back, Olivia!
//             </p>
//             <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-base font-normal">
//               Here's a summary of your recent activity and tools.
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left side: Recent Docs + AI Actions */}
//           <div className="lg:col-span-2">
//             {/* Recent Documents */}
//             <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold leading-tight tracking-[-0.015em] mb-4">
//               Your Recent Documents
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {documents.map((doc) => (
//                 <div
//                   key={doc.name}
//                   className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark p-5 rounded-xl border border-gray-200 dark:border-gray-700"
//                 >
//                   <div className="flex items-start justify-between mb-4">
//                     <div className={`${doc.bgColor} p-2 rounded-lg`}>
//                       <span className={`material-symbols-outlined ${doc.textColor}`}>
//                         {doc.icon}
//                       </span>
//                     </div>
//                     <button className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
//                       <span className="material-symbols-outlined text-lg">more_horiz</span>
//                     </button>
//                   </div>
//                   <h3 className="text-dashboard-text-light dark:text-dashboard-text-dark font-semibold mb-1">
//                     {doc.name}
//                   </h3>
//                   <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm">
//                     Accessed: {doc.accessed}
//                   </p>
//                 </div>
//               ))}

//               {/* View All Documents */}
//               <div className="flex items-center justify-center p-5 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:border-dashboard-primary hover:text-dashboard-primary dark:hover:border-dashboard-primary transition-colors cursor-pointer">
//                 <div className="text-center">
//                   <span className="material-symbols-outlined text-4xl mb-2">
//                     add_circle
//                   </span>
//                   <p className="font-medium">View All Documents</p>
//                 </div>
//               </div>
//             </div>

//             {/* AI Quick Actions */}
//             <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold leading-tight tracking-[-0.015em] mt-10 mb-4">
//               AI Quick Actions
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//               {aiTools.map((tool) => (
//                 <div
//                   key={tool.name}
//                   className="flex flex-col items-center justify-center p-6 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
//                 >
//                   <div className={`${tool.bgColor} p-3 rounded-lg mb-4`}>
//                     <span className={`material-symbols-outlined ${tool.textColor} text-3xl!`}>
//                       {tool.icon}
//                     </span>
//                   </div>
//                   <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-base font-semibold mb-1">
//                     {tool.name}
//                   </p>
//                   <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm text-center">
//                     {tool.desc}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right side: Upload Section */}
//           <div className="lg:col-span-1">
//             <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold leading-tight tracking-[-0.015em] mb-4">
//               Upload New Documents
//             </h2>
//             <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700">
//               <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center text-center">
//                 <div className="bg-dashboard-accent/10 p-4 rounded-full mb-4">
//                   <span className="material-symbols-outlined text-dashboard-accent text-4xl">
//                     upload_file
//                   </span>
//                 </div>
//                 <p className="text-dashboard-text-light dark:text-dashboard-text-dark font-medium mb-2">
//                   Drag & drop files here
//                 </p>
//                 <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm mb-4">
//                   or
//                 </p>
//                 <button className="bg-dashboard-accent text-white py-2 px-5 rounded-lg text-sm font-semibold hover:bg-dashboard-accent/90 transition-colors">
//                   Browse Files
//                 </button>
//                 <p className="text-xs text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mt-4">
//                   Supports: PDF, DOCX, TXT
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
    
//   );
// };

// export default Dashboard;