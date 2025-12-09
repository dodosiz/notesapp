import { useState } from "react";
import type { Route } from "./+types/notes";
import { Link, useNavigate } from "react-router";
import { useNotes } from "../store/notes-store";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "My Notes - Notes App" },
    { name: "description", content: "View and manage your notes" },
  ];
}

export default function Notes() {
  const { notes, addNote, deleteNote } = useNotes();
  const [showNewNote, setShowNewNote] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const navigate = useNavigate();

  const handleAddNote = () => {
    if (newTitle.trim() || newContent.trim()) {
      const note = {
        id: Date.now().toString(),
        title: newTitle.trim() || "Untitled Note",
        content: newContent,
        createdAt: new Date().toISOString(),
      };
      addNote(note);
      setNewTitle("");
      setNewContent("");
      setShowNewNote(false);
      navigate(`/notes/${note.id}`);
    }
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Notes
            </h1>
            <Link
              to="/"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to Home
            </Link>
          </div>
          <button
            onClick={() => setShowNewNote(!showNewNote)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            {showNewNote ? "Cancel" : "+ New Note"}
          </button>
        </div>

        {showNewNote && (
          <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <input
              type="text"
              placeholder="Note title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full mb-3 px-4 py-2 text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <textarea
              placeholder="Note content..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
            />
            <button
              onClick={handleAddNote}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Save Note
            </button>
          </div>
        )}

        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No notes yet. Create your first note!
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <Link to={`/notes/${note.id}`} className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                      {note.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                      {note.content}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="ml-4 px-3 py-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
