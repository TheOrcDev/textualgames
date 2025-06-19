"use client";

import { useState } from "react";

import { userSchema } from "@/server/schemas";
import { updateProfile } from "@/server/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UserFormProps {
  defaultValues?: z.infer<typeof userSchema>;
}

export default function UserForm({ defaultValues }: UserFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      setLoading(true);

      const { errors, values: updateProfileValues } =
        await updateProfile(values);

      if (errors) {
        toast.error(errors.message);
        return;
      }

      toast.success(updateProfileValues?.text);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          You can update your personal information here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loading} type="submit">
              {loading ? <Loader2 className="size-4 animate-spin" /> : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
