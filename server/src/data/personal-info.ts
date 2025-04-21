export interface PersonalInfo {
    id: string;
    text: string;
    category: 'education' | 'experience' | 'skills' | 'projects' | 'contact' | 'about';
    metadata?: Record<string, any>;
}
  
export const personalInfoData: PersonalInfo[] = [
    {
        id: 'about-1',
        text: 'I am a Frontend Developer with 4+ years of experience in web development.',
        category: 'about'
    },
    {
        id: 'education-1',
        text: 'StudyComputer Science at Ivan Franko National University of Lviv',
        category: 'education'
    },
    {
        id: 'experience-1',
        text: 'Senior Full Stack Developer at BoxExchanger Company (2020-Present). Working on React/Next.js, Node.js, and cloud technologies.',
        category: 'experience'
    },
    {
        id: 'skills-1',
        text: 'Expert in JavaScript, TypeScript, React, Node.js, Python, AWS, and Docker.',
        category: 'skills'
    },
    // {
    //     id: 'projects-1',
    //     text: 'Built an e-commerce platform using React and Node.js that serves 10k+ daily users.',
    //     category: 'projects'
    // },
    {
        id: 'contact-1',
        text: 'Email: dobrodii.vlad200@gmail.com | LinkedIn: https://www.linkedin.com/in/vladyslav-dobrodii-20384a233/ | GitHub: https://github.com/dladislav201',
        category: 'contact'
    }
];