import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import QuotationCard from '../components/quotations/QuotationCard';
import PolicyCard from '../components/policies/PolicyCard';
import { services } from '../services';

const QuotationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'quotations' | 'policies'>('quotations');
  const [quotations, setQuotations] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [counts, setCounts] = useState({ quotations: 0, policies: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await services.quotations.getQuotations();
        setQuotations(response.quotations);
        setPolicies(response.policies);
        setCounts(response.counts);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-[#00BFB3]">
            Quotations/Policies
          </h1>
          
          {/* Tabs */}
          <div className="flex mt-6 border-b border-gray-200">
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'quotations'
                  ? 'text-[#FF6B00] border-[#FF6B00]'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('quotations')}
            >
              Quotations ({counts.quotations})
            </button>
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'policies'
                  ? 'text-[#FF6B00] border-[#FF6B00]'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('policies')}
            >
              Policies ({counts.policies})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">
              List Of {activeTab === 'quotations' ? 'Quotations' : 'Policies'}
            </h2>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 text-primary hover:underline"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {activeTab === 'quotations' ? (
                quotations.map(quotation => (
                  <QuotationCard key={quotation.id} {...quotation} />
                ))
              ) : (
                policies.map(policy => (
                  <PolicyCard key={policy.id} {...policy} />
                ))
              )}
              {(activeTab === 'quotations' ? quotations : policies).length === 0 && (
                <div className="col-span-2 text-center py-12 text-gray-500">
                  No {activeTab} found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotationsPage;