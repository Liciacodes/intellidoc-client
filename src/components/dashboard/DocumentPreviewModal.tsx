import React from "react";
import type { UploadedDocument } from "../../store/useDocumentStore";

interface DocumentPreviewModalProps {
  document: UploadedDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  onClose,
  isOpen,
}) => {
  if (!isOpen || !document) return null;
  if (!document) return null;
  const { title, fileUrl, fileType, } = document;

  const renderPreview = () => {
    if (fileType.includes("image")) {
      return (
        <img
          src={fileUrl}
          alt={title}
          className="max-h-[70vh] mx-auto rounded-lg"
        />
      );
    } else if (fileType.includes("pdf")) {
      return (
        <iframe
          src={fileUrl}
          title={title}
          className="w-full h-[70vh] rounded-lg"
        />
      );
    } else if (fileType.includes("text")) {
      return (
        <iframe
          src={fileUrl}
          title={title}
          className="w-full h-[70vh] rounded-lg bg-white"
        />
      );
    } else {
      return (
        <p className="text-center text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark">
          No preview available for this file type.
        </p>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-dashboard-bg-light dark:bg-dashboard-sidebar-dark rounded-2xl shadow-lg w-[90%] max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark hover:text-dashboard-primary"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <h2 className="text-xl font-semibold text-dashboard-text-light dark:text-dashboard-text-dark mb-4">
          {title}
        </h2>

        <div className="mb-6">{renderPreview()}</div>

        <div className="flex justify-end gap-3">
          <a
            href={fileUrl}
            download={title}
            className="flex items-center gap-2 bg-dashboard-primary text-white px-4 py-2 rounded-lg hover:bg-dashboard-primary/80 transition"
          >
            <span className="material-symbols-outlined text-base">
              download
            </span>
            Download
          </a>
          <button
            onClick={onClose}
            className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-dashboard-text-secondary-light dark:text-dashboard-text-secondary-dark px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <span className="material-symbols-outlined text-base">close</span>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreviewModal;
