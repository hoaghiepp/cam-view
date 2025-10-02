"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { authApi, type LoginRequest, type ApiError } from "@/lib/api";
import { AuthStorage } from "@/lib/auth-storage";
import { toast } from "sonner";

// Types for form state
interface LoginFormData {
  username: string;
  password: string;
}

interface SignUpFormData {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
}


export default function LoginPage() {
  
  // State management
  const [loginData, setLoginData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState<SignUpFormData>({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authApi.login({
        username: loginData.username,
        password: loginData.password,
      });

      if (response.success) {
        // Store auth data using utility
        AuthStorage.storeAuthData(response.data);
        
        // Show success toast
        toast.success(`Welcome back, ${response.data.user.fullname}!`, {
          description: "Login successful",
        });
        
        // Log user info
        console.log("User info:", response.data.user);
        console.log("Token expires in:", response.data.expires_in, "seconds");
        console.log("Auth header:", AuthStorage.getAuthHeader());
        
        // Redirect to dashboard or handle success
        // router.push('/dashboard');
      } else {
        toast.error("Login failed", {
          description: response.message || "Invalid credentials",
        });
      }
    } catch (err) {
      const apiError = err as ApiError;
      toast.error("Login error", {
        description: apiError.message || "An error occurred during login",
      });
      // console.error("Login error:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign up form submission
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("Validation error", {
        description: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Note: You'll need to implement signup API endpoint
      console.log("Sign up data:", signUpData);
      toast.success("Registration complete!", {
        description: "Account created successfully! Please login.",
      });
      
      // Clear form after successful signup
      setSignUpData({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      const apiError = err as ApiError;
      toast.error("Registration error", {
        description: apiError.message || "An error occurred during sign up",
      });
      console.error("Sign up error:", apiError);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleLoginChange = (field: keyof LoginFormData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUpChange = (field: keyof SignUpFormData, value: string) => {
    setSignUpData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI System</h1>
          <p className="text-gray-600">Intelligent Video Analytics System</p>
        </div>

        {/* Login Card */}
        <Tabs defaultValue="Sign In">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Sign In">Sign In</TabsTrigger>
            <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="Sign In">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your username below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoginSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="signin-username">Username</Label>
                      <Input
                        id="signin-username"
                        type="text"
                        placeholder="Enter your username"
                        value={loginData.username}
                        onChange={(e) => handleLoginChange("username", e.target.value)}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="signin-password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <PasswordInput
                        id="signin-password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => handleLoginChange("password", e.target.value)}
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-6">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading || !loginData.username || !loginData.password}
                    >
                      {isLoading ? "Signing in..." : "Login"}
                    </Button>
                    <Button variant="outline" className="w-full" disabled={isLoading}>
                      Login with Google
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="Sign Up">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your information below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUpSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        value={signUpData.fullName}
                        onChange={(e) => handleSignUpChange("fullName", e.target.value)}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="signup-username">Username</Label>
                      <Input
                        id="signup-username"
                        type="text"
                        placeholder="Enter your username"
                        value={signUpData.username}
                        onChange={(e) => handleSignUpChange("username", e.target.value)}
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <PasswordInput 
                        id="signup-password" 
                        placeholder="Enter your password"
                        value={signUpData.password}
                        onChange={(e) => handleSignUpChange("password", e.target.value)}
                        disabled={isLoading}
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <PasswordInput 
                        id="confirm-password" 
                        placeholder="Confirm your password"
                        value={signUpData.confirmPassword}
                        onChange={(e) => handleSignUpChange("confirmPassword", e.target.value)}
                        disabled={isLoading}
                        required 
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading || !signUpData.fullName || !signUpData.username || !signUpData.password || !signUpData.confirmPassword}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
