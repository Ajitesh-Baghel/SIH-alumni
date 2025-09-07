// Mock data for the alumni management system

// Alumni Data
export const mockAlumni = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    graduationYear: 2018,
    department: 'Computer Science',
    batch: '2014-2018',
    currentJob: 'Software Engineer',
    company: 'Tech Corp',
    location: 'New York, USA',
    profilePicture: null,
    bio: 'Passionate software engineer with 5+ years of experience.',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    isVerified: true,
    joinedDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    graduationYear: 2019,
    department: 'Electrical Engineering',
    batch: '2015-2019',
    currentJob: 'Hardware Engineer',
    company: 'Electronics Inc',
    location: 'California, USA',
    profilePicture: null,
    bio: 'Electronics enthusiast working on IoT solutions.',
    skills: ['Circuit Design', 'IoT', 'Arduino', 'C++'],
    linkedinUrl: 'https://linkedin.com/in/janesmith',
    isVerified: true,
    joinedDate: '2023-02-20'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    graduationYear: 2020,
    department: 'Business Administration',
    batch: '2016-2020',
    currentJob: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Austin, USA',
    profilePicture: null,
    bio: 'Product manager with a passion for user experience.',
    skills: ['Product Management', 'Agile', 'Analytics', 'Leadership'],
    linkedinUrl: 'https://linkedin.com/in/mikejohnson',
    isVerified: false,
    joinedDate: '2023-03-10'
  }
];

// Events Data
export const mockEvents = [
  {
    id: 1,
    title: 'Annual Alumni Reunion 2024',
    description: 'Join us for our biggest alumni gathering of the year!',
    type: 'reunion',
    date: '2024-06-15',
    time: '18:00',
    endDate: '2024-06-16',
    endTime: '22:00',
    location: 'University Campus, Main Hall',
    organizer: 'Alumni Association',
    maxAttendees: 500,
    currentAttendees: 234,
    isOnline: false,
    meetingLink: null,
    tags: ['reunion', 'networking', 'social'],
    status: 'upcoming',
    registrationDeadline: '2024-06-10',
    price: 0,
    images: [],
    createdBy: 'admin',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Tech Talk: AI in Modern Development',
    description: 'Learn about the latest AI tools and technologies.',
    type: 'workshop',
    date: '2024-04-20',
    time: '14:00',
    endDate: '2024-04-20',
    endTime: '16:00',
    location: 'Online',
    organizer: 'CS Department Alumni',
    maxAttendees: 100,
    currentAttendees: 67,
    isOnline: true,
    meetingLink: 'https://meet.google.com/xyz-abc-123',
    tags: ['technology', 'ai', 'workshop'],
    status: 'upcoming',
    registrationDeadline: '2024-04-18',
    price: 25,
    images: [],
    createdBy: 'john.doe@example.com',
    createdAt: '2024-02-10'
  },
  {
    id: 3,
    title: 'Career Fair 2024',
    description: 'Connect with top employers and explore new opportunities.',
    type: 'career',
    date: '2024-05-10',
    time: '10:00',
    endDate: '2024-05-10',
    endTime: '17:00',
    location: 'Convention Center',
    organizer: 'Career Services',
    maxAttendees: 1000,
    currentAttendees: 456,
    isOnline: false,
    meetingLink: null,
    tags: ['career', 'networking', 'jobs'],
    status: 'upcoming',
    registrationDeadline: '2024-05-05',
    price: 0,
    images: [],
    createdBy: 'admin',
    createdAt: '2024-01-20'
  }
];

// Jobs Data
export const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc',
    location: 'San Francisco, CA',
    type: 'full-time',
    remote: true,
    salary: '$120,000 - $150,000',
    description: 'We are looking for a senior frontend developer to join our team...',
    requirements: [
      '5+ years React experience',
      'TypeScript proficiency',
      'Experience with modern build tools',
      'Knowledge of testing frameworks'
    ],
    benefits: ['Health Insurance', '401k', 'Flexible Hours', 'Remote Work'],
    postedBy: 'jane.smith@example.com',
    postedDate: '2024-03-01',
    deadline: '2024-04-01',
    applicants: 23,
    status: 'active',
    category: 'engineering',
    experienceLevel: 'senior',
    tags: ['react', 'typescript', 'frontend']
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'New York, NY',
    type: 'full-time',
    remote: false,
    salary: '$100,000 - $130,000',
    description: 'Join our product team and help shape the future of our platform...',
    requirements: [
      '3+ years product management experience',
      'Agile methodology knowledge',
      'Data analysis skills',
      'Excellent communication skills'
    ],
    benefits: ['Health Insurance', 'Stock Options', 'Gym Membership'],
    postedBy: 'mike.johnson@example.com',
    postedDate: '2024-02-15',
    deadline: '2024-03-15',
    applicants: 15,
    status: 'active',
    category: 'product',
    experienceLevel: 'mid',
    tags: ['product-management', 'agile', 'analytics']
  },
  {
    id: 3,
    title: 'Data Science Intern',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    type: 'internship',
    remote: true,
    salary: '$20/hour',
    description: 'Summer internship opportunity for data science students...',
    requirements: [
      'Pursuing degree in Data Science/Statistics',
      'Python programming skills',
      'Basic machine learning knowledge',
      'SQL experience'
    ],
    benefits: ['Learning Opportunities', 'Mentorship', 'Flexible Schedule'],
    postedBy: 'admin',
    postedDate: '2024-02-20',
    deadline: '2024-05-01',
    applicants: 45,
    status: 'active',
    category: 'data-science',
    experienceLevel: 'entry',
    tags: ['python', 'machine-learning', 'internship']
  }
];

