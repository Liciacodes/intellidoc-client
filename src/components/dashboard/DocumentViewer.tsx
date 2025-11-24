// components/document/DocumentViewer.tsx
import React, { useState, useEffect } from 'react';
import { useDocumentStore } from '../../store/useDocumentStore';
import AISidebar from './AISidebar';

interface DocumentViewerProps {
  documentId: string;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentId, onClose }) => {
  const { documents } = useDocumentStore();
  const [documentContent, setDocumentContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const document = documents.find(doc => doc.id === documentId);

  useEffect(() => {
    const fetchDocumentContent = async () => {
      if (!document) return;

      try {
        setIsLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/documents/${documentId}/content`
        );
        const content = await response.json();

        if (!response.ok) {
          throw new Error(content.error || "Failed to fetch document content");
        }

        if (!content.text || content.text.trim() === "") {
          setDocumentContent(`# ${document.title}\n\nNo text could be extracted from this file.`);
          return;
        }

        setDocumentContent(content.text);

      } catch (error) {
        console.error('Error fetching document content:', error);
        setDocumentContent(
          `# ${document?.title}\n\nUnable to load content or unsupported file type.`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocumentContent();
  }, [documentId, document]);

  if (!document) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl text-gray-600">Document not found</p>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-hidden bg-white">
      {/* Document Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-12 rounded-lg shadow-sm h-full max-w-4xl mx-auto">

          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button 
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
              Close
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-600">Loading document content...</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{document.title}</h2>
              <div className="text-gray-600 space-y-4 leading-relaxed whitespace-pre-wrap">
                {documentContent}
              </div>
            </>
          )}
        </div>
      </main>

      {/* AI Sidebar */}
      <AISidebar 
        documentId={documentId}
        documentContent={documentContent}
      />
    </div>
  );
};

export default DocumentViewer;
