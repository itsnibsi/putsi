import React, { useState, useEffect } from 'react';
import { Addiction } from '../types';
import { useAddictionContext } from '../contexts/AddictionContext';
import EditAddictionForm from './EditAddictionForm';
import { addictionTypes } from '../data/addictionTypes';
import formatMoney from '../lib/moneyFormatter';
import MilestoneList from './MilestoneList';

interface AddictionItemProps {
  addiction: Addiction;
}

const AddictionItem: React.FC<AddictionItemProps> = ({ addiction }) => {
  const { editAddiction, deleteAddiction } = useAddictionContext();
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

  const addictionType = addictionTypes.find(type => type.id === addiction.typeId);
  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  const moneySaved = (addiction.weeklyCost / 7) * (diffTime / (1000 * 60 * 60 * 24));

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedAddiction: Addiction) => {
    editAddiction(addiction.id, updatedAddiction);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this addiction?')) {
      deleteAddiction(addiction.id);
    }
  };

  if (isEditing) {
    return <EditAddictionForm addiction={addiction} onSave={handleSave} onCancel={handleCancel} />;
  }

  return (
    <div className="bg-white text-card-foreground shadow-md rounded-lg p-6 flex flex-col items-center justify-between w-full max-w-3xl">
      <div className="text-4xl font-bold text-primary pb-8">{addictionType!.name}</div>
      <div className="flex flex-row items-center justify-between w-full text-center px-16 pb-8">
        <div>
          <div className="text-4xl font-bold text-primary">{days}</div>
          <div className="text-2xl text-muted-foreground">days</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-primary">{hours}</div>
          <div className="text-2xl text-muted-foreground">hours</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-primary">{minutes}</div>
          <div className="text-2xl text-muted-foreground">minutes</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-primary">{seconds}</div>
          <div className="text-2xl text-muted-foreground">seconds</div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full pb-8">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-4xl font-bold text-primary">{formatMoney(moneySaved, 4)}</div>
          <div className="text-2xl text-muted-foreground">Money Saved</div>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button onClick={handleEdit} className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-blue-700 hover:text-white px-4 py-2">
          Edit
        </button>
        <button onClick={handleDelete} className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-red-500 hover:text-white px-4 py-2">
          Delete
        </button>
        <button
          onClick={() => setIsMilestonesVisible(!isMilestonesVisible)}
          className="rounded-md text-sm font-medium border border-input bg-background hover:bg-blue-700 hover:text-white px-4 py-2"
        >
          Toggle Milestone List
        </button>
      </div>
      {isMilestonesVisible && (
        <MilestoneList addiction={addiction} />
      )}
    </div>
  );
};

export default AddictionItem;

