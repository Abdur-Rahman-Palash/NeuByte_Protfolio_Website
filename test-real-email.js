// Test with real email address
const testRealEmail = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'MD Abdur Rahman',
        email: 'abdurrahmanpalashbd@gmail.com',
        message: 'This is a test message from NeuByte website - checking if email arrives in Gmail'
      }),
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response result:', result);
    
    if (response.ok && result.success) {
      console.log('✅ Email sent to abdurrahmanpalashbd@gmail.com!');
      console.log('📧 Check your Gmail inbox (including spam folder)');
    } else {
      console.log('❌ Email failed:', result);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
};

testRealEmail();
