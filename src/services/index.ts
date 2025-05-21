import { config } from '../config/environment';
import { authService } from './auth';
import { 
  mockAuthService, 
  mockActivitiesService, 
  mockCalendarService, 
  mockQuotationsService,
  mockChannelPartnerService,
  mockCustomerService,
  mockLeadService 
} from './mockApi';

// Export mock services for development, real services for production
export const services = {
  auth: mockAuthService,
  activities: mockActivitiesService,
  calendar: mockCalendarService,
  quotations: mockQuotationsService,
  channelPartner: mockChannelPartnerService,
  customer: mockCustomerService,
  lead: mockLeadService
};