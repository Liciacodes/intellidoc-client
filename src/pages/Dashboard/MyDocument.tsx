import React from "react";

const MyDocument: React.FC = () => {
  const documents = [
    {
      name: "Quarterly_Report.docx",
      icon: "description",
      iconColor: "text-dashboard-primary",
      bgColor: "bg-dashboard-primary/10",
      dateUploaded: "Oct 26, 2023",
      lastModified: "Oct 28, 2023",
      size: "1.2 MB",
    },
    {
      name: "Project_Proposal.pdf",
      icon: "picture_as_pdf",
      iconColor: "text-red-500",
      bgColor: "bg-red-500/10",
      dateUploaded: "Oct 25, 2023",
      lastModified: "Oct 27, 2023",
      size: "5.8 MB",
    },
    {
      name: "Meeting_Notes.txt",
      icon: "article",
      iconColor: "text-gray-500",
      bgColor: "bg-gray-500/10",
      dateUploaded: "Oct 23, 2023",
      lastModified: "Oct 23, 2023",
      size: "15 KB",
    },
    {
      name: "Onboarding_Guide_v2.pdf",
      icon: "picture_as_pdf",
      iconColor: "text-red-500",
      bgColor: "bg-red-500/10",
      dateUploaded: "Oct 20, 2023",
      lastModified: "Oct 21, 2023",
      size: "3.4 MB",
    },
    {
      name: "Marketing_Strategy.docx",
      icon: "description",
      iconColor: "text-dashboard-primary",
      bgColor: "bg-dashboard-primary/10",
      dateUploaded: "Oct 18, 2023",
      lastModified: "Oct 19, 2023",
      size: "850 KB",
    },
  ];

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
              <span className="material-symbols-outlined text-base">
                filter_list
              </span>
              Filter
            </button>
            <button className="flex items-center gap-2 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined text-base">
                swap_vert
              </span>
              Sort
            </button>
          </div>
        </div>

        {/* Table Section */}
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
                      <div className={`${doc.bgColor} p-2 rounded-lg`}>
                        <span
                          className={`material-symbols-outlined ${doc.iconColor}`}
                        >
                          {doc.icon}
                        </span>
                      </div>
                      <span className="font-medium text-dashboard-text-light dark:text-dashboard-text-dark">
                        {doc.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                    {doc.dateUploaded}
                  </td>
                  <td className="p-4 text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                    {doc.lastModified}
                  </td>
                  <td className="p-4 text-sm text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                    {doc.size}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:text-dashboard-text-light dark:hover:text-dashboard-text-dark">
                      <span className="material-symbols-outlined">
                        more_horiz
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyDocument;
