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
  const [diffTime, setDiffTime] = useState<number>(0);
  const [isMilestonesVisible, setIsMilestonesVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const quitDate = new Date(addiction.quitDate);
      const diffTime = Math.abs(now.getTime() - quitDate.getTime());
      setDiffTime(diffTime);
    }, 1000);
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
    <div className={`bg-white dark:bg-gray-700 text-card-foreground shadow-md rounded-lg p-4 sm:p-6 flex flex-col items-center justify-between w-full max-w-3xl ${isMilestonesVisible ? 'dark:border-gray-500' : ''}`}>
      <h2 className={`text-3xl sm:text-4xl font-bold text-primary pb-4 sm:pb-8 dark:text-white`}>{addictionType!.name}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-center px-4 sm:px-16 pb-4 sm:pb-8">
        <TimeDisplay value={days} unit="days" />
        <TimeDisplay value={hours} unit="hours" />
        <TimeDisplay value={minutes} unit="minutes" />
        <TimeDisplay value={seconds} unit="seconds" />
      </div>
      <div className="flex flex-col items-center justify-center w-full pb-4 sm:pb-8">
        <div className={`text-3xl sm:text-4xl font-bold text-primary dark:text-white`}>{formatMoney(moneySaved, 4)}</div>
        <div className={`text-xl sm:text-2xl text-muted-foreground dark:text-gray-300`}>Money Saved</div>
      </div>
      <div className={`flex flex-wrap justify-center gap-2 dark:border-gray-500 ${isMilestonesVisible ? 'dark:bg-gray-700' : ''}`}>
        <ActionButton onClick={handleEdit} label="Edit" ariaLabel="Edit addiction" />
        <ActionButton onClick={handleDelete} label="Delete" ariaLabel="Delete addiction" className="hover:bg-red-500 hover:text-white" />
        <ActionButton
          onClick={() => setIsMilestonesVisible(!isMilestonesVisible)}
          label={`${isMilestonesVisible ? 'Hide' : 'Show'} Milestones`}
          ariaLabel={`${isMilestonesVisible ? 'Hide' : 'Show'} milestone list`}
        />
      </div>
      {isMilestonesVisible && <MilestoneList addiction={addiction} />}
    </div>
  );
};

const TimeDisplay: React.FC<{ value: number; unit: string }> = ({ value, unit }) => (
  <div className={`dark:text-gray-300 text-3xl sm:text-4xl font-bold text-primary`}>
    <div className={`dark:text-gray-300 text-3xl sm:text-4xl`}>{value}</div>
    <div className={`dark:text-gray-300 text-xl sm:text-2xl text-muted-foreground`}>{unit}</div>
  </div>
);

const ActionButton: React.FC<{ onClick: () => void; label: string; ariaLabel: string; className?: string }> = ({ onClick, label, ariaLabel, className = '' }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background dark:bg-dark-background dark:border-dark-border dark:hover:bg-dark-blue-700 hover:bg-blue-700 hover:text-white dark:hover:text-dark-hover-text px-4 py-2 ${className}`}
    aria-label={ariaLabel}
  >
    {label}
  </button>
);

export default AddictionItem;

