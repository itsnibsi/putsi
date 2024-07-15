import React from 'react';
import { useAddictionContext } from '../contexts/AddictionContext';
import { milestones } from '../data/milestones';

const MilestoneTracker: React.FC = () => {
  const { addictions } = useAddictionContext();

  const getRelevantMilestones = (addiction: string) => {
    return milestones.filter(milestone => milestone.addictionType === addiction);
  };

  const calculateProgress = (quitDateString: string, timeframe: number) => {
    const quitDate = new Date(quitDateString);
    const hoursSinceQuitting = (new Date().getTime() - quitDate.getTime()) / (1000 * 60 * 60);
    return Math.min(hoursSinceQuitting / timeframe * 100, 100);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Milestones</h2>
      {addictions.map(addiction => (
        <div key={addiction.id} className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{addiction.name}</h3>
          {getRelevantMilestones(addiction.name.toLowerCase()).map(milestone => (
            <div key={milestone.id} className="mb-2">
              <p>{milestone.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${calculateProgress(addiction.quitDate, milestone.timeframe)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MilestoneTracker;