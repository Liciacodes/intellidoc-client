// components/document/AISidebar.tsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import QAComponent from './QAComponent';
import KeyPointsComponent from './KeyPointsComponent';

interface AISidebarProps {
  documentId: string;
  documentContent: string;
}

const AISidebar: React.FC<AISidebarProps> = ({ documentId, documentContent }) => {
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTool, setActiveTool] = useState<'summary' | 'qa' | 'keypoints' | null>(null);
  const [error, setError] = useState<string>('');

  const generateSummary = async () => {
    if (!documentContent || documentContent.trim().length < 50) {
      const errorMsg = "This document doesn't have enough text content to summarize. Please upload a document with readable text.";
      setError(errorMsg);
      toast.error(errorMsg, { duration: 4000 });
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      console.log('Sending summarization request for document:', documentId);
      
      const response = await fetch(
        `http://localhost:5000/api/documents/${documentId}/summarize`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: documentContent }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (!data.summary || data.summary.trim() === "") {
        throw new Error("Summary is empty or could not be generated");
      }

      setSummary(data.summary);
      setActiveTool('summary');
      console.log('Summary generated successfully');

    } catch (error: any) {
      console.error("Error generating summary:", error);
      const errorMessage = error.message || "Could not generate summary. Please check your API key and try again.";
      setError(errorMessage);
      toast.error(errorMessage, { duration: 4000 });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(summary);
    toast.success('Copied!', {
      duration: 1500,
      position: 'bottom-right',
      style: {
        background: '#10B981', // Green background
        color: '#fff',
        fontWeight: 'bold',
        marginRight: '30px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10B981',
      },
    });
  };

  const handleRegenerate = () => {
    setError('');
    toast.loading('Regenerating...', { duration: 1000 });
    generateSummary();
  };

  return (
    <aside className="w-[380px] bg-white border-l border-gray-200 p-6 flex flex-col">
      <div className="flex flex-col flex-1">
        <div className="flex flex-col mb-6">
          <h2 className="text-gray-900 text-xl font-bold">AI Tools</h2>
          <p className="text-gray-500 text-sm">Enhance your document with AI</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* AI Actions */}
        <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 mb-6">
          <button
            onClick={generateSummary}
            disabled={isGenerating}
            className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-primary text-white text-base font-bold gap-2 disabled:opacity-50 hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            {isGenerating ? "Generating..." : "Summarize"}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTool('qa')}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">forum</span>
              Q&A
            </button>

            <button
              onClick={() => setActiveTool('keypoints')}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-900 text-base font-bold">AI Summary</h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                  Generated
                </span>
              </div>

              <div className="bg-blue-50 text-gray-700 p-4 rounded-lg text-sm space-y-3 max-h-96 overflow-y-auto">
                {summary.split('\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleCopySummary}
                    className="text-gray-500 hover:text-primary transition-colors"
                    title="Copy summary"
                  >
                    <span className="material-symbols-outlined">content_copy</span>
                  </button>
                </div>

                <button 
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-xl">refresh</span>
                  Regenerate
                </button>
              </div>
            </div>
          )}

          {/* Q&A PANEL */}
          {activeTool === 'qa' && (
            <div id="qa-panel">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 text-base font-bold">Ask Questions</h3>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                  Beta
                </span>
              </div>
              
              <QAComponent 
                documentId={documentId}
                documentContent={documentContent}
              />
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="material-symbols-outlined text-sm">info</span>
                  <p>Answers are based only on the document content</p>
                </div>
              </div>
            </div>
          )}

          {/* KEY POINTS PANEL */}
          {activeTool === 'keypoints' && (
         
              
              <KeyPointsComponent 
                documentId={documentId}
                documentContent={documentContent}
              />
            
          )}

          {/* Empty state */}
          {!activeTool && (
            <div className="text-center py-12 text-gray-500">
              <span className="material-symbols-outlined text-4xl mb-3 text-gray-300">
                auto_awesome
              </span>
              <p className="text-sm">Select an AI tool to get started</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AISidebar;