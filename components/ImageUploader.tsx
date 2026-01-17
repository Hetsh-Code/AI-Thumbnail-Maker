
import React, { useRef } from 'react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  selectedImage: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, selectedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-white/70 uppercase tracking-wider">
        1. Upload YouTuber Headshot
      </label>
      <div 
        onClick={handleClick}
        className={`
          relative w-full aspect-[4/3] rounded-2xl border-2 border-dashed 
          cursor-pointer transition-all duration-300 group overflow-hidden
          ${selectedImage ? 'border-transparent' : 'border-white/20 hover:border-red-500 bg-white/5'}
        `}
      >
        {selectedImage ? (
          <>
            <img 
              src={selectedImage} 
              alt="Selected Headshot" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-medium px-4 py-2 bg-red-600 rounded-lg shadow-xl">
                Change Photo
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold">Click to upload</p>
              <p className="text-sm text-white/40 mt-1">High-quality portrait works best</p>
            </div>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
