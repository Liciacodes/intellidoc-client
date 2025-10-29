import React from "react";

const AITools: React.FC = () => {
  const tools = [
    {
      name: "Smart Summarization",
      description: "Get a concise summary of any long document instantly.",
      icon: "summarize",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      name: "Q&A Chat",
      description: "Ask questions and get precise answers from your documents.",
      icon: "quiz",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      name: "Key Points Extraction",
      description:
        "Automatically pull out the most important topics and takeaways.",
      icon: "checklist",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      name: "Document Comparison",
      description:
        "Analyze two documents to find differences and similarities.",
      icon: "compare_arrows",
      iconColor: "text-teal-500",
      bgColor: "bg-teal-500/10",
    },
    {
      name: "Smart Search",
      description: "Find information with context-aware, intelligent search.",
      icon: "search",
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
    {
      name: "Auto-Tagging",
      description:
        "Organize your library by automatically tagging documents.",
      icon: "label",
      iconColor: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-dashboard-secondary dark:bg-[#111418]/50 font-display">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-3xl font-bold leading-tight">
              AI Tools Overview
            </p>
            <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-base">
              Unlock the power of AI to analyze and manage your documents.
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col items-center justify-center text-center p-6 bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className={`${tool.bgColor} p-3 rounded-lg mb-4`}>
                <span
                  className={`material-symbols-outlined ${tool.iconColor} text-3xl`}
                >
                  {tool.icon}
                </span>
              </div>
              <p className="text-dashboard-text-light dark:text-dashboard-text-dark text-base font-semibold mb-1">
                {tool.name}
              </p>
              <p className="text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark text-sm">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AITools;
