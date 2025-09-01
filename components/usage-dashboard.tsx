"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/8bit/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Progress } from "@/components/ui/8bit/progress";

import { Button } from "./ui/8bit/button";

interface UsageData {
  currentTokens: number;
  maxTokens: number;
  remainingTokens: number;
  currentLevels: number;
  maxLevels: number;
  remainingLevels: number;
  canProceed: boolean;
  message?: string;
}

export function UsageDashboard({ userId }: { userId: string }) {
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await fetch(`/api/usage?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUsageData(data);
        }
      } catch (error) {
        console.error("Failed to fetch usage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, [userId]);

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Loading your usage information...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!usageData) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Usage</CardTitle>
          <CardDescription>Unable to load usage information</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const levelUsagePercentage =
    (usageData.currentLevels / usageData.maxLevels) * 100;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Usage</CardTitle>
        <CardDescription>Your monthly usage and limits</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Levels completed:</span>
            <span className="font-mono">{usageData.currentLevels}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Level limit:</span>
            <span className="font-mono">{usageData.maxLevels}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Levels remaining:</span>
            <span className="font-mono">{usageData.remainingLevels}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Levels usage:</span>
            <span className="font-mono">
              {levelUsagePercentage.toFixed(1)}%
            </span>
          </div>
          <Progress
            value={levelUsagePercentage}
            className={`h-2 ${usageData.remainingLevels <= 0 ? "bg-red-200" : usageData.remainingLevels <= 10 ? "bg-orange-200" : "bg-green-200"}`}
          />
        </div>

        {usageData.message && (
          <div className="p-3 bg-orange-100 border border-orange-300 rounded-md">
            <p className="text-sm text-orange-800">{usageData.message}</p>
          </div>
        )}

        {usageData.remainingLevels > 0 && (
          <div className="flex flex-col gap-5">
            <Alert>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You&apos;re approaching your usage limit. Consider upgrading to
                continue using the service.
              </AlertDescription>
            </Alert>

            <Link href="/play/pricing">
              <Button>Upgrade</Button>
            </Link>
          </div>
        )}

        {usageData.remainingLevels <= 0 && (
          <div className="flex flex-col gap-5">
            <Alert>
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You&apos;ve reached your monthly usage limit. Upgrade to
                continue using the service.
              </AlertDescription>
            </Alert>

            <Link href="/play/pricing">
              <Button>Upgrade</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
