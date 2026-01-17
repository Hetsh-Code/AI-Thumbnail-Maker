
import React from 'react';
import { SavedThumbnail } from '../types';

interface MediaLibraryProps {
  library: SavedThumbnail[];
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({ library }) => {
  return (
    <div className="view-animate py-8">
      <h2 className="text-3xl font-extrabold mb-8">Media Library</h2>
      {library.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-20 text-center">
          <p className="text-white/40 text-lg">No thumbnails generated yet. Go create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {library.map((item) => (
            <div key={item.id} className="group bg-[#161616] border border-white/5 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={item.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = item.url;
                      link.download = `thumbnail-${item.id}.png`;
                      link.click();
                    }}
                    className="bg-white text-black font-bold px-4 py-2 rounded-lg text-sm"
                  >
                    Download
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="font-bold truncate text-sm">{item.title}</p>
                <p className="text-xs text-white/30 mt-1">{new Date(item.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
