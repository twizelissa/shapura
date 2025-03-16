
import { Institution, User, Program, Message } from '@/types';

// Mock Programs
export const mockPrograms: Program[] = [
  {
    id: "1",
    name: "Computer Science",
    level: "bachelors",
    duration: "4 years",
    description: "A comprehensive program covering software development, algorithms, data structures, and computer systems.",
    careers: ["Software Developer", "Systems Analyst", "Database Administrator"],
    requirements: ["Mathematics", "Physics", "Computer Studies"],
    tuitionFees: "1,200,000 RWF per year"
  },
  {
    id: "2",
    name: "Business Administration",
    level: "bachelors",
    duration: "3 years",
    description: "Study of business operations including accounting, finance, marketing, and management.",
    careers: ["Business Manager", "Marketing Specialist", "Entrepreneur"],
    requirements: ["Economics", "Mathematics", "English"],
    tuitionFees: "1,000,000 RWF per year"
  },
  {
    id: "3",
    name: "Medicine",
    level: "bachelors",
    duration: "6 years",
    description: "Comprehensive medical education preparing students for careers as physicians.",
    careers: ["Doctor", "Medical Researcher", "Public Health Specialist"],
    requirements: ["Biology", "Chemistry", "Physics", "Mathematics"],
    tuitionFees: "1,500,000 RWF per year"
  },
  {
    id: "4",
    name: "Agricultural Sciences",
    level: "bachelors",
    duration: "4 years",
    description: "Study of agriculture, farming systems, crop production, and sustainable practices.",
    careers: ["Agricultural Scientist", "Farm Manager", "Agricultural Consultant"],
    requirements: ["Biology", "Chemistry", "Mathematics"],
    tuitionFees: "900,000 RWF per year"
  },
  {
    id: "5",
    name: "Electrical Engineering",
    level: "bachelors",
    duration: "4 years",
    description: "Study of electrical systems, electronics, power generation, and telecommunications.",
    careers: ["Electrical Engineer", "Electronics Engineer", "Power Systems Engineer"],
    requirements: ["Physics", "Mathematics", "Chemistry"],
    tuitionFees: "1,300,000 RWF per year"
  },
];

// Mock Institutions
export const mockInstitutions: Institution[] = [
  {
    id: "1",
    name: "University of Rwanda",
    type: "university",
    location: "Kigali, Rwanda",
    website: "https://ur.ac.rw",
    description: "The University of Rwanda is the largest and most comprehensive university in Rwanda, offering a wide range of programs across multiple disciplines.",
    logoUrl: "/placeholder.svg",
    coverImageUrl: "/placeholder.svg",
    programs: [mockPrograms[0], mockPrograms[1], mockPrograms[2]],
    accreditation: "National Council for Higher Education",
    foundedYear: 2013,
    contact: {
      email: "info@ur.ac.rw",
      phone: "+250 788 123 456",
      address: "KK 737 St, Kigali"
    },
    facilities: ["Library", "Computer Labs", "Sports Facilities", "Student Center"]
  },
  {
    id: "2",
    name: "Rwanda Polytechnic",
    type: "vocational",
    location: "Kigali, Rwanda",
    website: "https://rp.ac.rw",
    description: "Rwanda Polytechnic is a public institution focusing on technical and vocational education and training.",
    logoUrl: "/placeholder.svg",
    coverImageUrl: "/placeholder.svg",
    programs: [mockPrograms[3], mockPrograms[4]],
    accreditation: "National Council for Higher Education",
    foundedYear: 2017,
    contact: {
      email: "info@rp.ac.rw",
      phone: "+250 788 456 789",
      address: "KG 15 Ave, Kigali"
    },
    facilities: ["Workshops", "Laboratories", "Library", "Sports Grounds"]
  },
  {
    id: "3",
    name: "African Leadership University",
    type: "university",
    location: "Kigali, Rwanda",
    website: "https://www.alueducation.com",
    description: "African Leadership University is an innovative institution developing the next generation of African leaders.",
    logoUrl: "/placeholder.svg",
    coverImageUrl: "/placeholder.svg",
    programs: [mockPrograms[0], mockPrograms[1]],
    accreditation: "National Council for Higher Education",
    foundedYear: 2015,
    contact: {
      email: "info@alueducation.com",
      phone: "+250 788 789 123",
      address: "Kigali Innovation City, Kigali"
    },
    facilities: ["Modern Classrooms", "Innovation Hub", "Co-working Spaces", "Library"]
  },
  {
    id: "4",
    name: "Kepler",
    type: "college",
    location: "Kigali, Rwanda",
    website: "https://www.kepler.org",
    description: "Kepler is an innovative higher education program that prepares students for the global workplace.",
    logoUrl: "/placeholder.svg",
    coverImageUrl: "/placeholder.svg",
    programs: [mockPrograms[1]],
    accreditation: "Southern New Hampshire University",
    foundedYear: 2013,
    contact: {
      email: "info@kepler.org",
      phone: "+250 788 321 654",
      address: "KK 15 Rd, Kigali"
    },
    facilities: ["Computer Labs", "Study Areas", "Student Lounge"]
  },
  {
    id: "5",
    name: "INES Ruhengeri",
    type: "university",
    location: "Musanze, Rwanda",
    website: "https://www.ines.ac.rw",
    description: "Institut d'Enseignement Supérieur de Ruhengeri is a private institution offering quality education in various fields.",
    logoUrl: "/placeholder.svg",
    coverImageUrl: "/placeholder.svg",
    programs: [mockPrograms[0], mockPrograms[4]],
    accreditation: "National Council for Higher Education",
    foundedYear: 2003,
    contact: {
      email: "info@ines.ac.rw",
      phone: "+250 788 654 321",
      address: "Musanze, Northern Province"
    },
    facilities: ["Library", "Computer Labs", "Cafeteria", "Sports Grounds"]
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@rwandapathways.com",
    name: "Admin User",
    role: "admin",
    avatarUrl: "/placeholder.svg",
    createdAt: "2023-01-01T00:00:00Z"
  },
  {
    id: "2",
    email: "student@example.com",
    name: "Jean Kwizera",
    role: "student",
    avatarUrl: "/placeholder.svg",
    bio: "Secondary school graduate interested in technology and business.",
    createdAt: "2023-01-02T00:00:00Z"
  },
  {
    id: "3",
    email: "counselor@ur.ac.rw",
    name: "Dr. Alice Mutoni",
    role: "counselor",
    avatarUrl: "/placeholder.svg",
    bio: "Career counselor with 10 years of experience guiding students.",
    createdAt: "2023-01-03T00:00:00Z"
  },
  {
    id: "4",
    email: "counselor@rp.ac.rw",
    name: "Emmanuel Mugisha",
    role: "counselor",
    avatarUrl: "/placeholder.svg",
    bio: "Specializing in vocational education guidance and career development.",
    createdAt: "2023-01-04T00:00:00Z"
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "2",
    receiverId: "3",
    content: "Hello Dr. Mutoni, I'm interested in learning more about the Computer Science program at the University of Rwanda.",
    timestamp: "2023-04-01T10:30:00Z",
    read: true
  },
  {
    id: "2",
    senderId: "3",
    receiverId: "2",
    content: "Hello Jean, I'd be happy to provide more information. What specific aspects of the program are you interested in?",
    timestamp: "2023-04-01T11:15:00Z",
    read: true
  },
  {
    id: "3",
    senderId: "2",
    receiverId: "3",
    content: "I'm particularly interested in the career prospects and internship opportunities available to students.",
    timestamp: "2023-04-01T11:45:00Z",
    read: false
  }
];

