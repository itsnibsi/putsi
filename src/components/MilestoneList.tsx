import { milestones } from '../data/milestones';
import { generateMoneySavingMilestones } from '../lib/moneyMilestones';
import { Addiction } from '../types';

const calculateProgress = (quitDate: string, milestone: number) => {
  const now = new Date().getTime();
  const quit = new Date(quitDate).getTime();
  const diffTime = now - quit;
  const progress = (diffTime / (milestone * 24 * 60 * 60 * 1000)) * 100;
  return Math.min(progress, 100);
};

type Props = {
  addiction: Addiction;
}

export default function MilestoneList({ addiction }: Props) {
  const relevantMilestones = milestones
    .filter(milestone => milestone.addictionType === addiction.typeId)
    .sort((a, b) => a.timeframe - b.timeframe);

  let finalMilestones;
  if (addiction.weeklyCost === 0) {
    finalMilestones = relevantMilestones;
  }
  else {
    const moneyMilestoneValues = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
    const moneyMilestones = generateMoneySavingMilestones(addiction, moneyMilestoneValues);
    finalMilestones = [...relevantMilestones, ...moneyMilestones].sort((a, b) => a.timeframe - b.timeframe);
  }

  return (
    <div className="p-4 w-full">
      <div className="relative pt-8">
        {finalMilestones.map((milestone, index) => {
          const progress = calculateProgress(addiction.quitDate, milestone.timeframe);
          const hasReachedMilestone = progress >= 100;

          return (
            <div key={milestone.id} className="mb-4 relative z-10">
              <div className="flex items-center mb-2">
                <div className={`w-6 h-6 rounded-full ${hasReachedMilestone ? 'bg-green-500' : 'bg-gray-400'} flex items-center justify-center text-white text-xs font-bold text-right`}>
                  {index + 1}
                </div>
                <div className="ml-4 flex-grow">
                  <p className="text-sm font-medium">{milestone.description}</p>
                  <p className="text-xs text-gray-500">{`${milestone.timeframe} days`}</p>
                </div>
                <p className={`text-sm font-semibold ${hasReachedMilestone ? 'text-green-500' : 'text-gray-500'}`}>
                  {hasReachedMilestone ? 'Reached' : `${Math.round(progress)}%`}
                </p>
              </div>
              <div className="ml-8 bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          );
        })}
        <div className="absolute left-3 z-0 top-0 bottom-0 w-px bg-gray-300"></div>
      </div>
    </div>
  );
}