
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 mb-8 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 youtube-red rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          AI <span className="text-white/70 font-light">Thumbnails</span>
        </h1>
      </div>
      <div className="hidden md:block">
        <span className="text-sm text-white/40 font-medium px-3 py-1 bg-white/5 rounded-full border border-white/10">
          Powered by Gemini 2.5
        </span>
      </div>
    </header>
  );
};

export default Header;
