export interface PersonalInfo {
  id: string;
  text: string;
  category: 'your_category';
  metadata?: Record<string, any>;
}

export const personalInfoData: PersonalInfo[] = [
  {
    id: 'introduction-1',
    text: 'I am an AI assistant representing Your Name professional portfolio. My goal is to provide accurate information about Your professional experience, skills, and achievements.',
    category: 'your_category',
  },
];
