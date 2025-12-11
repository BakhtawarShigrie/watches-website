"use client";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, loginUser, logoutUser } = useGlobalContext();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Sync state with user data when modal opens
  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSave = () => {
    loginUser({ name, phone, image: "" }); // Update user in local storage
    setIsEditing(false);
    // Optional: Show success message
  };

  const handleLogout = () => {
    logoutUser();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-sm rounded-sm shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-black text-white p-6 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>
          <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3 uppercase">
            {name.charAt(0)}
          </div>
          <h3 className="text-lg font-bold tracking-wide">{isEditing ? "Edit Profile" : name}</h3>
          {!isEditing && <p className="text-xs text-gray-400">{phone}</p>}
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                <input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full border border-gray-300 p-2 text-sm focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone</label>
                <input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="w-full border border-gray-300 p-2 text-sm focus:border-black outline-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={() => setIsEditing(false)} className="flex-1 py-2 text-xs font-bold uppercase border border-gray-300 hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} className="flex-1 py-2 text-xs font-bold uppercase bg-black text-white hover:bg-gray-800">Save</button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Wishlist Items</span>
                <span className="font-bold text-black">View</span>
              </div>
              <button 
                onClick={() => setIsEditing(true)} 
                className="w-full py-3 border border-gray-300 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
              >
                Edit Details
              </button>
              <button 
                onClick={handleLogout} 
                className="w-full py-3 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider hover:bg-red-100 transition-colors"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}