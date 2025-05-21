import { LoginCredentials, OTPVerificationData, LoginResponse, User, ChannelPartner, ChannelPartnerResponse } from '../types';
import { mockUser, handleLogin, handleVerifyOTP } from '../mocks/handlers';

// Helper function for simulating API delays
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock todo data
const mockTodos = [
  {
    id: 1,
    title: 'Design evaluation meeting arranged with Client.',
    date: '22/02/2025',
    time: '12:30 PM',
    status: 'OVERDUE',
    priority: 'MEDIUM',
    assignedTo: 'Shubham Roy',
    isCompleted: false
  },
  {
    id: 2,
    title: 'Design evaluation meeting arranged with Client.',
    date: '22/02/2025',
    time: '12:30 PM',
    status: 'PENDING',
    priority: 'HIGH',
    assignedTo: 'Shubham Roy',
    isCompleted: false
  },
  {
    id: 3,
    title: 'Design evaluation meeting arranged with Client.',
    date: '22/02/2025',
    time: '12:30 PM',
    status: 'PENDING',
    priority: 'MEDIUM',
    assignedTo: 'Shubham Roy',
    isCompleted: false
  },
  {
    id: 4,
    title: 'Design evaluation meeting arranged with Client.',
    date: '22/02/2025',
    time: '12:30 PM',
    status: 'PENDING',
    priority: 'LOW',
    assignedTo: 'Shubham Roy',
    isCompleted: false
  }
];

// Mock activities data
const mockActivities = [
  {
    id: 1,
    date: '2025-02-21',
    time: '8:30 AM',
    type: 'APPOINTMENT',
    description: 'Follow-up client details and collect required documents today'
  },
  {
    id: 2,
    date: '2025-02-25',
    time: '9:00 AM',
    type: 'BIRTHDAY',
    description: 'Birthday reminder for client: Alexander de los Santos'
  },
  {
    id: 3,
    date: '2025-02-27',
    time: '8:30 AM',
    type: 'APPOINTMENT',
    description: 'Follow-up client details and collect required documents'
  }
];

// Mock calendar events
const mockCalendarEvents = [
  {
    id: 1,
    date: '2022-12-10',
    type: 'Team Building Activity',
    with: 'Supervisor',
    name: 'Event name of 20 chr',
    priority: 'MEDIUM',
    isAllDay: true,
    remark: 'This is a sample remark. Some times remarks can be longer text up to 80 characters.'
  },
  {
    id: 2,
    date: '2022-12-10',
    type: 'Team Building Activity',
    with: 'Supervisor',
    name: 'Event name of 20 chr',
    priority: 'MEDIUM',
    isAllDay: true,
    remark: 'This is a sample remark. Some times remarks can be longer text up to 80 characters.'
  },
  {
    id: 3,
    date: '2022-12-10',
    type: 'Team Building Activity',
    with: 'Supervisor',
    name: 'Event name of 20 chr',
    priority: 'MEDIUM',
    isAllDay: true,
    remark: 'This is a sample remark. Some times remarks can be longer text up to 80 characters.'
  }
];

// Mock quotations data
const mockQuotations = [
  {
    id: 1,
    date: '12 June 2023',
    type: 'MOTOR',
    customer: {
      name: 'Juan Dela Cruz',
      location: 'DA ALMENDRAS'
    },
    details: {
      quoteType: 'Formal',
      travelPack: 'PHILIPPINES',
      travelProduct: 'COMPLETO',
      premium: 876.64,
      status: 'ACTIVE',
      expiry: '09/30/2023',
      quotationNumber: '3802302004184'
    }
  },
  {
    id: 2,
    date: '12 June 2023',
    type: 'TRAVEL',
    customer: {
      name: 'Maria Santos',
      location: 'Ketursko Roy'
    },
    details: {
      quoteType: 'Formal',
      travelPack: 'PHILIPPINES',
      travelProduct: 'COMPLETO',
      premium: 876.64,
      status: 'ACTIVE',
      expiry: '09/30/2023',
      quotationNumber: '3802302004184',
      riskInspectionStatus: 'REQUIRED'
    }
  }
];

