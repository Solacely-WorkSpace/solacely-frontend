"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import AuthIllustration from "../Onboarding/components/AuthIllustration";

const emailLoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const mobileLoginSchema = z.object({
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^\d{10,15}$/, "Invalid mobile number format"),
  password: z.string().min(1, "Password is required"),
});

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});


type EmailLoginData = z.infer<typeof emailLoginSchema>;
type MobileLoginData = z.infer<typeof mobileLoginSchema>;
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const PartnerSignInPage: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<"email" | "mobile">("email");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [resetEmailSent, setResetEmailSent] = useState<boolean>(false);

  // Login forms
  const emailForm = useForm<EmailLoginData>({
    resolver: zodResolver(emailLoginSchema),
  });

  const mobileForm = useForm<MobileLoginData>({
    resolver: zodResolver(mobileLoginSchema),
  });

  // Forgot password form
  const forgotPasswordForm = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleSetLoginMethod = (method: "email" | "mobile") => {
    if (method !== loginMethod) {
      setLoginMethod(method);
      setApiError(null);
      emailForm.reset();
      mobileForm.reset();
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetEmailSent(false);
    setApiError(null);
    forgotPasswordForm.reset();
  };

  // Login submit handlers
  const onEmailSubmit: SubmitHandler<EmailLoginData> = async (data) => {
    setApiError(null);
    console.log("Email Form Data Submitted:", data);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      throw new Error("Invalid credentials. Please try again.");
    } catch (error: any) {
      setApiError(error.message);
    }
  };

  const onMobileSubmit: SubmitHandler<MobileLoginData> = async (data) => {
    setApiError(null);
    console.log("Mobile Form Data Submitted:", data);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      throw new Error("Invalid credentials. Please try again.");
    } catch (error: any) {
      setApiError(error.message);
    }
  };

  const onForgotPasswordSubmit: SubmitHandler<ForgotPasswordData> = async (data) => {
    setApiError(null);
    console.log("Forgot Password Data Submitted:", data);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      
      setResetEmailSent(true);
    } catch (error: any) {
      setApiError("Unable to send reset email. Please try again.");
    }
  };

  if (showForgotPassword) {
    return (
      <div className="flex w-full min-h-screen bg-white">
        <div className="hidden md:block w-1/3 relative">
          <AuthIllustration />
        </div>
        <div className="w-full md:w-2/3 flex flex-col p-6 sm:p-8 md:p-12">
          <div className="flex justify-between items-center">
            <button
              onClick={handleBackToLogin}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to sign in
            </button>
            <p className="text-sm text-gray-600">
              Not a partner yet?{" "}
              <Link href="/partner" className="font-semibold text-green-600 hover:text-green-700">
                Sign up
              </Link>
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm">
              {!resetEmailSent ? (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot password?</h1>
                    <p className="text-gray-600">Enter your email and we'll send you a reset link.</p>
                  </div>
                  <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
                    <div>
                      <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                        EMAIL
                      </label>
                      <input
                        id="reset-email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email address"
                        {...forgotPasswordForm.register("email")}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          forgotPasswordForm.formState.errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-purple-500'
                        }`}
                      />
                      {forgotPasswordForm.formState.errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {forgotPasswordForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                    
                    {apiError && (
                      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm">
                        {apiError}
                      </div>
                    )}
                    
                    <div>
                      <button
                        type="submit"
                        disabled={forgotPasswordForm.formState.isSubmitting}
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed"
                      >
                        {forgotPasswordForm.formState.isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending reset link...
                          </>
                        ) : (
                          "Send reset link"
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Check your email</h1>
                  <p className="text-gray-600 mb-6">
                    We've sent a password reset link to{" "}
                    <span className="font-medium text-gray-900">
                      {forgotPasswordForm.getValues("email")}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mb-8">
                    Didn't receive the email? Check your spam folder or{" "}
                    <button
                      onClick={() => setResetEmailSent(false)}
                      className="font-medium text-purple-600 hover:text-purple-700"
                    >
                      try again
                    </button>
                  </p>
                  <button
                    onClick={handleBackToLogin}
                    className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Back to sign in
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render main login view
  return (
    <div className="flex w-full min-h-screen bg-white">
      <div className="hidden md:block w-1/3 relative">
        <AuthIllustration />
      </div>
      <div className="w-full md:w-2/3 flex flex-col p-6 sm:p-8 md:p-12">
        <div className="flex justify-end items-center">
          <p className="text-sm text-gray-600">
            Not a partner yet?{" "}
            <Link href="/partner" className="font-semibold text-green-600 hover:text-green-700">
              Sign up
            </Link>
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
              <p className="text-gray-600">We missed you 😉 Jump right back in.</p>
            </div>
            <div className="flex justify-center mb-6 bg-gray-100 p-1 rounded-full">
              <button
                type="button"
                onClick={() => handleSetLoginMethod("email")}
                className={`w-1/2 py-2 text-sm font-medium rounded-full transition-colors ${
                  loginMethod === "email" ? "bg-teal-500 text-white shadow" : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => handleSetLoginMethod("mobile")}
                className={`w-1/2 py-2 text-sm font-medium rounded-full transition-colors ${
                  loginMethod === "mobile" ? "bg-teal-500 text-white shadow" : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                Mobile
              </button>
            </div>
            
            {loginMethod === "email" ? (
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">EMAIL</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    {...emailForm.register("email")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      emailForm.formState.errors.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-purple-500'
                    }`}
                  />
                  {emailForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">{emailForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">PASSWORD</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter password"
                      {...emailForm.register("password")}
                      className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 ${
                        emailForm.formState.errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {emailForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-500">{emailForm.formState.errors.password.message}</p>
                  )}
                </div>
                <div className="text-right -mt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm font-medium text-green-600 hover:text-green-700"
                  >
                    Forgot password?
                  </button>
                </div>
                {apiError && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm">
                    {apiError}
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    disabled={emailForm.formState.isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed"
                  >
                    {emailForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={mobileForm.handleSubmit(onMobileSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">MOBILE NUMBER</label>
                  <input
                    id="mobile"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Mobile number"
                    {...mobileForm.register("mobile")}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      mobileForm.formState.errors.mobile
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-purple-500'
                    }`}
                  />
                  {mobileForm.formState.errors.mobile && (
                    <p className="mt-1 text-sm text-red-500">{mobileForm.formState.errors.mobile.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">PASSWORD</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter password"
                      {...mobileForm.register("password")}
                      className={`w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 ${
                        mobileForm.formState.errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-purple-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {mobileForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-500">{mobileForm.formState.errors.password.message}</p>
                  )}
                </div>
                <div className="text-right -mt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm font-medium text-green-600 hover:text-green-700"
                  >
                    Forgot password?
                  </button>
                </div>
                {apiError && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md text-sm">
                    {apiError}
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    disabled={mobileForm.formState.isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400 disabled:cursor-not-allowed"
                  >
                    {mobileForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSignInPage;