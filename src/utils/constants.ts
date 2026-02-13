import { Chat } from "./types";


export const PRESET_QUESTIONS = [
  "What are the latest market trends?",
  "How can I improve my research?",
  "What are the key insights?",
  "Tell me about competitive analysis"
];

export const MOCK_USER = {
  Username: "Demo User",
  ProfileUrl: "", // Leave empty to show initials
};

export const MOCK_CHATS: Chat[] = [
  { 
    id: 'chat-1', 
    title: 'Top 10 HCPs by prescription volume in Q4', 
    timestamp: '2 hours ago' 
  },
  { 
    id: 'chat-2', 
    title: 'Monthly sales trends by territory', 
    timestamp: '5 hours ago' 
  },
  { 
    id: 'chat-3', 
    title: 'Products with highest revenue growth', 
    timestamp: 'Yesterday' 
  },
  { 
    id: 'chat-4', 
    title: 'HCP specialty distribution analysis', 
    timestamp: '2 days ago' 
  },
  { 
    id: 'chat-5', 
    title: 'Year-over-year sales comparison by region', 
    timestamp: '3 days ago' 
  },
];