// Mock policies data
const mockPolicies = [
  {
    id: 1,
    date: '12 June 2023',
    type: 'MOTOR',
    customer: {
      name: 'Juan Dela Cruz',
      location: 'DA ALMENDRAS'
    },
    details: {
      policyType: 'Comprehensive',
      travelPack: 'PHILIPPINES',
      travelProduct: 'COMPLETO',
      premium: 876.64,
      status: 'ACTIVE',
      expiry: '09/30/2023',
      policyNumber: '3802302004184'
    }
  },
  {
    id: 2,
    date: '12 June 2023',
    type: 'TRAVEL',
    customer: {
      name: 'Maria Santos',
      location: 'Ketursko Roy'
    },
    details: {
      policyType: 'Standard',
      travelPack: 'PHILIPPINES',
      travelProduct: 'COMPLETO',
      premium: 876.64,
      status: 'ACTIVE',
      expiry: '09/30/2023',
      policyNumber: '3802302004184',
      riskInspectionStatus: 'REQUIRED'
    }
  }
];

// Mock channel partners data
const mockChannelPartners: ChannelPartner[] = [
  {
    id: '266575420',
    type: 'INDIVIDUAL',
    name: 'Isabella Mendoza',
    status: 'OPEN',
    createdOn: '08/03/2025',
    emailId: 'isabellamendoza@gmail.com',
    mobileNo: '+63 9234567890',
    location: 'Iloilo City',
    workExperience: 'No',
    previousCompany: '-',
    avatar: {
      initials: 'IM',
      bgColor: 'bg-orange-500'
    }
  },
  {
    id: '3789654123',
    type: 'BROKER',
    name: 'VitalShield Brokers',
    status: 'OPEN',
    createdOn: '25/04/2025',
    emailId: 'anareyes@gmail.com',
    mobileNo: '+63 9345678901',
    location: 'Vigan City',
    representativeName: 'Ana Reyes',
    designation: 'Health Insurance Broker',
    avatar: {
      initials: 'VB',
      bgColor: 'bg-blue-500'
    }
  },
  {
    id: '987654321',
    type: 'INDIVIDUAL',
    name: 'Marco Santos',
    status: 'CONTACTED',
    createdOn: '15/03/2025',
    emailId: 'marcosantos@gmail.com',
    mobileNo: '+63 9876543210',
    location: 'Cebu City',
    workExperience: '5 years',
    previousCompany: 'HealthFirst Insurance',
    avatar: {
      initials: 'MS',
      bgColor: 'bg-green-500'
    }
  },
  {
    id: '456789123',
    type: 'BROKER',
    name: 'SecureLife Partners',
    status: 'CONTACTED',
    createdOn: '20/03/2025',
    emailId: 'contact@securelife.com',
    mobileNo: '+63 9123456789',
    location: 'Davao City',
    representativeName: 'John Cruz',
    designation: 'Senior Insurance Broker',
    avatar: {
      initials: 'SP',
      bgColor: 'bg-purple-500'
    }
  },
  {
    id: '789123456',
    type: 'INDIVIDUAL',
    name: 'Sofia Garcia',
    status: 'CONVERTED',
    createdOn: '10/02/2025',
    emailId: 'sofiagarcia@gmail.com',
    mobileNo: '+63 9234567891',
    location: 'Manila',
    workExperience: '3 years',
    previousCompany: 'InsureMax Corp',
    avatar: {
      initials: 'SG',
      bgColor: 'bg-yellow-500'
    }
  },
  {
    id: '321654987',
    type: 'BROKER',
    name: 'HealthGuard Solutions',
    status: 'CONVERTED',
    createdOn: '05/03/2025',
    emailId: 'info@healthguard.com',
    mobileNo: '+63 9345678902',
    location: 'Makati City',
    representativeName: 'Maria Luna',
    designation: 'Insurance Solutions Manager',
    avatar: {
      initials: 'HG',
      bgColor: 'bg-indigo-500'
    }
  },
  {
    id: '147258369',
    type: 'INDIVIDUAL',
    name: 'Rafael Tan',
    status: 'FAILED',
    createdOn: '01/03/2025',
    emailId: 'rafaeltan@gmail.com',
    mobileNo: '+63 9876543211',
    location: 'Quezon City',
    workExperience: '1 year',
    previousCompany: 'InsureTech PH',
    avatar: {
      initials: 'RT',
      bgColor: 'bg-red-500'
    }
  },
  {
    id: '963852741',
    type: 'BROKER',
    name: 'PrimeCare Insurance',
    status: 'FAILED',
    createdOn: '28/02/2025',
    emailId: 'support@primecare.com',
    mobileNo: '+63 9234567892',
    location: 'Pasig City',
    representativeName: 'David Lim',
    designation: 'Insurance Consultant',
    avatar: {
      initials: 'PC',
      bgColor: 'bg-pink-500'
    }
  }
];

