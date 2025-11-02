import React from "react";
import { useDocumentStore } from "../../store/useDocumentStore";

const MyDocument: React.FC = () => {
  const { documents, removeDocument } = useDocumentStore();

  const handleDelete = (name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      removeDocument(name);
    }
  };

  const handleView = (docName: string) => {
    alert(`View functionality coming soon for ${docName}`);
  };

  const handleDownload = (docName: string) => {
    alert(`Download functionality coming soon for ${docName}`);
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
              Manage and organize all your uploaded documents.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined text-base">filter_list</span>
              Filter
            </button>
            <button className="flex items-center gap-2 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined text-base">swap_vert</span>
              Sort
            </button>
          </div>
        </div>

        {/* Conditional Rendering */}
        {documents.length === 0 ? (
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
        ) : (
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
                {documents.map((doc) => (
                  <tr key={doc.name}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-dashboard-primary/10 p-2 rounded-lg">
                          <span className="material-symbols-outlined text-dashboard-primary">
                            description
                          </span>
                        </div>
                        <span className="font-medium text-dashboard-text-light dark:text-dashboard-text-dark">
                          {doc.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                      {new Date(doc.lastModified).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                      {Math.round(doc.size / 1024)} KB
                    </td>
                    <td className="p-4 text-right flex gap-3 justify-end">
                      <button
                        onClick={() => handleView(doc.name)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Document"
                      >
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button
                        onClick={() => handleDownload(doc.name)}
                        className="text-green-600 hover:text-green-800"
                        title="Download Document"
                      >
                        <span className="material-symbols-outlined">download</span>
                      </button>
                      <button
                        onClick={() => handleDelete(doc.name)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Document"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDocument;
