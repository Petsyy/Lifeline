import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  ClipboardList,
  Map as MapIcon,
  Link as LinkIcon,
  FileText,
  User,
  Menu,
  Search,
  Bell,
  Settings,
  Moon,
  MoreHorizontal,
  Navigation,
  Activity,
  CheckCircle2,
  Clock,
  LogOut
} from 'lucide-react';

// --- Types ---
interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  trend: string;
  icon: React.ReactNode;
  color: string;
}

interface EmergencyItemProps {
  title: string;
  location: string;
  type: 'critical' | 'high' | 'medium';
  progress: number;
  deployed: number;
  time: string;
}

// --- Components ---

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-600/10 text-blue-500 border-r-2 border-blue-500' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'}`}>
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </div>
);

const StatCard = ({ title, value, subtext, trend, icon, color }: StatCardProps) => (
  <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg bg-opacity-10 ${color} bg-white/5`}>
        {icon}
      </div>
      <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded">{trend}</span>
    </div>
    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
    <p className="text-gray-400 text-sm font-medium">{title}</p>
    <p className="text-gray-500 text-xs mt-1">{subtext}</p>
  </div>
);

const EmergencyRow = ({ title, location, type, progress, deployed, time }: EmergencyItemProps) => {
  const typeColors = {
    critical: 'bg-red-500/10 text-red-500 border-red-500/20',
    high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#1F2937]/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-all mb-3">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${type === 'critical' ? 'bg-red-500/20 text-red-500' : type === 'high' ? 'bg-orange-500/20 text-orange-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
          <AlertTriangle size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-white">{title}</h4>
            <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold ${typeColors[type]}`}>{type}</span>
          </div>
          <p className="text-gray-400 text-xs flex items-center gap-1">
            <MapIcon size={12} /> {location}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
             <span className="flex items-center gap-1"><Users size={12} className="text-blue-400"/> {deployed} Responders</span>
             <span className="flex items-center gap-1"><Clock size={12}/> {time}</span>
          </div>
        </div>
      </div>

      {/* Circular Progress Placeholder */}
      <div className="relative flex items-center justify-center w-12 h-12">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-700" />
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={113} strokeDashoffset={113 - (113 * progress) / 100} className="text-blue-500" />
        </svg>
        <span className="absolute text-[10px] font-bold text-white">{progress}%</span>
      </div>
    </div>
  );
};

const ActivityItem = ({ text, time, icon, color }: { text: string; time: string; icon: React.ReactNode; color: string }) => (
  <div className="flex gap-3 mb-6 relative">
    {/* Line connector */}
    <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-gray-800"></div>
    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${color} bg-opacity-20 border border-white/5`}>
        {icon}
    </div>
    <div>
        <p className="text-sm text-gray-300">{text}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);


