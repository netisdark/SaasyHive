// API utility functions using environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const notifyApi = async (email) => {
  const response = await fetch(`${API_BASE_URL}/notify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });
  
  if (!response.ok) {
    throw new Error('Failed to subscribe');
  }
  
  return response.json();
};

export const contactApi = async (namee, email, text) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, namee, text })
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  return response.json();
};