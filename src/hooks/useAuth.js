import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../lib/api/services/authService';

// Query keys for consistent caching
export const AUTH_QUERY_KEYS = {
  profile: ['auth', 'profile'],
  user: (id) => ['auth', 'user', id],
};

// Hook for user profile
export const useProfile = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.profile,
    queryFn: () => authService.getProfile(),
    enabled: authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Hook for login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Minimal operations in onSuccess to avoid delays
      // Just invalidate queries without waiting for refetch
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.profile });
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });
};

// Hook for registration mutation
export const useRegister = () => {
  return useMutation({
    mutationFn: (userData) => authService.register(userData),
    onError: (error) => {
      console.error('Registration failed:', error.message);
    },
  });
};

// Hook for logout mutation
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      // Redirect to login page
      window.location.href = '/sign-in';
    },
  });
};

// Hook for email verification
export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (verificationData) => authService.verifyAccount(verificationData),
    onError: (error) => {
      console.error('Email verification failed:', error.message);
    },
  });
};

// Hook for resending verification code
export const useResendVerification = () => {
  return useMutation({
    mutationFn: (data) => authService.resendVerificationCode(data),
    onError: (error) => {
      console.error('Resend verification failed:', error.message);
    },
  });
};

// Hook for forgot password
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email) => authService.forgotPassword(email),
    onError: (error) => {
      console.error('Forgot password failed:', error.message);
    },
  });
};

// Hook for reset password
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (resetData) => authService.resetPassword(resetData),
    onError: (error) => {
      console.error('Password reset failed:', error.message);
    },
  });
};

// Hook for profile update
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profileData) => authService.updateProfile(profileData),
    onSuccess: (data) => {
      // Update the profile cache
      queryClient.setQueryData(AUTH_QUERY_KEYS.profile, data);
    },
    onError: (error) => {
      console.error('Profile update failed:', error.message);
    },
  });
};

// Hook for profile image upload
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file) => authService.uploadProfileImage(file),
    onSuccess: () => {
      // Refetch profile to get updated image
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.profile });
    },
    onError: (error) => {
      console.error('Profile image upload failed:', error.message);
    },
  });
};
