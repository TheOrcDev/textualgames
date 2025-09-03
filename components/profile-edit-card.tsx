"use client";

import { useState } from "react";

import Image from "next/image";

import { User } from "@/db/schema";
import { userSchema } from "@/server/schemas";
import { updateProfile } from "@/server/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, User as UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Input } from "@/components/ui/8bit/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "./ui/8bit/toast";

interface ProfileEditCardProps {
  user: User;
}

export const ProfileEditCard = ({ user }: ProfileEditCardProps) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.image || null
  );

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

      const { errors, values: updateProfileValues } =
        await updateProfile(values);

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
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your username and profile image
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      className="size-16 rounded-full object-cover border-2 border-foreground"
                      width={64}
                      height={64}
                    />
                  ) : (
                    <div className="size-16 rounded-full bg-muted flex items-center justify-center border-2 border-foreground">
                      <UserIcon className="size-8 text-muted-foreground" />
                    </div>
                  )}
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
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-center gap-2"
                    asChild
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
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
