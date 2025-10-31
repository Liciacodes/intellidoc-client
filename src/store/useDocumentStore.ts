import { create } from "zustand";

// Define the document type
export interface UploadedDocument {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File;
}

// Define the state shape
interface DocumentStore {
  documents: UploadedDocument[];
  addDocuments: (newDocs: File[]) => void;
  removeDocument: (name: string) => void;
  clearDocuments: () => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],

  addDocuments: (newDocs) =>
    set((state) => {
      const formattedDocs = newDocs.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        file,
      }));

      return {
        documents: [...state.documents, ...formattedDocs],
      };
    }),

  removeDocument: (name) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.name !== name),
    })),

  clearDocuments: () => set({ documents: [] }),
}));
