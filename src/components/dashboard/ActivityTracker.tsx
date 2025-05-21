import React, { useState } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';
import Button from '../common/Button';

interface Activity {
  id: number;
  date: string;
  time: string;
  type: 'APPOINTMENT' | 'BIRTHDAY';
  description: string;
}

interface ActivityTrackerProps {
  activities: Activity[];
}

const ActivityTracker: React.FC<ActivityTrackerProps> = ({ activities }) => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-02-21'));
  
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentDate, i);
    return {
      date,
      dayName: format(date, 'EEE').toUpperCase(),
      dayNumber: format(date, 'd'),
      isToday: i === 0,
    };
  });

  const handlePrevWeek = () => setCurrentDate(prev => subDays(prev, 7));
  const handleNextWeek = () => setCurrentDate(prev => addDays(prev, 7));

  const getActivitiesForDate = (date: Date) => {
    return activities.filter(activity => activity.date === format(date, 'yyyy-MM-dd'));
  };

  return (
    <div className="bg-[#00BFB3] rounded-lg p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Activity Tracker</h2>
        <Button
          variant="ghost"
          className="bg-white/10 text-white hover:bg-white/20"
          leftIcon={<Plus className="w-4 h-4" />}
        >
          ADD EVENT
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevWeek} className="text-white/80 hover:text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-medium">FEB 2025</span>
        <button onClick={handleNextWeek} className="text-white/80 hover:text-white">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map((day, index) => (
          <div
            key={index}
            className={`text-center p-2 rounded-lg ${
              day.isToday ? 'bg-[#FF6B00] text-white' : 'text-white/80'
            }`}
          >
            <div className="text-xs mb-1">{day.dayName}</div>
            <div className="text-sm font-medium">{day.dayNumber}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {days.map((day) => {
          const dayActivities = getActivitiesForDate(day.date);
          return dayActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-lg p-4 text-gray-800 flex items-start space-x-4"
            >
              <div className="bg-orange-100 rounded-full p-3">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium">{activity.time}</span>
                  <span className="bg-[#FF6B00] text-white text-xs px-2 py-1 rounded">
                    {activity.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            </div>
          ));
        })}

        {!activities.length && (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-500">Sorry, No Activity Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityTracker;