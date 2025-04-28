"use client";

import { UsageCard } from "./UsageCard";

interface UsageData {
  screenshots: {
    used: number;
    total: number;
    percentage: number;
  };
  storage: {
    used: number;
    total: number;
    percentage: number;
  };
  history: {
    days: number;
    used: number;
    percentage: number;
  };
}

interface UsageStatisticsProps {
  usageData: UsageData;
}

export function UsageStatistics({ usageData }: UsageStatisticsProps) {
  return (
    <section>
      <h2 className='text-xl font-bold mb-4 text-text'>Usage Statistics</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <UsageCard
          title='Screenshots'
          used={usageData.screenshots.used}
          total={usageData.screenshots.total}
          percentage={usageData.screenshots.percentage}
          unit=''
          remainingText={`${
            usageData.screenshots.total - usageData.screenshots.used
          } screenshots remaining this month`}
        />

        <UsageCard
          title='Storage'
          used={usageData.storage.used}
          total={usageData.storage.total}
          percentage={usageData.storage.percentage}
          unit='GB'
          remainingText={`${(
            usageData.storage.total - usageData.storage.used
          ).toFixed(1)}GB available storage`}
        />

        <UsageCard
          title='History'
          used={usageData.history.used}
          total={usageData.history.days}
          percentage={usageData.history.percentage}
          unit=' days'
          remainingText={`${
            usageData.history.days - usageData.history.used
          } days remaining in history`}
          showUsedDays
        />
      </div>
    </section>
  );
}
