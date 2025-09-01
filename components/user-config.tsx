"use client";

import { User } from "@/db/schema";
import { saveConfiguration } from "@/server/configurations";

import { Theme } from "@/lib/themes";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";

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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription>Select your preferred theme</CardDescription>
      </CardHeader>
      <CardContent>
        <SelectThemeDropdown user={user} onThemeChange={handleThemeChange} />
      </CardContent>
    </Card>
  );
};
