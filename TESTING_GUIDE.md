# 🧪 Complete API Testing Guide

## Q      body: JSON.stringify({
        username: `test${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        full_name: 'Test User',
        phone_number: '1234567890',
        location: 'Lagos',
        password: 'password123',
        password_confirm: 'password123'
      })art - 3 Ways to Test Your API

### 🎯 **Method 1: Test Page (Easiest)**

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Navigate to**: `http://localhost:3000/test-api`

3. **Fill out the test form** and click Register

4. **Check browser console** for API responses

### 🔧 **Method 2: Browser Console Test**

1. **Open any page** on your site (e.g., `http://localhost:3000`)

2. **Open DevTools** (F12) → Console tab

3. **Paste and run this code**:

```javascript
// Test Registration API
async function testRegistration() {
  try {
    console.log('🧪 Testing Registration API...');
    
    const response = await fetch('https://solacely-backend-4g.onrender.com/api/v1/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: `test${Date.now()}@example.com`, // Unique email
        password: 'password123',
        confirmPassword: 'password123'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ SUCCESS!', data);
    } else {
      console.log('❌ FAILED!', data);
      console.log('Status:', response.status);
    }
    
    return data;
  } catch (error) {
    console.error('🚨 ERROR:', error);
  }
}

// Run the test
testRegistration();
```

### 🏗️ **Method 3: Update Your Existing Signup Form**

I noticed your signup form in `/src/UI/Onboarding/components/SignupForm.jsx`. Here's how to connect it:

1. **Update the imports** at the top of the file:
```jsx
// Add this import
import { useRegister } from "@/hooks";
```

2. **Add state management**:
```jsx
// Add these to your component
const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  mobile: '',
  location: '',
  password: '',
  confirmPassword: ''
});
const [errors, setErrors] = useState({});
const registerMutation = useRegister();
```

3. **Update the form submission**:
```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const nameParts = formData.fullName.split(' ');
    const registrationData = {
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || nameParts[0],
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword
    };

    await registerMutation.mutateAsync(registrationData);
    setCurrentStage('confirm'); // Move to next stage
    
  } catch (error) {
    console.error('Registration failed:', error);
    setErrors({ general: error.message });
  }
};
```

## 📊 **What to Expect**

### ✅ **Success Response**:
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

### ❌ **Error Response**:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["Email already exists"],
    "password": ["Password too short"]
  }
}
```

## 🔍 **Debugging Steps**

### 1. **Check Network Tab**
- Open DevTools → Network tab
- Submit form and watch for API calls
- Check request/response details

### 2. **Check Console**
- Look for any JavaScript errors
- API requests/responses are logged automatically

### 3. **Verify Environment**
Check your `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://solacely-backend-4g.onrender.com/api/v1
```

### 4. **Test API Directly**
Use tools like:
- **Postman**: Create a POST request to your registration endpoint
- **cURL**: Command line testing
- **Browser DevTools**: Network tab inspection

## 🚨 **Common Issues & Solutions**

### Issue: "CORS Error"
**Solution**: Your backend needs to allow requests from your frontend domain

### Issue: "Network Error"
**Solution**: Check if your backend is running and accessible

### Issue: "404 Not Found"
**Solution**: Verify the endpoint URL is correct

### Issue: "422 Validation Error"
**Solution**: Check required fields and data format

## 📝 **Testing Checklist**

- [ ] Dev server is running (`npm run dev`)
- [ ] Environment variables are set correctly
- [ ] Backend API is accessible
- [ ] Test page loads at `/test-api`
- [ ] Form submission works
- [ ] Success/error responses are handled
- [ ] Console shows API requests/responses
- [ ] Network tab shows API calls

## 🎯 **Next Steps After Testing**

1. **If successful**: Start integrating with your existing components
2. **If errors**: Check the debugging steps above
3. **Update endpoints**: Add more API endpoints as needed
4. **Add authentication**: Implement login/logout functionality

## 📞 **Need Help?**

If you encounter issues:
1. Check the browser console for errors
2. Verify the API endpoint is correct
3. Test the API directly with Postman/cURL
4. Check network connectivity to your backend

Your API integration is ready to test! 🚀
