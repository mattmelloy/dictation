import React from 'react';
import { Mic, Settings } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
}

export default function Header({ onSettingsClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mic className="w-8 h-8" />
          <h1 className="text-2xl font-bold">Dictation Pro</h1>
        </div>
        <button 
          onClick={onSettingsClick}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}