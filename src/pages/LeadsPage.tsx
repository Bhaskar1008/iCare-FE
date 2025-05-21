import React, { useState, useEffect } from 'react';
import { Filter, User, Users, Plus, RefreshCw } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { services } from '../services';
import { Lead, LeadStats } from '../types';
import LeadCard from '../components/leads/LeadCard';

const LeadsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<'ALL' | 'FOR_TODAY' | 'OPEN' | 'DISCARDED' | 'CONVERTED' | 'FAILED'>(
    (tabFromUrl?.toUpperCase() as any) || 'ALL'
  );
  const [viewType, setViewType] = useState<'SELF' | 'TEAM'>('SELF');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats>({
    all: 0,
    forToday: 0,
    open: 0,
    discarded: 0,
    converted: 0,
    failed: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await services.lead.getLeads(activeTab);
      setLeads(response.leads);
      setStats(response.stats);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      setError('Failed to load data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab((tabFromUrl.toUpperCase() as any));
    }
  }, [tabFromUrl]);

  useEffect(() => {
    fetchData();
  }, [activeTab, viewType]);

  const handleRetry = () => {
    fetchData();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-cyan-500">
            Leads
          </h1>

          <div className="flex mt-6 border-b border-gray-200">
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'ALL'
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('ALL')}
            >
              All ({stats.all})
            </button>
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'FOR_TODAY'
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('FOR_TODAY')}
            >
              For Today ({stats.forToday})
            </button>
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'OPEN'
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('OPEN')}
            >
              Open ({stats.open})
            </button>
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'DISCARDED'
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('DISCARDED')}
            >
              Discarded ({stats.discarded})
            </button>
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'CONVERTED'
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('CONVERTED')}
            >
              Converted ({stats.converted})
            </button>
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'FAILED'
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('FAILED')}
            >
              Failed ({stats.failed})
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-full flex items-center ${
                  viewType === 'SELF'
                    ? 'bg-cyan-500 text-white'
                    : 'border border-gray-300 text-gray-700'
                }`}
                onClick={() => setViewType('SELF')}
              >
                <User className="w-4 h-4 mr-2" />
                Self
              </button>
              <button
                className={`px-4 py-2 rounded-full flex items-center ${
                  viewType === 'TEAM'
                    ? 'bg-cyan-500 text-white'
                    : 'border border-gray-300 text-gray-700'
                }`}
                onClick={() => setViewType('TEAM')}
              >
                <Users className="w-4 h-4 mr-2" />
                Team
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-cyan-500 text-white rounded-full text-sm font-medium hover:bg-cyan-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="flex items-center px-4 py-2 text-cyan-500 hover:text-cyan-600"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {leads.map(lead => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onUpdate={() => console.log('Update lead:', lead.id)}
                />
              ))}
              {leads.length === 0 && (
                <div className="col-span-2 text-center py-12 text-gray-500">
                  No leads found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;