// Forum Data
export const mockForumTopics = [
  {
    id: 1,
    title: 'Welcome to the Alumni Forum!',
    content: 'This is a place for all alumni to connect, share experiences, and help each other.',
    category: 'general',
    author: 'admin',
    authorName: 'Administrator',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    replies: 12,
    views: 156,
    isPinned: true,
    isLocked: false,
    tags: ['welcome', 'introduction']
  },
  {
    id: 2,
    title: 'Best practices for remote work?',
    content: 'I just started working remotely and would love to hear your tips and tricks!',
    category: 'career',
    author: 'john.doe@example.com',
    authorName: 'John Doe',
    createdAt: '2024-02-15',
    updatedAt: '2024-02-20',
    replies: 8,
    views: 89,
    isPinned: false,
    isLocked: false,
    tags: ['remote-work', 'productivity', 'career']
  },
  {
    id: 3,
    title: 'Anyone working in AI/ML field?',
    content: 'Looking to connect with fellow alumni in artificial intelligence and machine learning.',
    category: 'technology',
    author: 'jane.smith@example.com',
    authorName: 'Jane Smith',
    createdAt: '2024-03-01',
    updatedAt: '2024-03-05',
    replies: 15,
    views: 234,
    isPinned: false,
    isLocked: false,
    tags: ['ai', 'machine-learning', 'networking']
  }
];

// Gallery Data
export const mockGalleryItems = [
  {
    id: 1,
    title: 'Graduation Ceremony 2023',
    description: 'Photos from the graduation ceremony',
    type: 'image',
    url: 'https://via.placeholder.com/400x300/4CAF50/white?text=Graduation+2023',
    thumbnailUrl: 'https://via.placeholder.com/200x150/4CAF50/white?text=Graduation',
    uploadedBy: 'admin',
    uploadedAt: '2023-06-15',
    event: 'Graduation Ceremony 2023',
    tags: ['graduation', '2023', 'ceremony'],
    likes: 45,
    downloads: 12
  },
  {
    id: 2,
    title: 'Alumni Reunion Dance',
    description: 'Fun moments from the reunion party',
    type: 'image',
    url: 'https://via.placeholder.com/400x300/2196F3/white?text=Reunion+Dance',
    thumbnailUrl: 'https://via.placeholder.com/200x150/2196F3/white?text=Dance',
    uploadedBy: 'jane.smith@example.com',
    uploadedAt: '2023-07-20',
    event: 'Alumni Reunion 2023',
    tags: ['reunion', 'dance', 'party'],
    likes: 67,
    downloads: 8
  },
  {
    id: 3,
    title: 'Tech Talk Session',
    description: 'Highlights from our tech discussion',
    type: 'video',
    url: 'https://via.placeholder.com/400x300/FF9800/white?text=Tech+Talk+Video',
    thumbnailUrl: 'https://via.placeholder.com/200x150/FF9800/white?text=Video',
    uploadedBy: 'john.doe@example.com',
    uploadedAt: '2023-08-10',
    event: 'Tech Talk 2023',
    tags: ['tech', 'presentation', 'learning'],
    likes: 34,
    downloads: 5
  }
];

// Notification Data
export const mockNotifications = [
  {
    id: 1,
    title: 'New Event: Annual Reunion',
    message: 'The Annual Alumni Reunion 2024 has been scheduled for June 15th.',
    type: 'event',
    isRead: false,
    createdAt: '2024-03-01T10:00:00Z',
    actionUrl: '/events/1',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Job Application Update',
    message: 'Your application for Senior Frontend Developer has been reviewed.',
    type: 'job',
    isRead: false,
    createdAt: '2024-02-28T15:30:00Z',
    actionUrl: '/jobs/1',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'New Forum Reply',
    message: 'Someone replied to your post about remote work practices.',
    type: 'forum',
    isRead: true,
    createdAt: '2024-02-25T09:15:00Z',
    actionUrl: '/forum/topics/2',
    priority: 'low'
  }
];

// Dashboard Stats
export const mockDashboardStats = {
  totalAlumni: 1250,
  totalEvents: 45,
  totalJobs: 23,
  totalForumPosts: 189,
  upcomingEvents: 3,
  activeJobs: 18,
  newAlumniThisMonth: 15,
  eventAttendanceRate: 78
};

// Department and batch data
export const departments = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Business Administration',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Psychology'
];

export const graduationYears = Array.from(
  { length: 20 },
  (_, i) => new Date().getFullYear() - i
);

export const jobCategories = [
  'engineering',
  'product',
  'design',
  'marketing',
  'sales',
  'data-science',
  'finance',
  'operations',
  'consulting',
  'other'
];

export const eventTypes = [
  'reunion',
  'workshop',
  'seminar',
  'networking',
  'career',
  'social',
  'academic',
  'sports',
  'cultural',
  'other'
];

export default {
  mockAlumni,
  mockEvents,
  mockJobs,
  mockForumTopics,
  mockGalleryItems,
  mockNotifications,
  mockDashboardStats,
  departments,
  graduationYears,
  jobCategories,
  eventTypes
};
