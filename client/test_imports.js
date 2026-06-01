// Test file to verify imports work correctly
import { notifyApi, contactApi } from './src/utils/api.js';

console.log('API functions imported successfully:');
console.log('notifyApi:', typeof notifyApi);
console.log('contactApi:', typeof contactApi);

// Test the API base URL
console.log('API Base URL will be:', import.meta.env.VITE_API_URL || 'http://localhost:5000/api');