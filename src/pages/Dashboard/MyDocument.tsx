import React, { useEffect, useState } from "react";
import { useDocumentStore } from "../../store/useDocumentStore";
import DocumentPreviewModal from '../../components/dashboard/DocumentPreviewModal';
import type { UploadedDocument } from "../../store/useDocumentStore";

const MyDocument: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<UploadedDocument | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { documents, removeDocument, searchQuery, filterType, sortOption, setSearchQuery, setFilterType, setSortOption, addDocuments } = useDocumentStore();


   useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/documents'); // Changed to http (not https)
        
        if (response.ok) {
          const docs = await response.json();
          addDocuments(docs);
        } else {
          console.error('Failed to fetch documents:', response.status);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, [addDocuments]); 
  
  // Filter documents based on search query
  let filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if(filterType !== 'all') {
    filteredDocuments = filteredDocuments.filter((doc) => doc.fileType.includes(filterType));
  }

if (sortOption === "newest") {
    filteredDocuments.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  } else if (sortOption === "oldest") {
    filteredDocuments.sort((a, b) => 
      new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
    );
  } else if (sortOption === "name-asc") {
    filteredDocuments.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "name-desc") {
    filteredDocuments.sort((a, b) => b.title.localeCompare(a.title));
  }

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      removeDocument(id);
    }
  };

  const handleView = (doc: UploadedDocument) => {
    setSelectedDoc(doc);
    setModalOpen(true);
  };

  const handleDownload = (doc: UploadedDocument) => {
    const a = document.createElement("a");
    a.href = doc.fileUrl
    a.download = doc.title;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
   
  };

  // Helper function to get file icon based on type
  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) {
      return {
        icon: "picture_as_pdf",
        iconColor: "text-red-500",
        bgColor: "bg-red-500/10",
      };
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return {
        icon: "description",
        iconColor: "text-blue-500",
        bgColor: "bg-blue-500/10",
      };
    } else if (fileType.includes("text")) {
      return {
        icon: "article",
        iconColor: "text-gray-500",
        bgColor: "bg-gray-500/10",
      };
    } else {
      return {
        icon: "insert_drive_file",
        iconColor: "text-dashboard-primary",
        bgColor: "bg-dashboard-primary/10",
      };
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-dashboard-secondary dark:bg-background-dark/50 font-display">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-3xl font-bold leading-tight">
              My Documents
            </p>
            <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-base">
              {searchQuery ? (
                <>
                  Showing {filteredDocuments.length} result{filteredDocuments.length !== 1 ? 's' : ''} for "{searchQuery}"
                </>
              ) : (
                <>Manage and organize all your uploaded documents.</>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="flex items-center gap-2 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <span className="material-symbols-outlined text-base">close</span>
                Clear Search
              </button>
            )}
            <button
              onClick={() => setFilterType(filterType === 'pdf' ? 'all' : 'pdf')}
              className="flex items-center gap-2 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <span className="material-symbols-outlined text-base">filter_list</span>
            {filterType === 'pdf' ? 'Show All' : 'Filter PDFs'}
            </button>
            <button 
              onClick={() =>
    setSortOption(sortOption === "newest" ? "name-asc" : "newest")
  }
            className="flex items-center gap-2 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined text-base">swap_vert</span>
              {sortOption === "newest" ? "Sort A–Z" : "Sort Newest"}
            </button>
          </div>
        </div>

        {/* Conditional Rendering */}
        {documents.length === 0 ? (
          // No documents at all
          <div className="flex flex-col items-center justify-center text-center py-24 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700">
            <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
              folder_open
            </span>
            <p className="text-lg font-medium text-dashboard-text-light dark:text-dashboard-text-dark mb-2">
              No documents uploaded yet
            </p>
            <p className="text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
              Start by uploading files from your dashboard to see them here.
            </p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          // No search results
          <div className="flex flex-col items-center justify-center text-center py-24 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700">
            <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
              search_off
            </span>
            <p className="text-lg font-medium text-dashboard-text-light dark:text-dashboard-text-dark mb-2">
              No documents found
            </p>
            <p className="text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-4">
              No documents match your search for "{searchQuery}"
            </p>
            <button
              onClick={clearSearch}
              className="text-dashboard-accent hover:underline text-sm font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          // Display filtered documents
          <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-dashboard-secondary dark:bg-dashboard-sidebar-dark/50">
                <tr>
                  <th className="p-4 text-sm font-semibold text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark w-2/5">
                    Name
                  </th>
                  <th className="p-4 text-sm font-semibold text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                    Date Uploaded
                  </th>
                  <th className="p-4 text-sm font-semibold text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                    Last Modified
                  </th>
                  <th className="p-4 text-sm font-semibold text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                    File Size
                  </th>
                  <th className="p-4 text-right text-sm font-semibold text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDocuments.map((doc) => {
                  const fileIconData = getFileIcon(doc.fileType);
                  return (
                    <tr
                      key={doc.title}
                      className="hover:bg-dashboard-secondary/50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`${fileIconData.bgColor} p-2 rounded-lg`}>
                            <span className={`material-symbols-outlined ${fileIconData.iconColor}`}>
                              {fileIconData.icon}
                            </span>
                          </div>
                          <span className="font-medium text-dashboard-text-light dark:text-dashboard-text-dark">
                            {doc.title}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                        11:55pm
                      </td>
                      <td className="p-4 text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                      {formatFileSize(doc.size)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleView(doc)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            title="View Document"
                          >
                            <span className="material-symbols-outlined text-xl">visibility</span>
                          </button>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/20"
                            title="Download Document"
                          >
                            <span className="material-symbols-outlined text-xl">download</span>
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id,doc.title)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                            title="Delete Document"
                          >
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <DocumentPreviewModal
        document={selectedDoc}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default MyDocument;