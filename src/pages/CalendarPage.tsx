import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, User, Calendar as CalendarIcon, MoreVertical, Clock } from 'lucide-react';
import { services } from '../services';
import Button from '../components/common/Button';

const CalendarPage: React.FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'calendar' | 'todo'>(
    (location.state?.tab as 'calendar' | 'todo') || 'calendar'
  );
  const [viewType, setViewType] = useState<'self' | 'team'>('self');
  const [todoFilter, setTodoFilter] = useState<'ALL' | 'ARCHIVE'>('ALL');
  const [todos, setTodos] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date('2022-12-01'));
  const [events, setEvents] = useState<any>({ pastEvents: 0, upcomingEvents: [] });

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state?.tab]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await services.calendar.getTodos(todoFilter);
      setTodos(data);
    };
    fetchTodos();
  }, [todoFilter]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await services.calendar.getEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const renderCalendarTab = () => {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <Button
              variant={viewType === 'self' ? 'primary' : 'outline'}
              onClick={() => setViewType('self')}
              leftIcon={<User className="w-4 h-4" />}
            >
              Self
            </Button>
            <Button
              variant={viewType === 'team' ? 'primary' : 'outline'}
              onClick={() => setViewType('team')}
              leftIcon={<User className="w-4 h-4" />}
            >
              Team
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="From Date"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="To Date"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              EVENT
            </Button>
          </div>
        </div>

        {/* Past Events Alert */}
        {events.pastEvents > 0 && (
          <div className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
            <div className="flex items-center text-red-600">
              <CalendarIcon className="w-5 h-5 mr-2" />
              <span>{events.pastEvents} Events From Past</span>
            </div>
            <button className="text-red-600 font-medium">SHOW</button>
          </div>
        )}

        {/* Events List */}
        <div className="space-y-4">
          {events.upcomingEvents.map((event: any) => (
            <div key={event.id} className="flex items-start border border-gray-200 rounded-lg p-4">
              <div className="flex-shrink-0 text-center mr-6">
                <div className="text-sm text-gray-500">{event.date}</div>
                <div className="font-medium">Monday</div>
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="bg-[#E5F9F7] text-[#00BFB3] text-xs px-2 py-1 rounded mr-2">
                      ALL DAY
                    </span>
                    <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                      MEDIUM
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Event Type</div>
                    <div>{event.type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Event With</div>
                    <div>{event.with}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Event Name</div>
                    <div>{event.name}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-500">Remark</div>
                  <div className="text-sm">{event.remark}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderTodoTab = () => {
    return (
      <div>
        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
              todoFilter === 'ALL'
                ? 'text-[#FF6B00] border-[#FF6B00]'
                : 'text-gray-500 border-transparent'
            }`}
            onClick={() => setTodoFilter('ALL')}
          >
            ALL
          </button>
          <button
            className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
              todoFilter === 'ARCHIVE'
                ? 'text-[#FF6B00] border-[#FF6B00]'
                : 'text-gray-500 border-transparent'
            }`}
            onClick={() => setTodoFilter('ARCHIVE')}
          >
            ARCHIVE
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {todos.map((todo) => (
            <div key={todo.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => {}}
                    className="mt-1 rounded border-gray-300 text-[#00BFB3] focus:ring-[#00BFB3]"
                  />
                  <div>
                    {todo.status === 'OVERDUE' && (
                      <div className="flex items-center text-red-600 mb-2">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">OVERDUE</span>
                        <span className="ml-2 text-sm">{todo.date} : {todo.time}</span>
                      </div>
                    )}
                    <p className="text-gray-900">{todo.title}</p>
                    <p className="text-sm text-gray-500 mt-1">By {todo.assignedTo}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-sm rounded ${
                    todo.priority === 'HIGH' 
                      ? 'bg-red-100 text-red-600'
                      : todo.priority === 'MEDIUM'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {todo.priority}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-[#00BFB3]">
            {activeTab === 'calendar' ? 'Calendar' : 'To Do'}
          </h1>
          
          {/* Tabs */}
          <div className="flex mt-6 border-b border-gray-200">
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'calendar'
                  ? 'text-[#FF6B00] border-[#FF6B00]'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('calendar')}
            >
              Calendar
            </button>
            <button
              className={`pb-4 px-6 text-sm font-medium border-b-2 -mb-px ${
                activeTab === 'todo'
                  ? 'text-[#FF6B00] border-[#FF6B00]'
                  : 'text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveTab('todo')}
            >
              To Do
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              className="ml-auto"
            >
              TASK
            </Button>
          </div>

          {activeTab === 'calendar' ? renderCalendarTab() : renderTodoTab()}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;