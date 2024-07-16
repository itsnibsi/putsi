import React, { useState } from 'react';
import { addictionTypes } from '../data/addictionTypes';
import { addAddiction, editAddiction } from '../stores/addictions';
import { Addiction } from '../types';
import { format } from 'date-fns';

type AddictionFormFields = {
  typeId: string;
  quitDate: string;
  weeklyCost: string;
};

type AddictionFormProps = {
  addiction?: Addiction;
  onHandleCancel?: () => void;
  onHandleSubmit?: (addiction: Addiction) => void;
  collapsible?: boolean;
  collapsed?: boolean;
};

function AddictionForm({ addiction, onHandleCancel, onHandleSubmit, collapsible = false, collapsed = false }: AddictionFormProps) {
  const [isExpanded, setIsExpanded] = useState(!collapsed);
  const [formData, setFormData] = useState<AddictionFormFields>({
    typeId: addiction?.typeId || addictionTypes[0].id,
    quitDate: format(addiction?.quitDate || new Date(), "yyyy-MM-dd'T'HH:mm"),
    weeklyCost: addiction?.weeklyCost.toString() || '',
  });
  const [errors, setErrors] = useState<Partial<AddictionFormFields>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<AddictionFormFields> = {};
    if (!formData.typeId) newErrors.typeId = 'Required';
    if (!formData.quitDate) newErrors.quitDate = 'Required';
    if (formData.weeklyCost && isNaN(parseFloat(formData.weeklyCost))) {
      newErrors.weeklyCost = 'Must be a number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { typeId, quitDate, weeklyCost } = formData;
    const actualDate = new Date(quitDate);
    const parsedWeeklyCost = weeklyCost ? parseFloat(weeklyCost) : 0;

    if (addiction) {
      const updatePayload = { typeId, quitDate: actualDate, weeklyCost: parsedWeeklyCost };
      editAddiction(addiction.id, updatePayload);
      onHandleSubmit?.({ ...addiction, ...updatePayload });
    } else {
      const newAddiction = { id: Date.now().toString(), typeId, quitDate: actualDate, weeklyCost: parsedWeeklyCost };
      addAddiction(newAddiction);
      onHandleSubmit?.(newAddiction);
    }

    setFormData({ typeId: addictionTypes[0].id, quitDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"), weeklyCost: '' });
    if (collapsible) setIsExpanded(false);
  };

  const handleCancel = () => {
    onHandleCancel?.();
    setFormData({ typeId: addictionTypes[0].id, quitDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"), weeklyCost: '' });
    if (collapsible) setIsExpanded(false);
  };

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden mb-6 dark:bg-gray-800">
      {collapsible && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left font-bold text-lg bg-blue-500 text-white dark:bg-blue-700 flex justify-between items-center"
        >
          {addiction ? 'Edit Addiction' : 'Add New Addiction'}
          <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      )}
      {(!collapsible || isExpanded) && (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="dark:text-gray-300">
              <label htmlFor="typeId" className="block mb-1 font-medium text-sm">Addiction Type</label>
              <select
                id="typeId"
                name="typeId"
                value={formData.typeId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm"
              >
                {addictionTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              {errors.typeId && <p className="text-red-500 text-xs mt-1">{errors.typeId}</p>}
            </div>
            <div className="dark:text-gray-300">
              <label htmlFor="quitDate" className="block mb-1 font-medium text-sm">Quit Date and Time</label>
              <input
                type="datetime-local"
                id="quitDate"
                name="quitDate"
                value={formData.quitDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {errors.quitDate && <p className="text-red-500 text-xs mt-1">{errors.quitDate}</p>}
            </div>
          </div>
          <div className="mt-4 dark:text-gray-300">
            <label htmlFor="weeklyCost" className="block mb-1 font-medium text-sm">Weekly Cost ($)</label>
            <input
              type="number"
              id="weeklyCost"
              name="weeklyCost"
              value={formData.weeklyCost}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm"
              step="0.01"
            />
            {errors.weeklyCost && <p className="text-red-500 text-xs mt-1">{errors.weeklyCost}</p>}
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 dark:bg-blue-700 dark:hover:bg-blue-800 text-sm font-medium">
              {addiction ? 'Update' : 'Add'}
            </button>
            {addiction && (
              <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 text-sm font-medium">
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default AddictionForm;