import { makeHfRequest, HF_AUTH_ENDPOINT, HF_SCHEDULE_ENDPOINT } from './utils.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testAuth() {
  console.log('Testing Auth API...');
  try {
    const response = await makeHfRequest(HF_AUTH_ENDPOINT);
    console.log('Auth Response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Auth Error:', error);
    return null;
  }
}

async function testSchedulePost(message: string) {
  console.log(`Testing Schedule Post API with message: "${message}"...`);
  try {
    const postData = {
      text: message
    };
    const response = await makeHfRequest(HF_SCHEDULE_ENDPOINT, JSON.stringify(postData));
    console.log('Schedule Post Response:', JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error('Schedule Post Error:', error);
    return null;
  }
}

async function main() {
  // First test auth
  const authResponse = await testAuth();
  
  if (authResponse && (authResponse.statusCode === 200 || authResponse.statusCode === 409)) {
    console.log('Auth successful or already authenticated');
    
    // Then test scheduling a post
    const testMessage = "This is a test post from the direct-test script!";
    await testSchedulePost(testMessage);
  } else {
    console.log('Auth failed, not testing post scheduling');
  }
}

main(); 