import { useForm } from 'react-hook-form';
import { Note } from '../types';
import { useNotesStore } from '../stores/notes';

type NoteFormFields = {
  text: string;
};

type NoteFormProps = {
  note?: Note;
  onSave?: () => void;
  onCancel?: () => void;
};

const NoteForm: React.FC<NoteFormProps> = ({ note, onSave, onCancel }) => {
  const { register, reset, handleSubmit } = useForm<NoteFormFields>();
  const { addNote, updateNote } = useNotesStore();

  const onSubmit = ({ text }: { text: string }) => {
    const currentTime = new Date()

    if (note) {
      const updatePayload: Partial<Note> = { text, updated: currentTime }
      updateNote(note.id, updatePayload);
    }
    else {
      const newNote = { id: Date.now().toString(), text, created: currentTime, updated: undefined }
      addNote(newNote);
    }

    reset()
    onSave?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="dark:text-gray-300">
        <textarea
          id="text"
          {...register("text", { required: true })}
          className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:text-gray-700"
          defaultValue={note?.text}
          placeholder="Write a few words about how you feel..."
        />
      </div>
      <div className="flex justify-end mt-2">
        {note && <button type='button' onClick={onCancel} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2">Cancel</button>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
