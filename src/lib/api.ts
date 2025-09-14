const API_BASE_URL = 'http://localhost:8000';

// API Response Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number?: string;
  date_of_birth?: string;
  address?: string;
  skills: string[];
  education: string[];
  experience: string[];
  certifications: string[];
  languages: string[];
  resume_text?: string;
  profile_summary?: string;
  social_links: string[];
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Internship {
  id: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  required_skills: string[];
  preferred_skills: string[];
  duration: string;
  stipend: string;
  application_deadline: string;
  openings: number;
  employment_type: string;
  perks: string[];
  responsibilities: string[];
  posted_by: string;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  internship_id: string;
  status: string;
  cover_letter: string;
  resume_id: string;
  applied_at: string;
  updated_at: string;
  feedback?: string;
  interview_date?: string;
  offer_letter?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  full_name: string;
}

export interface Token {
  access_token: string;
  token_type: string;
}

// Auth Functions
export const signup = async (userData: SignupData): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Signup failed');
  }
  
  return response.json();
};

export const login = async (credentials: LoginCredentials): Promise<Token> => {
  const formData = new FormData();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);
  
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return response.json();
};

// User Functions
export const getUser = async (userId: string, token: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  
  return response.json();
};

export const updateUser = async (userId: string, userData: Partial<User>, token: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  
  return response.json();
};

export const uploadResume = async (userId: string, file: File, token: string): Promise<User> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/users/${userId}/upload_resume`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload resume');
  }
  
  return response.json();
};

// Internship Functions
export const getInternships = async (): Promise<Internship[]> => {
  const response = await fetch(`${API_BASE_URL}/internships/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch internships');
  }
  
  return response.json();
};

export const createInternship = async (internshipData: Partial<Internship>, token: string): Promise<Internship> => {
  const response = await fetch(`${API_BASE_URL}/internships/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(internshipData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create internship');
  }
  
  return response.json();
};

// Application Functions
export const applyForInternship = async (applicationData: {
  internship_id: string;
  cover_letter: string;
  resume_id?: string;
}, token: string): Promise<Application> => {
  const response = await fetch(`${API_BASE_URL}/applications/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(applicationData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to apply for internship');
  }
  
  return response.json();
};

export const getUserApplications = async (userId: string, token: string): Promise<Application[]> => {
  const response = await fetch(`${API_BASE_URL}/applications/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }
  
  return response.json();
};

// Recommendations Functions
export const getRecommendations = async (userId: string, token: string): Promise<Internship[]> => {
  const response = await fetch(`${API_BASE_URL}/recommendations/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }
  
  return response.json();
};

// Dashboard Functions
export const getDashboard = async (userId: string, token: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/dashboard/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard');
  }
  
  return response.json();
};