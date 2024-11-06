import React from 'react';
import { Copy, Wand2 } from 'lucide-react';

interface TextEditorProps {
  text: string;
  onTextChange: (text: string) => void;
  onImprove: (style: string) => Promise<void>;
  isProcessing: boolean;
}

export default function TextEditor({ text, onTextChange, onImprove, isProcessing }: TextEditorProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const styleButtons = [
    {
      label: 'Improve Text',
      style: 'Improve this text by enhancing grammar, sentence structure, and overall clarity while maintaining the original meaning. Only return the improved text.',
      className: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      label: 'Make Concise',
      style: 'Rewrite this text to be as concise as possible while maintaining all key information and meaning. Remove any redundancy and unnecessary words. Only return the shortened text.',
      className: 'bg-teal-600 hover:bg-teal-700'
    },
    {
      label: 'Make Professional',
      style: 'Make my text formal and professional',
      className: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      label: 'Make Funny',
      style: 'Make my text funny and witty',
      className: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      label: 'Make Casual',
      style: 'Make my text casual and friendly',
      className: 'bg-green-600 hover:bg-green-700'
    },
    {
      label: 'Mario Style',
      style: 'Make my text sound like Mario',
      className: 'bg-red-600 hover:bg-red-700'
    },
    {
      label: 'Homer Style',
      style: 'Make my text sound like Homer Simpson',
      className: 'bg-yellow-600 hover:bg-yellow-700'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-64 p-4 text-gray-800 bg-white rounded-lg shadow-md border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {styleButtons.map((button) => (
          <button
            key={button.label}
            onClick={() => onImprove(button.style)}
            disabled={isProcessing || !text.trim()}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-all ${
              button.className
            } ${isProcessing || !text.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Wand2 className="w-4 h-4" />
            {isProcessing ? 'Improving...' : button.label}
          </button>
        ))}

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
      </div>
    </div>
  );
}