// Service functions to simulate API calls
export const getInstitutions = (): Promise<Institution[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockInstitutions);
    }, 500);
  });
};

export const getInstitutionById = (id: string): Promise<Institution | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const institution = mockInstitutions.find(inst => inst.id === id);
      resolve(institution);
    }, 300);
  });
};

export const searchInstitutions = (query: string): Promise<Institution[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockInstitutions.filter(inst => 
        inst.name.toLowerCase().includes(query.toLowerCase()) ||
        inst.description.toLowerCase().includes(query.toLowerCase()) ||
        inst.location.toLowerCase().includes(query.toLowerCase()) ||
        inst.type.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};

export const getCounselors = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const counselors = mockUsers.filter(user => user.role === 'counselor');
      resolve(counselors);
    }, 300);
  });
};

export const getUserById = (id: string): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(user => user.id === id);
      resolve(user);
    }, 300);
  });
};

export const getMessagesByUserId = (userId: string): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const messages = mockMessages.filter(
        msg => msg.senderId === userId || msg.receiverId === userId
      );
      resolve(messages);
    }, 300);
  });
};

// Admin functions
export const addInstitution = (institution: Omit<Institution, 'id'>): Promise<Institution> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newInstitution = {
        ...institution,
        id: String(mockInstitutions.length + 1)
      };
      mockInstitutions.push(newInstitution);
      resolve(newInstitution);
    }, 500);
  });
};

export const updateInstitution = (id: string, updates: Partial<Institution>): Promise<Institution | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockInstitutions.findIndex(inst => inst.id === id);
      if (index !== -1) {
        mockInstitutions[index] = { ...mockInstitutions[index], ...updates };
        resolve(mockInstitutions[index]);
      } else {
        resolve(undefined);
      }
    }, 500);
  });
};

export const deleteInstitution = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockInstitutions.findIndex(inst => inst.id === id);
      if (index !== -1) {
        mockInstitutions.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};

// Authentication mock functions
export const loginUser = (email: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(user => user.email === email);
      // In a real app, we would check the password
      if (user && password) {
        resolve(user);
      } else {
        resolve(null);
      }
    }, 700);
  });
};

export const registerUser = (email: string, password: string, name: string, role: 'student' | 'counselor'): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if user already exists
      const exists = mockUsers.some(user => user.email === email);
      if (exists) {
        resolve(null);
      } else {
        const newUser: User = {
          id: String(mockUsers.length + 1),
          email,
          name,
          role,
          createdAt: new Date().toISOString(),
        };
        mockUsers.push(newUser);
        resolve(newUser);
      }
    }, 700);
  });
};

export const sendMessage = (message: Omit<Message, 'id' | 'timestamp' | 'read'>): Promise<Message> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: Message = {
        ...message,
        id: String(mockMessages.length + 1),
        timestamp: new Date().toISOString(),
        read: false
      };
      mockMessages.push(newMessage);
      resolve(newMessage);
    }, 300);
  });
};
