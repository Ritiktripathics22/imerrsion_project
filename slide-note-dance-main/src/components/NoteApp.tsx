
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  timestamp: Date;
}

const NoteApp = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentNote, setCurrentNote] = useState('');

  const saveNote = () => {
    if (currentNote.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: currentNote.trim(),
        timestamp: new Date()
      };
      setNotes(prev => [newNote, ...prev]);
      setCurrentNote('');
      setIsWriting(false);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const cancelWriting = () => {
    setCurrentNote('');
    setIsWriting(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-600 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Note App</h1>
          <p className="text-white/80 text-lg">Double click on note to remove</p>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {notes.map((note) => (
            <div
              key={note.id}
              onDoubleClick={() => deleteNote(note.id)}
              className="bg-yellow-200 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 min-h-[200px] group relative"
              title="Double-click to remove"
            >
              <div className="text-sm text-gray-600 mb-2">
                {formatDate(note.timestamp)}
              </div>
              <p className="text-gray-800 whitespace-pre-wrap break-words">
                {note.content}
              </p>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500">Double-click to delete</span>
              </div>
            </div>
          ))}
        </div>

        {/* Writing Modal */}
        {isWriting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Write a Note</h2>
                <button
                  onClick={cancelWriting}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                placeholder="Start writing your note here..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={cancelWriting}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNote}
                  disabled={!currentNote.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Add Button */}
        <button
          onClick={() => setIsWriting(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-white text-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-105"
        >
          <Plus className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default NoteApp;
