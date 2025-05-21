import React, { useState, useEffect } from 'react';
import { Filter, RefreshCw } from 'lucide-react';
import { services } from '../services';
import { Customer, CustomerStats } from '../types';
import CustomerCard from '../components/customers/CustomerCard';

const CustomersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'IMPORTANT' | 'DEAL_TO_CLOSE'>('ALL');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<CustomerStats>({
    all: 0,
    important: 0,
    dealToClose: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await services.customer.getCustomers(activeTab);
      setCustomers(response.customers);
      setStats(response.stats);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      setError('Failed to load data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleRetry = () => {
    fetchData();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-cyan-500">
            Customers
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
                activeTab === 'IMPORTANT'
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('IMPORTANT')}
            >
              Important ({stats.important})
            </button>
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'DEAL_TO_CLOSE'
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('DEAL_TO_CLOSE')}
            >
              Deal to Close ({stats.dealToClose})
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">List Of Customers</h2>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
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
              {customers.map(customer => (
                <CustomerCard
                  key={customer.id}
                  customer={customer}
                  onDelete={() => console.log('Delete', customer.id)}
                  onMessage={() => console.log('Message', customer.id)}
                  onCall={() => console.log('Call', customer.id)}
                />
              ))}
              {customers.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No customers found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;