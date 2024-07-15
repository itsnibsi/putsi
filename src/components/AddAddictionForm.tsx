import React, { useState } from 'react';
import { useAddictionContext } from '../contexts/AddictionContext';

const AddAddictionForm: React.FC = () => {
  const { addAddiction } = useAddictionContext();
  const [name, setName] = useState('');
  const [quitDate, setQuitDate] = useState('');
  const [weeklyCost, setWeeklyCost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && quitDate && weeklyCost) {
      addAddiction({
        id: Date.now().toString(),
        name,
        quitDate,
        weeklyCost: parseFloat(weeklyCost),
      });
      setName('');
      setQuitDate('');
      setWeeklyCost('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Add New Addiction</h2>
      <div>
        <label htmlFor="name" className="block mb-1">Addiction Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label htmlFor="quitDate" className="block mb-1">Quit Date:</label>
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
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Add Addiction
      </button>
    </form>
  );
};

export default AddAddictionForm;