// Mock customer data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Elena Cruz',
    customerSince: 'Mar 2019',
    gender: 'Female',
    birthdate: 'February 14, 2023',
    leadId: '4321678915',
    importance: 'IMPORTANT',
    createdAt: '12 June 2023',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  },
  {
    id: '2',
    name: 'Rafael Mendoza',
    customerSince: 'Mar 2019',
    gender: 'Male',
    birthdate: 'July 9, 2023',
    leadId: '4321678915',
    importance: 'IMPORTANT',
    createdAt: '12 June 2023',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  },
  {
    id: '3',
    name: 'Maria Santos',
    customerSince: 'Mar 2019',
    gender: 'Female',
    birthdate: 'March 5, 2023',
    leadId: '4321678915',
    importance: 'IMPORTANT',
    createdAt: '12 June 2023',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  },
  {
    id: '4',
    name: 'Carlos Reyes',
    customerSince: 'Mar 2019',
    gender: 'Male',
    birthdate: 'June 18, 2023',
    leadId: '4321678915',
    importance: 'IMPORTANT',
    createdAt: '12 June 2023',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  }
];

// Mock lead data
const mockLeads: Lead[] = [
  {
    id: '888699',
    name: 'Prapti I',
    code: 'PI',
    initials: 'PI',
    initialsColor: 'bg-green-500',
    status: 'Open',
    type: 'Sales',
    createdOn: '05-16-2025',
    allocatedOn: '05-16-2025',
    appointmentOn: '05-16-2025',
    mobileNo: '989877899879',
    allocatedBy: 'Pedrito Antonio',
    allocatedTo: 'Pedrito Antonio'
  },
  {
    id: '458957',
    name: 'Nithu R',
    code: 'NR',
    initials: 'NR',
    initialsColor: 'bg-amber-700',
    status: 'Open',
    type: 'Individual',
    createdOn: '05-09-2025',
    allocatedOn: '05-09-2025',
    appointmentOn: '',
    mobileNo: '99887875543',
    allocatedBy: 'Pedrito Antonio',
    allocatedTo: 'Pedrito Antonio'
  }
];

// Helper function to paginate data
const paginateData = <T>(data: T[], page = 1, limit = 10): PaginatedResponse<T> => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / limit);

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: data.length,
      itemsPerPage: limit,
    },
  };
};

