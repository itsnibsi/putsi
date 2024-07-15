import React, { useState } from 'react';
import { Addiction } from '../types';
import { addictionTypes } from '../data/addictionTypes';

interface EditAddictionFormProps {
  addiction: Addiction;
  onSave: (updatedAddiction: Addiction) => void;
  onCancel: () => void;
}

const EditAddictionForm: React.FC<EditAddictionFormProps> = ({ addiction, onSave, onCancel }) => {
  const [typeId, setTypeId] = useState(addiction.typeId);
  const [quitDate, setQuitDate] = useState(addiction.quitDate);
  const [weeklyCost, setWeeklyCost] = useState(addiction.weeklyCost.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeId && quitDate && weeklyCost) {
      onSave({
        ...addiction,
        typeId,
        quitDate,
        weeklyCost: parseFloat(weeklyCost),
      });
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = addictionTypes.find(type => type.id === e.target.value);
    setTypeId(e.target.value);
    if (selectedType) {
      setWeeklyCost(selectedType.defaultWeeklyCost.toString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Edit Addiction</h2>
      <div>
        <label htmlFor="typeId" className="block mb-1">Addiction Type:</label>
        <select
          id="typeId"
          value={typeId}
          onChange={handleTypeChange}
          required
          className="w-full px-3 py-2 border rounded-md"
        >
          {addictionTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="quitDate" className="block mb-1">Quit Date and Time:</label>
        <input
          type="datetime-local"
          id="quitDate"
          value={quitDate}
          onChange={(e) => setQuitDate(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="weeklyCost" className="block mb-1">Weekly Cost ($):</label>
        <input
          type="number"
          id="weeklyCost"
          value={weeklyCost}
          onChange={(e) => setWeeklyCost(e.target.value)}
          required
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditAddictionForm;