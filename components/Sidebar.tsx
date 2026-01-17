
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  isLoggedIn: boolean;
  onLogin: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, isLoggedIn, onLogin }) => {
  const navItems = [
    { id: 'creator', label: 'Title + Face Maker', icon: 'M12 4v16m8-8H4' },
    { id: 'video2thumb', label: 'Video to Thumbnail', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { id: 'library', label: 'Media Library', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
    { id: 'performance', label: 'AI Channel Chat', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  ];

  return (
    <aside className="w-72 bg-[#161616] border-r border-white/5 flex flex-col shrink-0 hidden md:flex">
      <div className="p-8 pb-4 flex-1">
        {!isLoggedIn && (
          <div className="flex gap-2 mb-8">
            <button 
              onClick={onLogin}
              className="flex-1 bg-white text-black font-bold py-2 rounded-lg text-sm hover:bg-white/90 transition-colors"
            >
              Sign up
            </button>
            <button 
              onClick={onLogin}
              className="flex-1 bg-white/5 border border-white/10 font-bold py-2 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Log in
            </button>
          </div>
        )}
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${activeView === item.id ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}
              `}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="font-semibold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {isLoggedIn && (
        <div className="mt-auto p-6 border-t border-white/5">
          <button 
            onClick={() => onViewChange('account')}
            className={`
              w-full flex items-center gap-3 p-3 rounded-xl transition-all
              ${activeView === 'account' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'}
            `}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-500 to-purple-600 flex items-center justify-center font-bold text-white">
              JD
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-sm font-bold text-white leading-none truncate">John Doe</p>
              <p className="text-xs text-white/30 mt-1">Pro Member</p>
            </div>
            <svg className="w-4 h-4 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