// Mock API service for development (simulates real API responses)
export const mockAuthService = {
  requestOTP: async (credentials: LoginCredentials): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await handleLogin(credentials.agentCode);
      return response;
    } catch (error: any) {
      throw { message: error.message };
    }
  },

  verifyOTP: async (data: OTPVerificationData): Promise<LoginResponse> => {
    try {
      const response = await handleVerifyOTP(data.agentCode, data.otp);
      
      if (response.success) {
        localStorage.setItem('auth_token', 'mock_jwt_token');
        localStorage.setItem('user_data', JSON.stringify(mockUser));
      }
      
      return response.data as LoginResponse;
    } catch (error: any) {
      throw { message: error.message };
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const userData = localStorage.getItem('user_data');
    
    if (!userData) {
      throw new Error('Not authenticated');
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return JSON.parse(userData) as User;
  },

  logout: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};

// Mock activities service
export const mockActivitiesService = {
  getActivities: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockActivities;
  }
};

// Mock calendar service
export const mockCalendarService = {
  getEvents: async (fromDate?: string, toDate?: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      pastEvents: 3,
      upcomingEvents: mockCalendarEvents
    };
  },
  
  createEvent: async (eventData: any) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Event created successfully' };
  },

  getTodos: async (filter: 'ALL' | 'ARCHIVE' = 'ALL') => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTodos;
  },

  toggleTodoStatus: async (id: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

// Mock quotations service
export const mockQuotationsService = {
  getQuotations: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      quotations: mockQuotations,
      policies: mockPolicies,
      counts: {
        quotations: 240,
        policies: 180
      }
    };
  }
};

// Mock channel partner service
export const mockChannelPartnerService = {
  getPartners: async (filter?: string): Promise<ChannelPartnerResponse> => {
    await sleep(500); // Simulate API delay
    
    let filteredPartners = [...mockChannelPartners];
    if (filter && filter !== 'ALL') {
      filteredPartners = mockChannelPartners.filter(
        partner => partner.status === filter
      );
    }
    
    return {
      partners: filteredPartners,
      stats: {
        all: mockChannelPartners.length,
        open: mockChannelPartners.filter(p => p.status === 'OPEN').length,
        contacted: mockChannelPartners.filter(p => p.status === 'CONTACTED').length,
        converted: mockChannelPartners.filter(p => p.status === 'CONVERTED').length,
        failed: mockChannelPartners.filter(p => p.status === 'FAILED').length
      }
    };
  }
};

// Mock customer service
export const mockCustomerService = {
  getCustomers: async (filter?: string): Promise<CustomerResponse> => {
    await sleep(500); // Simulate API delay
    
    let filteredCustomers = [...mockCustomers];
    if (filter && filter !== 'ALL') {
      filteredCustomers = mockCustomers.filter(
        customer => customer.importance === filter
      );
    }
    
    return {
      customers: filteredCustomers,
      stats: {
        all: mockCustomers.length,
        important: mockCustomers.filter(c => c.importance === 'IMPORTANT').length,
        dealToClose: mockCustomers.filter(c => c.importance === 'DEAL_TO_CLOSE').length
      }
    };
  }
};

// Update the mock service to handle pagination
export const mockLeadService = {
  getLeads: async (filter?: string, { page = 1, limit = 10 }: PaginationParams = {}): Promise<PaginatedResponse<Lead> & { stats: LeadStats }> => {
    await sleep(500);
    
    let filteredLeads = [...mockLeads];
    if (filter && filter !== 'ALL') {
      filteredLeads = mockLeads.filter(lead => lead.status.toUpperCase() === filter);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex);
    
    return {
      data: paginatedLeads,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredLeads.length / limit),
        totalItems: filteredLeads.length,
        itemsPerPage: limit,
      },
      stats: {
        all: mockLeads.length,
        forToday: mockLeads.filter(l => l.status === 'For Today').length,
        open: mockLeads.filter(l => l.status === 'Open').length,
        discarded: mockLeads.filter(l => l.status === 'Discarded').length,
        converted: mockLeads.filter(l => l.status === 'Converted').length,
        failed: mockLeads.filter(l => l.status === 'Failed').length,
      },
    };
  },
};