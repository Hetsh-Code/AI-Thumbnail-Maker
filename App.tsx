
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CreatorView from './views/CreatorView';
import MediaLibrary from './views/MediaLibrary';
import VideoToThumb from './views/VideoToThumb';
import PerformanceChat from './views/PerformanceChat';
import AccountSettings from './views/AccountSettings';
import { ViewType, SavedThumbnail } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('creator');
  const [library, setLibrary] = useState<SavedThumbnail[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('ai_thumbnail_library');
    if (saved) setLibrary(JSON.parse(saved));
    
    const auth = localStorage.getItem('ai_thumbnail_auth');
    if (auth === 'true') setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('ai_thumbnail_auth', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('ai_thumbnail_auth');
    if (activeView === 'account' || activeView === 'library') {
      setActiveView('creator');
    }
  };

  const addToLibrary = (url: string, title: string) => {
    const newItem: SavedThumbnail = {
      id: Date.now().toString(),
      url,
      title,
      timestamp: Date.now()
    };
    const updated = [newItem, ...library];
    setLibrary(updated);
    localStorage.setItem('ai_thumbnail_library', JSON.stringify(updated));
  };

  const renderView = () => {
    // Basic protection for members-only views
    if (!isLoggedIn && (activeView === 'account' || activeView === 'library')) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Sign in to access</h2>
            <p className="text-white/40 mt-2">Log in or Sign up to see your library and settings.</p>
          </div>
          <button 
            onClick={handleLogin}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20"
          >
            Log in Now
          </button>
        </div>
      );
    }

    switch (activeView) {
      case 'creator': return <CreatorView onSave={addToLibrary} />;
      case 'library': return <MediaLibrary library={library} />;
      case 'video2thumb': return <VideoToThumb onSave={addToLibrary} />;
      case 'performance': return <PerformanceChat />;
      case 'account': return <AccountSettings onLogout={handleLogout} />;
      default: return <CreatorView onSave={addToLibrary} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView} 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
      />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        <div className="flex-1 overflow-y-auto px-4 lg:px-12 pb-12">
          {renderView()}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .view-animate { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
