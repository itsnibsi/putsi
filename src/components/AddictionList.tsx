import React, { useEffect, useState } from 'react';
import AddictionItem from './AddictionItem';
import { useAddictionsStore } from '../stores/addictions';
import { Addiction } from '../types';
import { DateUnitMilliseconds } from '../lib/dateUtilities';
import formatMoney from '../lib/moneyFormatter';
import AddictionForm from './AddictionForm';

const calculateTotalMoneySaved = (addictions: Addiction[]) => {
  const now = new Date();
  return addictions.reduce((acc, curr) => {
    const quitDate = new Date(curr.quitDate);
    const diffTime = Math.abs(now.getTime() - quitDate.getTime());
    const moneySaved = (curr.weeklyCost / 7) * (diffTime / (DateUnitMilliseconds.day));
    return acc + moneySaved;
  }, 0);
}

const AddictionList: React.FC = () => {
  const { addictions } = useAddictionsStore();
  const [totalMoneySaved, setTotalMoneySaved] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalMoneySaved(calculateTotalMoneySaved(addictions));
    }, 1000);
    return () => clearInterval(timer);
  }, [addictions]);

  return (
    <div className="space-y-4">
      <AddictionForm collapsible collapsed={true} />
      <ul className="space-y-4">
        {addictions.map((addiction) => (
          <li key={addiction.id}>
            <AddictionItem addiction={addiction} />
          </li>
        ))}
        <li>
          <div className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden p-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500 dark:text-green-400">
                {formatMoney(totalMoneySaved, 4)}
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-400">Money saved in total</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AddictionList;