// --- Main Dashboard Layout ---

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-[#080C16] text-white font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#080C16] border-r border-gray-800 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
            {/* Logo Placeholder */}
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span className="text-xl font-bold tracking-wide">LifeLine</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <SidebarItem icon={<AlertTriangle size={20} />} label="Emergencies" />
          <SidebarItem icon={<Users size={20} />} label="Volunteers" />
          <SidebarItem icon={<ClipboardList size={20} />} label="Tasks" />
          <SidebarItem icon={<MapIcon size={20} />} label="Live Map" />
          <SidebarItem icon={<LinkIcon size={20} />} label="Placeholder" />
          <SidebarItem icon={<FileText size={20} />} label="Reports" />
          <SidebarItem icon={<User size={20} />} label="Profile" />
          <div className="pt-4 border-t border-gray-800">
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors w-full">
              <LogOut size={20} />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full px-4 py-2">
            <MoreHorizontal size={20} />
            <span className="font-medium text-sm">More</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="h-16 border-b border-gray-800 bg-[#080C16] flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-4 text-sm text-gray-400">
             <span className="text-white font-semibold">Dashboard</span>
             <span className="text-gray-600">/</span>
             <span>Welcome Back, John Doe</span>
          </div>

          <div className="flex items-center gap-2 bg-[#111827] border border-gray-700 rounded-lg px-3 py-2 w-96">
            <Search size={18} className="text-gray-500" />
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500" />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white"><Moon size={20} /></button>
            <button className="p-2 text-gray-400 hover:text-white relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-white"><Settings size={20} /></button>
            <div className="h-8 w-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full border-2 border-gray-800 cursor-pointer"></div>
          </div>
        </header>

        {/* Dashboard Content Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#0b1120]">
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Command Center</h1>
            <p className="text-gray-400 text-sm">Real-time emergency coordination dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Active Emergencies" 
              value="12" 
              subtext="Active Emergencies" 
              trend="+3" 
              icon={<AlertTriangle className="text-red-500" size={24} />} 
              color="text-red-500"
            />
            <StatCard 
              title="Available Volunteers" 
              value="847" 
              subtext="Available Volunteers" 
              trend="+24" 
              icon={<Users className="text-green-500" size={24} />} 
              color="text-green-500"
            />
            <StatCard 
              title="Tasks In Progress" 
              value="156" 
              subtext="Tasks In Progress" 
              trend="+8" 
              icon={<ClipboardList className="text-yellow-500" size={24} />} 
              color="text-yellow-500"
            />
            <StatCard 
              title="Response Rate" 
              value="94%" 
              subtext="Response Rate" 
              trend="+2%" 
              icon={<Activity className="text-blue-500" size={24} />} 
              color="text-blue-500"
            />
          </div>

          {/* Map Section */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-1 mb-8 relative group h-[400px] overflow-hidden">
             {/* Map Placeholder Image/Div */}
             <div className="w-full h-full bg-[#1F2937] rounded-lg relative overflow-hidden flex items-center justify-center">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 opacity-20" 
                     style={{ 
                         backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', 
                         backgroundSize: '20px 20px' 
                     }}>
                </div>
                <div className="text-gray-600 flex flex-col items-center">
                    <MapIcon size={48} className="mb-2 opacity-50" />
                    <span className="font-mono text-sm">Interactive Map Module Loading...</span>
                </div>
                
                {/* Floating Map Controls */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-xs font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span> Emergency Map
                </div>

                <div className="absolute bottom-4 left-4">
                     <button className="bg-[#080C16] hover:bg-black text-white px-4 py-2 rounded-lg text-sm border border-gray-700 shadow-lg flex items-center gap-2">
                         <Navigation size={14} /> Locate Me
                     </button>
                </div>
                
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                     <button className="w-8 h-8 bg-[#080C16] border border-gray-700 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-800">+</button>
                     <button className="w-8 h-8 bg-[#080C16] border border-gray-700 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-800">-</button>
                </div>
             </div>
          </div>

          {/* Bottom Grid: Emergencies List & Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Active Emergencies List */}
            <div className="lg:col-span-2 bg-[#111827] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Active Emergencies</h3>
                    <p className="text-gray-400 text-xs">Current incidents requiring response</p>
                </div>
                <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">View All <span className="text-lg">→</span></button>
              </div>

              <div className="space-y-1">
                <EmergencyRow 
                    title="Flood" 
                    location="Barangay San Jose, Quezon City" 
                    type="critical" 
                    deployed={18} 
                    time="15 min ago" 
                    progress={72} 
                />
                <EmergencyRow 
                    title="Fire" 
                    location="Barangay Poblacion, Makati" 
                    type="high" 
                    deployed={12} 
                    time="32 min ago" 
                    progress={40} 
                />
                <EmergencyRow 
                    title="Typhoon Evacuation" 
                    location="Multiple Barangays, Pasig City" 
                    type="critical" 
                    deployed={35} 
                    time="1 hour ago" 
                    progress={70} 
                />
                 <EmergencyRow 
                    title="Building Collapse" 
                    location="Barangay Bagong Silang, Caloocan" 
                    type="medium" 
                    deployed={20} 
                    time="2 hours ago" 
                    progress={100} 
                />
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white">Activity Feed</h3>
                        <p className="text-gray-400 text-xs">Real-time updates</p>
                    </div>
                    <Activity size={16} className="text-gray-500" />
                </div>

                <div className="mt-4">
                    <ActivityItem 
                        text="Maria Santos completed evacuation task" 
                        time="2 min ago" 
                        icon={<CheckCircle2 size={16} className="text-green-500" />} 
                        color="bg-green-500"
                    />
                    <ActivityItem 
                        text="Juan Dela Cruz assigned to Flood Response" 
                        time="5 min ago" 
                        icon={<User size={16} className="text-blue-500" />} 
                        color="bg-blue-500"
                    />
                     <ActivityItem 
                        text="New emergency reported in Quezon City" 
                        time="15 min ago" 
                        icon={<AlertTriangle size={16} className="text-orange-500" />} 
                        color="bg-orange-500"
                    />
                    <ActivityItem 
                        text="Supply delivery delayed - rerouting" 
                        time="18 min ago" 
                        icon={<Clock size={16} className="text-red-500" />} 
                        color="bg-red-500"
                    />
                     <ActivityItem 
                        text="Team Alpha deployed to evacuation center" 
                        time="25 min ago" 
                        icon={<Users size={16} className="text-blue-400" />} 
                        color="bg-blue-400"
                    />
                </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;