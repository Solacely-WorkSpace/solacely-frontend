// API Test Script - Run this in browser console
// Copy and paste this into your browser's developer console

// Test Registration
async function testRegistration() {
  try {
    console.log('🧪 Testing Registration API...');
    console.log('📡 Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
    
    const response = await fetch('https://solacely-backend-4g.onrender.com/api/v1/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: `test${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        full_name: 'Test User',
        phone_number: '1234567890',
        location: 'Lagos',
        password: 'password123',
        password_confirm: 'password123'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration Successful!');
      console.log('📄 Response:', data);
      return data;
    } else {
      console.log('❌ Registration Failed!');
      console.log('📄 Error Response:', data);
      console.log('🔢 Status Code:', response.status);
      return null;
    }
  } catch (error) {
    console.error('🚨 Network Error:', error.message);
    return null;
  }
}

// Test Login (run after successful registration)
async function testLogin(email, password) {
  try {
    console.log('🧪 Testing Login API...');
    
    const response = await fetch('https://solacely-backend-4g.onrender.com/api/v1/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login Successful!');
      console.log('📄 Response:', data);
      console.log('🔑 Token:', data.token || data.data?.token);
      return data;
    } else {
      console.log('❌ Login Failed!');
      console.log('📄 Error Response:', data);
      console.log('🔢 Status Code:', response.status);
      return null;
    }
  } catch (error) {
    console.error('🚨 Network Error:', error.message);
    return null;
  }
}

// Run tests
console.log('🚀 Starting API Tests...');
console.log('Copy and run: testRegistration()');
console.log('Then copy and run: testLogin("your-email", "password123")');
