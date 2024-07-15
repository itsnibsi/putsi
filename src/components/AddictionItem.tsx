import React from 'react';
import { Addiction } from '../types';

interface AddictionItemProps {
  addiction: Addiction;
}

const AddictionItem: React.FC<AddictionItemProps> = ({ addiction }) => {
  const quitDate = new Date(addiction.quitDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - quitDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const moneySaved = (addiction.weeklyCost / 7) * (diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold">{addiction.name}</h3>
      <p>Quit Date: {new Date(addiction.quitDate).toLocaleString()}</p>
      <p>Time Since Quitting: {diffDays} days, {diffHours} hours</p>
      <p>Money Saved: ${moneySaved.toFixed(2)}</p>
    </div>
  );
};

export default AddictionItem;