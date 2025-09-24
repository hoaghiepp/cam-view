"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock } from "lucide-react";

const loginSchema = z.object({
  emailOrUsername: z.string().min(3, "Please enter your email or username"),
  passwordOrCustomerId: z.string().min(3, "Please enter your password or ID"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: "",
      passwordOrCustomerId: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setError(null);
    try {
      // Map to your API contract: { email, password }
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.emailOrUsername,
          password: values.passwordOrCustomerId,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error ?? "Login failed");
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Network error");
    }
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="sr-only">Sign in</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username / Email */}
          <div className="space-y-1">
            <Label htmlFor="emailOrUsername">Username or Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="emailOrUsername"
                placeholder="Username or Email"
                className="pl-9"
                autoComplete="username"
                {...register("emailOrUsername")}
              />
            </div>
            {errors.emailOrUsername && (
              <p className="text-sm text-red-600">{errors.emailOrUsername.message}</p>
            )}
          </div>

          {/* Password / Customer ID */}
          <div className="space-y-1">
            <Label htmlFor="passwordOrCustomerId">Password or Customer ID</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="passwordOrCustomerId"
                type="password"
                placeholder="Password or Customer ID"
                className="pl-9"
                autoComplete="current-password"
                {...register("passwordOrCustomerId")}
              />
            </div>
            {errors.passwordOrCustomerId && (
              <p className="text-sm text-red-600">{errors.passwordOrCustomerId.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Signing in..." : "SIGN IN"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
