import { create } from "zustand";


export interface UploadedDocument {
  id: string;
  title: string;           
  fileUrl: string;         
  fileType: string;       
  textContent?: string;    
  uploadedAt: string; 
  size: number    
}

interface DocumentStore {
  documents: UploadedDocument[];
  searchQuery: string;
  filterType: string;
  sortOption: string;
  setSearchQuery: (query: string) => void;
  setFilterType: (type: string) => void;
  setSortOption: (option: string) => void;
  addDocuments: (newDocs: UploadedDocument[]) => void;
  removeDocument: (id: string) => void;
  clearDocuments: () => void;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  searchQuery: "",
  filterType: "all",
  sortOption: 'newest',
  
  setFilterType: (type: string) => set({ filterType: type }),
  setSortOption: (option: string) => set({ sortOption: option }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  addDocuments: (newDocs) =>
    set((state) => {
      const existingIds = new Set(state.documents.map(doc => doc.id));
      const uniqueNewDocs = newDocs.filter(doc => !existingIds.has(doc.id));
      
      return {
        documents: [...state.documents, ...uniqueNewDocs],
      };
    }),

  removeDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((doc) => doc.id !== id),
    })),

  clearDocuments: () => set({ documents: [] }),
}));