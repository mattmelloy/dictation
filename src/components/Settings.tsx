import React from 'react';
import { X } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVoiceModel: string;
  selectedTextModel: string;
  onVoiceModelChange: (model: string) => void;
  onTextModelChange: (model: string) => void;
}

export default function Settings({
  isOpen,
  onClose,
  selectedVoiceModel,
  selectedTextModel,
  onVoiceModelChange,
  onTextModelChange,
}: SettingsProps) {
  if (!isOpen) return null;

  const voiceModels = [
    "whisper-large-v3-turbo",
    "whisper-large-v3",
    "distil-whisper-large-v3-en"
  ];

  const textModels = [
    "llama-3.2-3b-preview",
    "llama3-70b-8192",
    "llama-3.2-11b-text-preview",
    "llama-3.2-90b-text-preview"
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Voice Model
            </label>
            <select
              value={selectedVoiceModel}
              onChange={(e) => onVoiceModelChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {voiceModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Model
            </label>
            <select
              value={selectedTextModel}
              onChange={(e) => onTextModelChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {textModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 