"use client";

import { StatCard } from "@/components/thegridcn/stat-card";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";

interface UsageData {
  currentLevels: number;
  maxLevels: number;
  remainingLevels: number;
  canProceed: boolean;
  message?: string;
}

interface UsageDashboardProps {
  usageData: UsageData;
  totalGamesAndLevels: {
    totalGames: number;
    totalLevels: number;
  };
}

export function UsageDashboard({
  usageData,
  totalGamesAndLevels,
}: UsageDashboardProps) {
  if (!usageData) {
    return (
      <div className="w-full rounded border border-destructive/40 bg-card/80 p-4 font-mono text-sm uppercase tracking-wider text-destructive">
        Unable to load usage information
      </div>
    );
  }

  return (
    <div className="grid h-full w-full gap-3">
      <UplinkHeader leftText="USAGE" rightText="ACCOUNT TELEMETRY" />
      <StatCard title="Total levels" value={totalGamesAndLevels.totalLevels} />
      <StatCard title="Total games" value={totalGamesAndLevels.totalGames} />
      <StatCard title="Levels this month" value={usageData.currentLevels} />
    </div>
  );
}
