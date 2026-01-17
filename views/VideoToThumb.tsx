
import React, { useState, useRef } from 'react';
import { generateThumbnail } from '../services/geminiService';

interface VideoToThumbProps {
  onSave: (url: string, title: string) => void;
}

const VideoToThumb: React.FC<VideoToThumbProps> = ({ onSave }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [capturedFrame, setCapturedFrame] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setCapturedFrame(null);
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedFrame(canvas.toDataURL('image/png'));
    }
  };

  const handleGenerate = async () => {
    if (!capturedFrame || !title) return;
    setLoading(true);
    try {
      const url = await generateThumbnail(title, capturedFrame);
      onSave(url, title);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="view-animate py-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold">Video to Thumbnail</h2>
        <p className="text-white/50 mt-2">Upload a video clip and we'll transform a frame into a viral design.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
        {!videoFile ? (
          <div className="aspect-video border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer hover:border-red-600 transition-colors">
            <input type="file" accept="video/*" onChange={handleVideoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            <svg className="w-12 h-12 text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="font-bold">Select Video Clip</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative">
              <video ref={videoRef} src={URL.createObjectURL(videoFile)} controls className="w-full h-full" />
            </div>
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-xs font-bold text-white/50 uppercase">Thumbnail Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="The Ultimate Video Topic..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>
              <button 
                onClick={captureFrame} 
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Capture Frame
              </button>
            </div>
          </div>
        )}

        {capturedFrame && (
          <div className="pt-8 border-t border-white/5 space-y-6">
            <h3 className="font-bold text-white/50">Selected Frame:</h3>
            <div className="aspect-video rounded-2xl overflow-hidden border border-red-600/50">
              <img src={capturedFrame} className="w-full h-full object-cover" />
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-red-600 hover:bg-red-700 font-bold rounded-2xl shadow-xl shadow-red-600/20 transition-all"
            >
              {loading ? 'Processing...' : 'Generate From Video Frame'}
            </button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default VideoToThumb;
