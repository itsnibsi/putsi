import React, { useState, useEffect } from 'react';
import { Addiction } from '../types';
import { addictionTypes } from '../data/addictionTypes';
import formatMoney from '../lib/moneyFormatter';
import MilestoneList from './MilestoneList';
import { DateUnitMilliseconds, timeElapsedFromDiff } from '../lib/dateUtilities';
import AddictionForm from './AddictionForm';
import { deleteAddiction } from '../stores/addictions';

interface AddictionItemProps {
  addiction: Addiction;
}

const AddictionItem: React.FC<AddictionItemProps> = ({ addiction }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [diffTime, setDiffTime] = useState<number>(addiction.quitDate.getTime() - new Date().getTime());
  const [isMilestonesVisible, setIsMilestonesVisible] = useState(false);

  const calculateDiffTime = (a: Addiction) => {
    const now = new Date();
    const quitDate = new Date(a.quitDate);
    const diffTime = Math.abs(now.getTime() - quitDate.getTime());
    setDiffTime(diffTime);
  }

  useEffect(() => {
    const timer = setInterval(() => calculateDiffTime(addiction), 1000);
    return () => clearInterval(timer);
  }, [addiction]);

  const handleEdit = () => setIsEditing(true);
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this addiction?')) {
      deleteAddiction(addiction.id);
    }
  };

  if (isEditing) {
    return <AddictionForm
      addiction={addiction}
      onHandleCancel={() => setIsEditing(false)}
      onHandleSubmit={() => setIsEditing(false)}
    />;
  }

  const { days, hours, minutes, seconds } = timeElapsedFromDiff(diffTime);
  const addictionType = addictionTypes.find(type => type.id === addiction.typeId);
  const moneySaved = (addiction.weeklyCost / 7) * (diffTime / (DateUnitMilliseconds.day));

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Quitting {addictionType!.name}</h2>
          <div className="flex space-x-2">
            <ActionButton onClick={handleEdit} label="Edit" icon="✏️" />
            <ActionButton onClick={handleDelete} label="Delete" icon="🗑️" className="hover:bg-red-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <TimeDisplay value={days} unit="days" />
          <TimeDisplay value={hours} unit="hours" />
          <TimeDisplay value={minutes} unit="minutes" />
          <TimeDisplay value={seconds} unit="seconds" />
        </div>

        <div className="text-center">
          <div className="text-4xl font-bold text-green-500 dark:text-green-400">
            {formatMoney(moneySaved, 4)}
          </div>
          <div className="text-xl text-gray-600 dark:text-gray-400">Money saved</div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsMilestonesVisible(!isMilestonesVisible)}
            className="flex items-center space-x-2 px-4 py-2 mb-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-200 transition-colors duration-200"
          >
            <span>{isMilestonesVisible ? 'Hide' : 'Show'} Milestones</span>
            <span>{isMilestonesVisible ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>

      {isMilestonesVisible && (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 border-t border-gray-200 dark:border-gray-700">
          <MilestoneList addiction={addiction} />
        </div>
      )}
    </div>
  );
};

const TimeDisplay: React.FC<{ value: number; unit: string }> = ({ value, unit }) => (
  <div className="flex flex-col items-center">
    <div className="text-3xl font-bold text-gray-800 dark:text-white">{value}</div>
    <div className="text-sm text-gray-600 dark:text-gray-400">{unit}</div>
  </div>
);

const ActionButton: React.FC<{ onClick: () => void; label: string; icon: string; className?: string }> = ({ onClick, label, icon, className = '' }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 ${className}`}
    aria-label={label}
  >
    {icon}
  </button>
);

export default AddictionItem;