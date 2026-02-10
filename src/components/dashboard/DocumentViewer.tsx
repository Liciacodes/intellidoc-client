import React, { useState, useEffect } from 'react';
import { useDocumentStore } from '../../store/useDocumentStore';
import AISidebar from './AISidebar';
import { createApiEndpoint } from '../../config/api';

interface DocumentViewerProps {
  documentId: string;
  onClose: () => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentId, onClose }) => {
  const { documents } = useDocumentStore();
  const [documentContent, setDocumentContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAISidebar, setShowAISidebar] = useState(false); // For mobile toggle

  const document = documents.find(doc => doc.id === documentId);

  useEffect(() => {
    const fetchDocumentContent = async () => {
      if (!document) return;

      try {
        setIsLoading(true);

        const response = await fetch(createApiEndpoint(`api/documents/${documentId}/content`)
          ,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
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

  const isPDF = document?.fileType === 'application/pdf';

  if (!document) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <div className="text-center">
          <p className="text-lg md:text-xl text-gray-600 mb-4">Document not found</p>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row flex-1 overflow-hidden bg-white">
      {/* Mobile AI Tools Toggle Button */}
      <button
        onClick={() => setShowAISidebar(!showAISidebar)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Toggle AI Tools"
      >
        <span className="material-symbols-outlined">
          {showAISidebar ? 'close' : 'auto_awesome'}
        </span>
      </button>

      {/* Document Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="bg-white p-4 md:p-8 lg:p-12 rounded-lg shadow-sm h-full max-w-4xl mx-auto">

          {/* Header with Close button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
              {document.title}
            </h2>
            <button 
              onClick={onClose}
              className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors whitespace-nowrap"
            >
              <span className="material-symbols-outlined">close</span>
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-32 md:h-48">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm md:text-base">Loading document content...</p>
              </div>
            </div>
          ) : (
            <>
              {isPDF ? (
                <div className="space-y-4">
                  {/* PDF Viewer Container */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex justify-center">
                    <iframe
                      src={`${document.fileUrl}#toolbar=0`}
                      className="w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px]"
                      title={document.title}
                    />
                  </div>

                  {/* PDF Info */}
                  <div className="text-xs md:text-sm text-gray-600 mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                      PDF Document
                    </span>
                    <span className="hidden sm:inline">|</span>
                    <a 
                      href={document.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base">open_in_new</span>
                      Open in new tab
                    </a>
                  </div>
                </div>
              ) : (
                /* Text File Content */
                <div className="text-gray-600 space-y-4 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                  {documentContent}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* AI Sidebar - Desktop: Always visible, Mobile: Slide-in panel */}
      <div className={`
        fixed lg:static inset-y-0 right-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${showAISidebar ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        w-full sm:w-96 lg:w-[380px]
      `}>
        <AISidebar 
          documentId={documentId}
          documentContent={documentContent}
          onClose={() => setShowAISidebar(false)}
          isMobile={showAISidebar}
        />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {showAISidebar && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setShowAISidebar(false)}
        />
      )}
    </div>
  );
};

export default DocumentViewer;




// import React, { useState, useEffect } from 'react';
// import { useDocumentStore } from '../../store/useDocumentStore';
// import AISidebar from './AISidebar';

// interface DocumentViewerProps {
//   documentId: string;
//   onClose: () => void;
// }

// const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentId, onClose }) => {
//   const { documents } = useDocumentStore();
//   const [documentContent, setDocumentContent] = useState<string>('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [numPages, setNumPages] = useState<number>(0);
//   const [currentPage, setCurrentPage] = useState<number>(1);

//   const document = documents.find(doc => doc.id === documentId);

//   useEffect(() => {
//     const fetchDocumentContent = async () => {
//       if (!document) return;

//       try {
//         setIsLoading(true);

//         const response = await fetch(
//           `http://localhost:5000/api/documents/${documentId}/content`
//         );
//         const content = await response.json();

//         if (!response.ok) {
//           throw new Error(content.error || "Failed to fetch document content");
//         }

//         if (!content.text || content.text.trim() === "") {
//           setDocumentContent(`# ${document.title}\n\nNo text could be extracted from this file.`);
//           return;
//         }

//         setDocumentContent(content.text);

//       } catch (error) {
//         console.error('Error fetching document content:', error);
//         setDocumentContent(
//           `# ${document?.title}\n\nUnable to load content or unsupported file type.`
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDocumentContent();
//   }, [documentId, document]);

//   const isPDF = document?.fileType === 'application/pdf';

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   if (!document) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center">
//           <p className="text-xl text-gray-600">Document not found</p>
//           <button 
//             onClick={onClose}
//             className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-1 overflow-hidden bg-white">
//       {/* Document Content */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         <div className="bg-white p-12 rounded-lg shadow-sm h-full max-w-4xl mx-auto">

//           {/* Close button */}
//           <div className="flex justify-end mb-4">
//             <button 
//               onClick={onClose}
//               className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <span className="material-symbols-outlined">close</span>
//               Close
//             </button>
//           </div>

//           {isLoading ? (
//             <div className="flex justify-center items-center h-32">
//               <p className="text-gray-600">Loading document content...</p>
//             </div>
//           ) : (
//             <>
//               <h2 className="text-xl font-bold text-gray-900 mb-6">{document.title}</h2>
              
//               {isPDF ? (
//                 <div className="space-y-4">
//                   {/* PDF Viewer Container */}
//                   <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex justify-center">
//                     <iframe
//                       src={`${document.fileUrl}#toolbar=0`}
//                       className="w-full h-96"
//                       title={document.title}
//                     />
//                   </div>

//                   {/* PDF Info */}
//                   <div className="text-sm text-gray-600 mt-4">
//                     <p>
//                       📄 PDF Document | 
//                       <a 
//                         href={document.fileUrl} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="text-primary hover:underline ml-2"
//                       >
//                         Open in new tab
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 /* Text File Content */
//                 <div className="text-gray-600 space-y-4 leading-relaxed whitespace-pre-wrap">
//                   {documentContent}
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </main>

//       {/* AI Sidebar */}
//       <AISidebar 
//         documentId={documentId}
//         documentContent={documentContent}
//       />
//     </div>
//   );
// };

// export default DocumentViewer;