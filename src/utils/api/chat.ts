interface QueryResponse {
  answer?: string;
  // Handle if backend returns string directly
}

interface QueryParams {
  question: string;
  sessionId: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_SERVER_URL is not defined');
}

export const queryChat = async ({ question, sessionId }: QueryParams): Promise<string> => {
  try {
    const url = `${API_BASE_URL}/query?question=${encodeURIComponent(question)}&session_id=${sessionId}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle both {"answer": "..."} and direct string response
    if (typeof data === 'string') {
      return data;
    }
    
    if (data.answer) {
      return data.answer;
    }
    
    // If response has a different structure, log it
    console.log('Unexpected response format:', data);
    throw new Error('Unexpected response format from API');
    
  } catch (error) {
    console.error('Query API Error:', error);
    throw error;
  }
};

// Generate a session ID for the user (can be stored in localStorage)
export const getOrCreateSessionId = (): string => {
  if (typeof window === 'undefined') return '1234';
  
  let sessionId = localStorage.getItem('chatSessionId');
  if (!sessionId) {
    sessionId = Date.now().toString();
    localStorage.setItem('chatSessionId', sessionId);
  }
  return sessionId;
};
