import React, { useState } from 'react';
import Header from './components/Header';
import AudioControls from './components/AudioControls';
import TextEditor from './components/TextEditor';
import { Groq } from 'groq-sdk';
import Settings from './components/Settings';

function App() {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedVoiceModel, setSelectedVoiceModel] = useState('distil-whisper-large-v3-en');
  const [selectedTextModel, setSelectedTextModel] = useState('llama-3.2-3b-preview');

  const handleAudioInput = async (audio: Blob) => {
    setIsProcessing(true);
    const apiKey = process.env.VITE_GROQ_API_KEY;

    try {
      const formData = new FormData();
      
      const audioFile = new File([audio], "audio.webm", { type: "audio/webm" });
      
      formData.append("file", audioFile);
      formData.append("model", selectedVoiceModel);
      formData.append("language", "en");

      const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error('Transcription error:', error);
      setError('Failed to transcribe audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFormat = () => {
    setText(text.trim().replace(/\s+/g, ' '));
  };

  const handleImproveText = async (style: string) => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    const apiKey = process.env.VITE_GROQ_API_KEY;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: selectedTextModel,
          messages: [
            {
              role: "system",
              content: `You are a text improvement assistant. ${style}. Maintain the core meaning while adjusting the tone and style. Organize the text into proper paragraphs and fix any grammar or spelling issues.`
            },
            {
              role: "user",
              content: text
            }
          ],
          temperature: 0.7,
          max_tokens: 4096
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setText(data.choices[0].message.content);
    } catch (error) {
      console.error('Text improvement error:', error);
      setError('Failed to improve text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      
      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        selectedVoiceModel={selectedVoiceModel}
        selectedTextModel={selectedTextModel}
        onVoiceModelChange={setSelectedVoiceModel}
        onTextModelChange={setSelectedTextModel}
      />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Transform Speech to Text
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Record audio, upload files, or type directly. Our AI-powered tools will help you create perfect text every time.
          </p>
        </div>

        <AudioControls onAudioInput={handleAudioInput} />

        {isProcessing ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 animate-[progress_2s_ease-in-out_infinite]" style={{ width: '90%' }}></div>
            </div>
            <p className="text-gray-600">Processing your audio...</p>
          </div>
        ) : (
          <TextEditor
            text={text}
            onTextChange={setText}
            onImprove={handleImproveText}
            isProcessing={isProcessing}
          />
        )}
      </main>

      <footer className="mt-auto py-6 text-center text-gray-600">
        <p>© 2024 Dictation Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;