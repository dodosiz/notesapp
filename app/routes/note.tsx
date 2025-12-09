import { useState, useEffect } from "react";
import type { Route } from "./+types/note";
import { Link, useParams } from "react-router";
import { useNotes } from "../store/notes-store";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: "View Note - Notes App" },
    { name: "description", content: "View your note" },
  ];
}

export default function Note() {
  const { id } = useParams();
  const { getNote, updateNote } = useNotes();
  const note = getNote(id!);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note?.title || "");
  const [editContent, setEditContent] = useState(note?.content || "");

  useEffect(() => {
    if (note) {
      setEditTitle(note.title);
      setEditContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    if (note && id) {
      updateNote(id, {
        title: editTitle,
        content: editContent,
      });
      setIsEditing(false);
    }
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Note Not Found
          </h1>
          <Link
            to="/notes"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link
            to="/notes"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Notes
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full mb-4 px-4 py-3 text-2xl font-bold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full mb-4 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-64"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditTitle(note.title);
                    setEditContent(note.content);
                    setIsEditing(false);
                  }}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {note.title}
                </h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                Created: {new Date(note.createdAt).toLocaleString()}
              </p>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
