import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import {
  TrendingUp,
  Users,
  FileText,
  Calendar,
  Plus,
  BookOpen,
  HelpCircle,
  FileBarChart,
  Users2,
  Grid3X3
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { services } from '../services';
import ActivityTracker from '../components/dashboard/ActivityTracker';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const today = new Date();
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    const fetchActivities = async () => {
      const data = await services.activities.getActivities();
      setActivities(data);
    };
    fetchActivities();
  }, []);
  
  // Mock data for the chart
  const chartData = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      {
        label: '2024',
        data: [8.5, 8, 3.5, 1, 5, 8.5, 2.5, 4.5, 1.2, 7, 2.8, 5],
        borderColor: '#00BFB3',
        backgroundColor: '#00BFB3',
        tension: 0.4,
      },
      {
        label: '2025',
        data: [6, 3, 4.5, 8, 6, 8, 5, 8.5, 2, 4.5, 7.5, 9],
        borderColor: '#FF6B00',
        backgroundColor: '#FF6B00',
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => value + 'M',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // Product cards data
  const productCards = [
    {
      id: 'individual',
      title: 'INDIVIDUAL PLAN',
      icon: <FileText className="w-6 h-6 text-white" />,
      bgColor: 'bg-accent-500',
    },
    {
      id: 'family',
      title: 'FAMILY PLAN',
      icon: <Users2 className="w-6 h-6 text-white" />,
      bgColor: 'bg-orange-400',
    },
    {
      id: 'premium',
      title: 'PREMIUM PLAN',
      icon: <FileBarChart className="w-6 h-6 text-white" />,
      bgColor: 'bg-primary',
    },
    {
      id: 'more',
      title: 'MORE',
      icon: <Grid3X3 className="w-6 h-6 text-white" />,
      bgColor: 'bg-cyan-400',
    },
  ];

  // Quick access cards data
  const quickAccessCards = [
    {
      id: 'sales-pitch',
      title: 'Sales Pitch',
      icon: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 'learning-center',
      title: 'Learning Center',
      icon: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 'products',
      title: 'Products',
      icon: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 'help-center',
      title: 'Help Center',
      icon: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-lg bg-white shadow">
        <img
          src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Welcome banner"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 to-transparent flex items-center p-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Hi {user?.name.split(' ')[0]}!
            </h1>
            <p className="text-white/90">
              Good day! It is {format(today, 'MMMM d, yyyy')}.
            </p>
          </div>
        </div>
      </div>

      {/* Production Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            Agent Production Year on Year
          </h2>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            Learn More
          </button>
        </div>
        <Line data={chartData} options={chartOptions} className="h-[300px]" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Premiums</span>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-orange-500" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Premiums Due</span>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">For Renewal</span>
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-orange-500" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Expiring quotes</span>
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
              <Users className="w-4 h-4 text-teal-500" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-semibold">0</p>
        </div>
      </div>

      {/* Product Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Select a product</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productCards.map((card) => (
            <button
              key={card.id}
              className={`${card.bgColor} rounded-lg p-4 text-white hover:opacity-90 transition-opacity`}
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                {card.icon}
                <span className="text-sm font-medium">{card.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickAccessCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center p-4">
              <img
                src={card.icon}
                alt={card.title}
                className="w-12 h-12 rounded object-cover"
              />
              <h3 className="ml-4 text-lg font-medium text-gray-900">
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Tracker */}
      <ActivityTracker activities={activities} />
    </div>
  );
};

export default DashboardPage;