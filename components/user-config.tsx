"use client";

import { User } from "@/db/schema";
import { saveConfiguration } from "@/server/configurations";

import { Theme } from "@/lib/themes";

import { GridScanOverlay } from "@/components/thegridcn/grid-scan-overlay";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SelectThemeDropdown } from "./select-theme-dropdown";

interface UserConfigProps {
  user: User;
}

export const UserConfig = ({ user }: UserConfigProps) => {
  const handleThemeChange = async (theme: Theme) => {
    await saveConfiguration({
      userId: user.id,
      theme: theme,
    });
  };

  return (
    <Card className="relative w-full overflow-hidden border-primary/25 bg-card/85">
      <GridScanOverlay gridSize={72} scanSpeed={18} />
      <div className="relative">
        <UplinkHeader leftText="GRID THEME" rightText="IDENTITY" />
      </div>
      <CardHeader className="relative">
        <CardTitle className="font-mono uppercase tracking-wider">
          Theme
        </CardTitle>
        <CardDescription>Select your preferred theme</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <SelectThemeDropdown user={user} onThemeChange={handleThemeChange} />
      </CardContent>
    </Card>
  );
};
