"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Unable to load usage information</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg h-full">
      <CardHeader>
        <CardTitle>Usage</CardTitle>
        <CardDescription>Your game statistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total levels:</span>
            <span className="font-mono">{totalGamesAndLevels.totalLevels}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total games:</span>
            <span className="font-mono">{totalGamesAndLevels.totalGames}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Levels completed this month:</span>
            <span className="font-mono">{usageData.currentLevels}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
