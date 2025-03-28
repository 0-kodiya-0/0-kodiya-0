/**
 * Education timeline entry prop type
 */
export interface EducationEntry {
    year: string;
    degree: string;
    institution: string;
    description: string;
}

/**
 * Competition entry prop type
 */
export interface CompetitionEntry {
    year: string;
    name: string;
    organizer: string;
}

/**
 * Developer information prop type
 */
export interface DeveloperInfo {
    name: string;
    role: string;
    education: string;
    location: string;
    interests: string[];
}

/**
 * Skills object prop type
 */
export interface SkillsData {
    frameworks: string[];
    databases: string[];
    design: string[];
    technical: string[];
    management: string[];
    [key: string]: string[]; // Index signature for any additional skill categories
}

export const educationTimeline: EducationEntry[] = [
  {
    year: '2024 - Present',
    degree: 'BSc Computer Science Degree (4 Year)',
    institution: 'Informatics Institute of Technology | IIT Campus',
    description: '1st Year Completed, 2nd Year Ongoing'
  },
  {
    year: '2023',
    degree: 'Foundation Certificate',
    institution: 'Informatics Institute of Technology | IIT Campus',
    description: 'Completed foundational studies in computing'
  },
  {
    year: '2023',
    degree: 'Java Application Development Using JavaSE',
    institution: 'University Of Colombo School Of Computing (UCSC)',
    description: '8 Week Training Course'
  }
];

export const skills: SkillsData = {
  frameworks: ['Express', 'Next.js', 'Angular.js', 'Spring Boot'],
  databases: ['MongoDB', 'MySQL'],
  design: ['UI/UX Design', 'Figma'],
  technical: ['Google Docs, Sheets, Forum', 'Microsoft Word, PowerPoint, Excel'],
  management: ['Git', 'NPM', 'Stack', 'Project Management and Documentation']
};

export const competitions: CompetitionEntry[] = [
  {
    year: '2023',
    name: 'Cutting Edge',
    organizer: 'Informatics Institute of Technology | IIT Campus'
  },
  {
    year: '2022',
    name: 'IESL JIY',
    organizer: 'Institution of Engineers Sri Lanka'
  }
];

export const developerInfo: DeveloperInfo = {
  name: 'Sanithu Nimadith Jayakody',
  role: 'Computer Science Student',
  education: 'BSc Computer Science',
  location: 'Sri Lanka',
  interests: ['Web Development', 'UI/UX Design', 'Problem Solving']
};