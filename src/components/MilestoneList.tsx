import milestones from '../data/milestones';
import { generateMoneyMilestones } from '../lib/moneyMilestones';
import { Addiction } from '../types';
import { calculateProgress, getDaysDifference } from '../lib/dateUtilities';

type Props = {
  addiction: Addiction;
}

export default function MilestoneList({ addiction }: Props) {
  const relevantMilestones = milestones
    .filter(milestone => milestone.addictionType === addiction.typeId)
    .sort((a, b) => a.days - b.days);

  let finalMilestones;
  if (addiction.weeklyCost === 0) {
    finalMilestones = relevantMilestones;
  }
  else {
    const moneyMilestoneValues = [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
    const moneyMilestones = generateMoneyMilestones(addiction, moneyMilestoneValues);
    finalMilestones = [...relevantMilestones, ...moneyMilestones].sort((a, b) => a.days - b.days);
  }

  const currentDate = new Date();
  const quitDate = new Date(addiction.quitDate);

  return (
    <div className="milestone-list p-4 w-full h-96 overflow-y-scroll dark:bg-gray-800">
      <div className="relative pt-8">
        {finalMilestones.map((milestone, index) => {
          const progress = calculateProgress(quitDate, milestone.days);
          const hasReachedMilestone = progress >= 100;
          const milestoneDate = new Date(quitDate.getTime() + milestone.days * 24 * 60 * 60 * 1000);
          const daysDifference = getDaysDifference(currentDate, milestoneDate);
          const timeDescription = daysDifference === 0
            ? "Today"
            : daysDifference > 0
              ? `In ${daysDifference} day${daysDifference > 1 ? 's' : ''}`
              : `${Math.abs(daysDifference)} day${Math.abs(daysDifference) > 1 ? 's' : ''} ago`;

          return (
            <div key={milestone.id} className="mb-4 relative z-10">
              <div className="flex items-center mb-2">
                <div className={`w-6 h-6 rounded-full ${hasReachedMilestone ? 'bg-green-500' : 'bg-gray-400'} dark:${hasReachedMilestone ? 'dark:bg-green-700' : 'dark:bg-gray-600'} flex items-center justify-center text-white text-xs font-bold text-right`}>
                  {index + 1}
                </div>
                <div className="ml-4 flex-grow">
                  <p className="text-sm font-medium dark:text-gray-300">{milestone.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{timeDescription}</p>
                </div>
                <p className={`text-sm font-semibold ${hasReachedMilestone ? 'text-green-500' : 'text-gray-500'} dark:${hasReachedMilestone ? 'dark:text-green-700' : 'dark:text-gray-400'}`}>
                  {hasReachedMilestone ? 'Reached' : `${Math.round(progress)}%`}
                </p>
              </div>
              <div className="ml-8 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          );
        })}
        <div className="absolute left-3 z-0 top-0 bottom-0 w-px bg-gray-300 dark:bg-gray-600"></div>
      </div>
    </div>
  );
}

