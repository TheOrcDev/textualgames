"use client";

import { StatCard } from "@/components/thegridcn/stat-card";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";

interface UsageDashboardProps {
  totalGamesAndLevels: {
    totalGames: number;
    totalLevels: number;
  };
}

export function UsageDashboard({
  totalGamesAndLevels,
}: UsageDashboardProps) {
  return (
    <div className="grid h-full w-full gap-3">
      <UplinkHeader leftText="USAGE" rightText="ACCOUNT TELEMETRY" />
      <StatCard title="Total levels" value={totalGamesAndLevels.totalLevels} />
      <StatCard title="Total games" value={totalGamesAndLevels.totalGames} />
    </div>
  );
}
