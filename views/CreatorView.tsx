
import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { generateThumbnail } from '../services/geminiService';
import { GenerationState } from '../types';

interface CreatorViewProps {
  onSave: (url: string, title: string) => void;
}

const CreatorView: React.FC<CreatorViewProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [headshot, setHeadshot] = useState<string | null>(null);
  const [state, setState] = useState<GenerationState>({
    loading: false,
    error: null,
    resultUrl: null,
    statusMessage: ''
  });

  const handleGenerate = async () => {
    if (!title.trim() || !headshot) return;

    setState({ loading: true, error: null, resultUrl: null, statusMessage: 'Starting generation...' });
    try {
      setTimeout(() => setState(s => ({ ...s, statusMessage: 'Extracting features...' })), 2000);
      setTimeout(() => setState(s => ({ ...s, statusMessage: 'Rendering AI Studio...' })), 5000);
      
      const imageUrl = await generateThumbnail(title, headshot);
      setState({ loading: false, error: null, resultUrl: imageUrl, statusMessage: 'Complete!' });
      onSave(imageUrl, title);
    } catch (err: any) {
      setState({ loading: false, error: err.message, resultUrl: null, statusMessage: '' });
    }
  };

  return (
    <div className="view-animate max-w-5xl mx-auto space-y-8 py-8">
      {/* Inputs Stack Above Preview */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="space-y-4">
            <ImageUploader onImageSelected={setHeadshot} selectedImage={headshot} />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/50 uppercase tracking-widest">Video Title</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a viral title..."
                className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={state.loading || !title || !headshot}
              className={`
                w-full py-5 rounded-2xl font-bold text-xl transition-all active:scale-95
                ${(title && headshot && !state.loading) ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30' : 'bg-white/10 text-white/20 cursor-not-allowed'}
              `}
            >
              {state.loading ? 'Generating...' : 'Magic Generate'}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative aspect-video rounded-[3rem] bg-black/50 border border-white/10 overflow-hidden shadow-2xl group">
        {state.loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-bold tracking-tight text-white animate-pulse">{state.statusMessage}</p>
          </div>
        ) : state.resultUrl ? (
          <img src={state.resultUrl} className="w-full h-full object-cover" alt="Generated" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-40">
            <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xl font-medium">Your masterpiece will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorView;
