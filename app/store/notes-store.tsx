import { createContext, useContext, useState, type ReactNode } from "react";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const initialNotes: Note[] = [
  {
    id: "1",
    title: "Welcome Note",
    content: "This is your first note! Click to view and edit.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Shopping List",
    content: "Milk, Eggs, Bread, Coffee",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Ideas",
    content: "Build a notes app with React Router",
    createdAt: new Date().toISOString(),
  },
];

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const addNote = (note: Note) => {
    setNotes((prev) => [note, ...prev]);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updates } : note))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const getNote = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, getNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
