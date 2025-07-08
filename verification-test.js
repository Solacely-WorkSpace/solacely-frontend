// Test verification endpoint directly
// Run this in browser console to see what your backend expects

async function testVerificationEndpoint() {
  const testCases = [
    // Test case 1: Basic format
    {
      name: 'Basic email + code',
      data: {
        email: 'test@example.com',
        code: '123456'
      }
    },
    // Test case 2: Different field names
    {
      name: 'verification_code instead of code',
      data: {
        email: 'test@example.com',
        verification_code: '123456'
      }
    },
    // Test case 3: token instead of code
    {
      name: 'token instead of code',
      data: {
        email: 'test@example.com',
        token: '123456'
      }
    },
    // Test case 4: otp instead of code
    {
      name: 'otp instead of code',
      data: {
        email: 'test@example.com',
        otp: '123456'
      }
    }
  ];

  console.log('🧪 Testing verification endpoint formats...');

  for (const testCase of testCases) {
    try {
      console.log(`\n📤 Testing: ${testCase.name}`);
      console.log('Data:', testCase.data);
      
      const response = await fetch('https://solacely-backend-4g.onrender.com/api/v1/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      });

      const responseData = await response.json();
      
      console.log(`📊 Status: ${response.status}`);
      console.log('📄 Response:', responseData);
      
      if (response.status !== 400) {
        console.log(`✅ ${testCase.name} - Format might be correct!`);
      } else {
        console.log(`❌ ${testCase.name} - Format incorrect`);
      }
      
    } catch (error) {
      console.error(`🚨 ${testCase.name} - Network error:`, error);
    }
  }
}

// Run the test
testVerificationEndpoint();
