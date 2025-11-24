// components/document/AISidebar.tsx
import React, { useState } from 'react';

interface AISidebarProps {
  documentId: string;
  documentContent: string;
}

const AISidebar: React.FC<AISidebarProps> = ({ documentId, documentContent }) => {
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTool, setActiveTool] = useState<'summary' | 'qa' | 'keypoints' | null>(null);

  const generateSummary = async () => {
    if (!documentContent || documentContent.trim() === "") {
      alert("This document has no text to summarize.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/documents/${documentId}/summarize`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: documentContent }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate summary");
      }

      if (!data.summary || data.summary.trim() === "") {
        throw new Error("Summary is empty or could not be generated");
      }

      setSummary(data.summary);
      setActiveTool('summary');

    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Could not generate summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary);
    alert("Summary copied to clipboard!");
  };

  const handleRegenerate = () => {
    generateSummary();
  };

  return (
    <aside className="w-[380px] bg-white border-l border-gray-200 p-6 flex flex-col">
      <div className="flex flex-col flex-1">

        <div className="flex flex-col mb-6">
          <h2 className="text-gray-900 text-xl font-bold">AI Tools</h2>
          <p className="text-gray-500 text-sm">Enhance your document with AI</p>
        </div>

        {/* AI Actions */}
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 mb-6">
          <button
            onClick={generateSummary}
            disabled={isGenerating}
            className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-primary text-white text-base font-bold gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            {isGenerating ? "Generating..." : "Summarize"}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTool('qa')}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <span className="material-symbols-outlined text-xl">forum</span>
              Q&A
            </button>

            <button
              onClick={() => setActiveTool('keypoints')}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <span className="material-symbols-outlined text-xl">checklist</span>
              Key Points
            </button>
          </div>
        </div>

        {/* TOOL PANELS */}
        <div className="flex-1 overflow-y-auto">

          {/* SUMMARY PANEL */}
          {activeTool === 'summary' && summary && (
            <div id="summary-panel">
              <h3 className="text-gray-900 text-base font-bold mb-3">AI Summary</h3>

              <div className="bg-blue-50 text-gray-700 p-4 rounded-lg text-sm space-y-3">
                {summary.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleCopySummary}
                    className="text-gray-500 hover:text-primary"
                  >
                    <span className="material-symbols-outlined">content_copy</span>
                  </button>
                  <button className="text-gray-500 hover:text-primary">
                    <span className="material-symbols-outlined">thumb_up</span>
                  </button>
                  <button className="text-gray-500 hover:text-primary">
                    <span className="material-symbols-outlined">thumb_down</span>
                  </button>
                </div>

                <button 
                  onClick={handleRegenerate}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <span className="material-symbols-outlined text-xl">refresh</span>
                  Regenerate
                </button>
              </div>
            </div>
          )}

          {/* Coming soon panels */}
          {activeTool === 'qa' && (
            <div className="text-center py-8 text-gray-500">
              Q&A feature coming soon!
            </div>
          )}

          {activeTool === 'keypoints' && (
            <div className="text-center py-8 text-gray-500">
              Key Points feature coming soon!
            </div>
          )}

        </div>
      </div>
    </aside>
  );
};

export default AISidebar;
