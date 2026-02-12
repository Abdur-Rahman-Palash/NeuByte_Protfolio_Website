// Test the Express server contact API
const testContact = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message from Express server'
      }),
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response result:', result);
    
    if (response.ok && result.success) {
      console.log('✅ Express Contact API working!');
    } else {
      console.log('❌ Express Contact API failed:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
};

testContact();
