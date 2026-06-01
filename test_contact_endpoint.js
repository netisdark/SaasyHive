// Test script for contact endpoint
// Run this after starting the backend server

const testContactEndpoint = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        namee: 'Test User',
        text: 'This is a test message'
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Contact endpoint test PASSED');
      console.log('Response:', result);
    } else {
      console.log('❌ Contact endpoint test FAILED');
      console.log('Status:', response.status);
      console.log('Response:', result);
    }
  } catch (error) {
    console.error('💥 Contact endpoint test ERROR:', error.message);
  }
};

// Run the test after a short delay to ensure server is ready
setTimeout(testContactEndpoint, 2000);