import React, { useEffect, useState } from "react";
import { useDocumentStore } from "../../store/useDocumentStore";
import DocumentPreviewModal from '../../components/dashboard/DocumentPreviewModal';
import DocumentViewer from "../../components/dashboard/DocumentViewer";
import type { UploadedDocument } from "../../store/useDocumentStore";

const MyDocument: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<UploadedDocument | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [showDocumentViewer, setShowDocumentViewer] = useState(false);
  const { documents, removeDocument, searchQuery, filterType, sortOption, setSearchQuery, setFilterType, setSortOption, addDocuments } = useDocumentStore();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No auth token found - user might not be logged in');
          return;
        }
        const response = await fetch('http://localhost:5000/api/documents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const docs = await response.json();
          addDocuments(docs);
        } else if (response.status === 401) {
          console.error('Unauthorized access - please log in');
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

  if (filterType !== 'all') {
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

  const handleDelete = async (id: string, title: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to be logged in to delete a document.');
        return;
      }
      const response = await fetch(`http://localhost:5000/api/documents/${id}`, { 
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        removeDocument(id);
        alert('Document deleted successfully');
      } else {
        alert('Failed to delete the document');
      }
    } catch (error: any) {
      console.error('Delete error', error);
      alert('Error deleting document');
    }
  };

  const handleView = (doc: UploadedDocument) => {
    setSelectedDoc(doc);
    setShowDocumentViewer(true);
  };

  const handleDownload = (doc: UploadedDocument) => {
    window.open(doc.fileUrl, "_blank");
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
      <div className="w-full">
        {showDocumentViewer && selectedDoc ? (
          <DocumentViewer 
            documentId={selectedDoc.id} 
            onClose={() => setShowDocumentViewer(false)}
          />
        ) : (
          <>
            {/* Header - Responsive */}
            <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-start md:items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="flex flex-col gap-1">
                <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-2xl md:text-3xl font-bold leading-tight">
                  My Documents
                </p>
                <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm md:text-base">
                  {searchQuery ? (
                    <>
                      Showing {filteredDocuments.length} result{filteredDocuments.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </>
                  ) : (
                    <>Manage and organize all your uploaded documents.</>
                  )}
                </p>
              </div>

              {/* Filter Buttons - Responsive */}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full md:w-auto">
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="flex items-center gap-2 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark border border-gray-200 dark:border-gray-700 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-base">close</span>
                    <span className="hidden sm:inline">Clear Search</span>
                    <span className="sm:hidden">Clear</span>
                  </button>
                )}
                <button
                  onClick={() => setFilterType(filterType === 'pdf' ? 'all' : 'pdf')}
                  className="flex items-center gap-2 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark border border-gray-200 dark:border-gray-700 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-base">filter_list</span>
                  <span className="hidden sm:inline">{filterType === 'pdf' ? 'Show All' : 'Filter PDFs'}</span>
                  <span className="sm:hidden">Filter</span>
                </button>
                <button 
                  onClick={() => setSortOption(sortOption === "newest" ? "name-asc" : "newest")}
                  className="flex items-center gap-2 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark border border-gray-200 dark:border-gray-700 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-base">swap_vert</span>
                  <span className="hidden sm:inline">{sortOption === "newest" ? "Sort A–Z" : "Sort Newest"}</span>
                  <span className="sm:hidden">Sort</span>
                </button>
              </div>
            </div>

            {/* Empty States */}
            {documents.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16 md:py-24 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700">
                <span className="material-symbols-outlined text-5xl md:text-6xl text-gray-400 mb-4">
                  folder_open
                </span>
                <p className="text-base md:text-lg font-medium text-dashboard-text-light dark:text-dashboard-text-dark mb-2">
                  No documents uploaded yet
                </p>
                <p className="text-xs md:text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark px-4">
                  Start by uploading files from your dashboard to see them here.
                </p>
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16 md:py-24 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700">
                <span className="material-symbols-outlined text-5xl md:text-6xl text-gray-400 mb-4">
                  search_off
                </span>
                <p className="text-base md:text-lg font-medium text-dashboard-text-light dark:text-dashboard-text-dark mb-2">
                  No documents found
                </p>
                <p className="text-xs md:text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mb-4 px-4">
                  No documents match your search for "{searchQuery}"
                </p>
                <button
                  onClick={clearSearch}
                  className="text-dashboard-accent hover:underline text-xs md:text-sm font-medium"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <>
                {/* Desktop Table - Hidden on mobile */}
                <div className="hidden md:block bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-dashboard-secondary dark:bg-dashboard-sidebar-dark/50">
                      <tr>
                        <th className="p-4 text-sm font-semibold text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark w-2/5">
                          Name
                        </th>
                        <th className="p-4 text-sm font-semibold text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                          Date Uploaded
                        </th>
                        {/* <th className="p-4 text-sm font-semibold text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                          Last Modified
                        </th> */}
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
                            key={doc.id}
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
                            {/* <td className="p-4 text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                              {new Date(doc.uploadedAt).toLocaleTimeString()}
                            </td> */}
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
                                  onClick={() => handleDelete(doc.id, doc.title)}
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

                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  {filteredDocuments.map((doc) => {
                    const fileIconData = getFileIcon(doc.fileType);
                    return (
                      <div
                        key={doc.id}
                        className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 p-4"
                      >
                        {/* File Header */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`${fileIconData.bgColor} p-2 rounded-lg flex-shrink-0`}>
                            <span className={`material-symbols-outlined ${fileIconData.iconColor} text-xl`}>
                              {fileIconData.icon}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-dashboard-text-light dark:text-dashboard-text-dark text-sm truncate">
                              {doc.title}
                            </h3>
                            <p className="text-xs text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                              {formatFileSize(doc.size)}
                            </p>
                          </div>
                        </div>

                        {/* File Details */}
                        <div className="flex flex-col gap-1.5 mb-3 text-xs">
                          <div className="flex justify-between">
                            <span className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                              Uploaded:
                            </span>
                            <span className="text-dashboard-text-light dark:text-dashboard-text-dark">
                              {new Date(doc.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                              Time:
                            </span>
                            <span className="text-dashboard-text-light dark:text-dashboard-text-dark">
                              {new Date(doc.uploadedAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => handleView(doc)}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 py-2 px-3 rounded-lg text-xs font-medium hover:bg-blue-500/20 transition-colors"
                          >
                            <span className="material-symbols-outlined text-base">visibility</span>
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 text-green-600 dark:text-green-400 py-2 px-3 rounded-lg text-xs font-medium hover:bg-green-500/20 transition-colors"
                          >
                            <span className="material-symbols-outlined text-base">download</span>
                            Download
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id, doc.title)}
                            className="flex items-center justify-center bg-red-500/10 text-red-600 dark:text-red-400 p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
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





