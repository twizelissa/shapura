
// User interfaces
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'counselor' | 'admin';
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
}

export interface Student extends User {
  role: 'student';
  interests?: string[];
  educationLevel?: string;
  location?: string;
}

export interface Counselor extends User {
  role: 'counselor';
  institution?: string;
  specialization?: string[];
  yearsOfExperience?: number;
}

export interface Admin extends User {
  role: 'admin';
}

// Institution interfaces
export interface Institution {
  id: string;
  name: string;
  type: 'university' | 'college' | 'vocational' | 'secondary';
  location: string;
  website?: string;
  description: string;
  logoUrl?: string;
  coverImageUrl?: string;
  programs: Program[];
  accreditation?: string;
  foundedYear?: number;
  contact?: Contact;
  facilities?: string[];
}

export interface Program {
  id: string;
  name: string;
  level: 'certificate' | 'diploma' | 'bachelors' | 'masters' | 'phd';
  duration: string;
  description: string;
  careers?: string[];
  requirements?: string[];
  tuitionFees?: string;
}

export interface Contact {
  email?: string;
  phone?: string;
  address?: string;
}

// Message interfaces
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}
