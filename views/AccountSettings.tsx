
import React, { useState } from 'react';

interface AccountSettingsProps {
  onLogout: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    dob: '1995-05-15',
    bio: 'Tech enthusiast and budding YouTuber.'
  });

  return (
    <div className="view-animate py-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold">Account Settings</h2>
        <button 
          onClick={onLogout}
          className="bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/50 text-red-500 px-4 py-2 rounded-xl text-sm font-bold transition-all"
        >
          Log out
        </button>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8">
        <div className="flex items-center gap-6 pb-8 border-b border-white/5">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-red-500 to-purple-600 flex items-center justify-center text-3xl font-bold">
            JD
          </div>
          <div>
            <h3 className="text-xl font-bold">{formData.name}</h3>
            <p className="text-white/40">{formData.email}</p>
            <button className="mt-2 text-sm text-red-500 font-bold hover:underline">Change Profile Picture</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase">Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 outline-none focus:border-red-600 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase">Date of Birth</label>
            <input 
              type="date" 
              value={formData.dob}
              onChange={(e) => setFormData({...formData, dob: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 outline-none focus:border-red-600 transition-colors"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase">Bio</label>
            <textarea 
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-3 outline-none focus:border-red-600 transition-colors resize-none"
            />
          </div>
        </div>

        <div className="pt-6 flex gap-4">
          <button className="flex-1 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold shadow-lg shadow-red-600/20 transition-all">
            Save Changes
          </button>
          <button className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-xl font-bold transition-all">
            Discard
          </button>
        </div>
      </div>

      <div className="mt-8 bg-red-500/5 border border-red-500/10 rounded-2xl p-6">
        <h4 className="font-bold text-red-500 mb-2">Danger Zone</h4>
        <p className="text-sm text-white/40 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="text-sm font-bold bg-red-500/20 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
