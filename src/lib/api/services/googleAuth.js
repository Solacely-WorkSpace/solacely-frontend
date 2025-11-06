// Google OAuth configuration 
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const initializeGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    if (!GOOGLE_CLIENT_ID) {
      console.error('Google Client ID not configured');
      reject(new Error('Google Client ID not configured'));
      return;
    }
    
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: resolve,
      });
    } else {
      reject(new Error('Google SDK not loaded'));
    }
  });
};

export const handleGoogleSignup = (credentialResponse, onSuccess, onError) => {
  try {
    // Decode the JWT token to get user info
    const token = credentialResponse.credential;
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    const userData = {
      email: payload.email,
      full_name: payload.name,
      google_id: payload.sub,
      profile_picture: payload.picture,
      // Generate a random password for Google users
      password: generateRandomPassword(),
    };
    
    onSuccess(userData);
  } catch (error) {
    console.error('Google signup error:', error);
    onError(error);
  }
};

const generateRandomPassword = () => {
  return Math.random().toString(36).slice(-12) + 'A1!';
};