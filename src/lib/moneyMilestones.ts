import { Addiction, Milestone } from '../types';
import formatMoney from './moneyFormatter';

export function calculateDaysToSaveAmount(weeklyCost: number, amount: number): number {
  const daysInWeek = 7.0;
  return ((amount / weeklyCost) * daysInWeek);
}

export function generateMoneyMilestones(addiction: Addiction, amounts: number[]): Milestone[] {
  return amounts.map((amount, index) => {
    const days = calculateDaysToSaveAmount(addiction.weeklyCost, amount);

    return {
      id: `ms${index + 1}`,
      addictionType: addiction.typeId,
      days,
      description: `Saved a total of ${formatMoney(amount, 2)}`,
    };
  });
}
