// Existing types...

// Registration types
export type RegistrationType = 'AGENT' | 'BROKER' | 'FRANCHISE';

export interface RegistrationStep {
  id: string;
  title: string;
  description?: string;
}

export interface RegistrationFormData {
  // Personal Details
  type: RegistrationType;
  firstName: string;
  middleName?: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  state: string;
  city: string;
  pinCode: string;
  dateOfBirth: string;
  age: number;
  gender: string;
  phone: string;
  mobile: string;
  email: string;
  tin: string;
  
  // Banking Details
  bankName: string;
  branchName: string;
  accountName: string;
  accountNumber: string;
  
  // Educational Details
  education: {
    degree: string;
    institution: string;
    yearCompleted: string;
  }[];
  
  // Work Experience
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }[];
  
  // Documents
  documents: {
    type: string;
    file: File;
  }[];
}

export interface RegistrationState {
  step: number;
  formData: Partial<RegistrationFormData>;
  isLoading: boolean;
  error: string | null;
}

// Channel Partner types
export interface ChannelPartner {
  id: string;
  type: 'INDIVIDUAL' | 'BROKER';
  name: string;
  status: 'OPEN' | 'CONTACTED' | 'CONVERTED' | 'FAILED';
  createdOn: string;
  emailId: string;
  mobileNo: string;
  location: string;
  workExperience?: string;
  previousCompany?: string;
  representativeName?: string;
  designation?: string;
  avatar?: {
    initials: string;
    bgColor: string;
  };
}

export interface ChannelPartnerStats {
  all: number;
  open: number;
  contacted: number;
  converted: number;
  failed: number;
}

export interface ChannelPartnerResponse {
  partners: ChannelPartner[];
  stats: ChannelPartnerStats;
}

// Customer types
export interface Customer {
  id: string;
  name: string;
  avatar?: string;
  customerSince: string;
  gender: 'Male' | 'Female';
  birthdate: string;
  leadId: string;
  importance: 'IMPORTANT' | 'DEAL_TO_CLOSE';
  createdAt: string;
}

export interface CustomerStats {
  all: number;
  important: number;
  dealToClose: number;
}

export interface CustomerResponse {
  customers: Customer[];
  stats: CustomerStats;
}

// Lead types
export interface Lead {
  id: string;
  name: string;
  code: string;
  initials: string;
  initialsColor: string;
  status: 'Open' | 'For Today' | 'Discarded' | 'Converted' | 'Failed';
  type: 'Sales' | 'Individual';
  createdOn: string;
  allocatedOn: string;
  appointmentOn?: string;
  mobileNo: string;
  allocatedBy: string;
  allocatedTo: string;
}

export interface LeadStats {
  all: number;
  forToday: number;
  open: number;
  discarded: number;
  converted: number;
  failed: number;
}

export interface LeadResponse {
  leads: Lead[];
  stats: LeadStats;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}