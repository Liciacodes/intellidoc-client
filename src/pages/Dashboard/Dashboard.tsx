import DashboardLayout from "../../components/layout/DashboardLayout";

const Dashboard: React.FC = () => {
  // Document cards data with proper color classes
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

  // AI tools data with proper color classes
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

  return (
    <DashboardLayout>
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
            <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold leading-tight tracking-[-0.015em] mb-4">
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
                      <span className={`material-symbols-outlined ${doc.textColor}`}>
                        {doc.icon}
                      </span>
                    </div>
                    <button className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
                      <span className="material-symbols-outlined text-lg">more_horiz</span>
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

              {/* View All Documents */}
              <div className="flex items-center justify-center p-5 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:border-dashboard-primary hover:text-dashboard-primary dark:hover:border-dashboard-primary transition-colors cursor-pointer">
                <div className="text-center">
                  <span className="material-symbols-outlined text-4xl mb-2">
                    add_circle
                  </span>
                  <p className="font-medium">View All Documents</p>
                </div>
              </div>
            </div>

            {/* AI Quick Actions */}
            <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold leading-tight tracking-[-0.015em] mt-10 mb-4">
              AI Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {aiTools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center justify-center p-6 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <div className={`${tool.bgColor} p-3 rounded-lg mb-4`}>
                    <span className={`material-symbols-outlined ${tool.textColor} text-3xl!`}>
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
            <h2 className="text-dashboard-text-light dark:text-dashboard-text-dark text-xl font-bold leading-tight tracking-[-0.015em] mb-4">
              Upload New Documents
            </h2>
            <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700">
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
                <button className="bg-dashboard-accent text-white py-2 px-5 rounded-lg text-sm font-semibold hover:bg-dashboard-accent/90 transition-colors">
                  Browse Files
                </button>
                <p className="text-xs text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark mt-4">
                  Supports: PDF, DOCX, TXT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;