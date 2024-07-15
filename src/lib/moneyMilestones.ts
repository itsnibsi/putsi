import { Addiction, Milestone } from '../types';
import formatMoney from './moneyFormatter';

/**
 * Calculate the days required to save a given amount based on weekly savings.
 * @param weeklyCost - The amount saved per week
 * @param amount - The target amount to save
 * @returns The number of days required to save the target amount
 */
export function calculateDaysToSave(weeklyCost: number, amount: number): number {
  const daysInWeek = 7.0;
  return ((amount / weeklyCost) * daysInWeek);
}

/**
 * Generate milestones for money saving.
 * @param addiction - The addiction object
 * @param amounts - An array of target amounts to save
 * @returns An array of milestones based on savings
 */
export function generateMoneySavingMilestones(addiction: Addiction, amounts: number[]): Milestone[] {
  return amounts.map((amount, index) => {
    const days = calculateDaysToSave(addiction.weeklyCost, amount);

    return {
      id: `ms${index + 1}`,
      addictionType: addiction.typeId,
      timeframe: days,
      description: `You've saved ${formatMoney(amount, 2)}!`,
    };
  });
}
