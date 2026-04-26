"use client";

import { useRef, useState } from "react";

import { User } from "@/db/schema";
import { userSchema } from "@/server/schemas";
import { updateProfile } from "@/server/users";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PutBlobResult } from "@vercel/blob";
import { Loader2, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { GridScanOverlay } from "@/components/thegridcn/grid-scan-overlay";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "./ui/toast";

interface ProfileEditCardProps {
  user: User;
}

export const ProfileEditCard = ({ user }: ProfileEditCardProps) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.image || null,
  );
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      image: user.image || "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        form.setValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setImagePreview(url);
    form.setValue("image", url);
  };

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      setLoading(true);

      let imageUrl = values.image;
      const file = inputFileRef.current?.files?.[0];

      if (file) {
        const fileName = `${user.id}-${Date.now()}.jpg`;

        const response = await fetch(
          `/api/avatar/upload?filename=${fileName}`,
          {
            method: "POST",
            body: file,
          },
        );

        const newBlob = (await response.json()) as PutBlobResult;

        setBlob(newBlob);
        imageUrl = newBlob.url;
      }

      const { errors, values: updateProfileValues } = await updateProfile({
        ...values,
        image: imageUrl,
      });

      if (errors) {
        toast(errors.message.join(", "));
        return;
      }

      toast(updateProfileValues?.text || "Profile updated successfully!");
    } catch (error) {
      console.error("Form submission error", error);
      toast("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="relative w-full overflow-hidden border-primary/25 bg-card/85 backdrop-blur">
      <GridScanOverlay gridSize={72} scanSpeed={15} />
      <div className="relative">
        <UplinkHeader leftText="IDENTITY" rightText="PROFILE EDIT" />
      </div>
      <CardHeader className="relative">
        <CardTitle className="font-mono uppercase tracking-wider">
          Edit Profile
        </CardTitle>
        <CardDescription>
          Update your username and profile image
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="size-18 border border-primary/40 shadow-[0_0_18px_color-mix(in_oklch,var(--glow)_20%,transparent)]">
                    <AvatarImage
                      src={imagePreview || ""}
                      alt={user.name?.[0] || "User"}
                    />
                    <AvatarFallback>{user.name?.[0] || "User"}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleImageUrlChange(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* File Upload Alternative */}
              <div className="flex flex-col gap-4">
                <label className="text-sm font-medium">
                  Or upload from device
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={inputFileRef}
                    className="sr-only"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-center gap-2"
                    onClick={() => inputFileRef.current?.click()}
                  >
                    <Upload className="size-4" />
                    Choose Image
                  </Button>
                </div>
              </div>
            </div>

            {/* Username Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field (read-only for display) */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      disabled
                      className="opacity-60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit" className="w-full">
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
