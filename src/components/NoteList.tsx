import { useState } from 'react';
import { useNotesStore } from '../stores/notes';
import { Note } from '../types';
import NoteForm from './NoteForm';
import { formatDateLocally } from '../lib/dateUtilities';

const NoteItem: React.FC<{ note: Note }> = ({ note }) => {
  const { deleteNote } = useNotesStore();
  const [isEditing, setIsEditing] = useState(false);

  const formattedDate = formatDateLocally(new Date(note.updated || note.created), 'MMM do, yyyy HH:mm');

  if (isEditing) {
    return <NoteForm note={note} onSave={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-6">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
        <div className="space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap break-words">
        {note.text}
      </p>
    </div>
  );
}

const NoteList: React.FC = () => {
  const { notes } = useNotesStore();

  return (
    <div className="p-6 mb-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Your Notes</h2>
      <NoteForm />
      {notes.length === 0 ? (
        <p>You haven't added any notes yet. Start by adding one!</p>
      ) : (
        <ul className="space-y-4 pt-4">
          {notes.map((note) => (
            <li key={note.id}>
              <NoteItem note={note} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;