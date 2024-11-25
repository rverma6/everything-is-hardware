import React, { useState } from 'react';
import TalkingFace from './components/TalkingFace';
import InputForm from './components/InputForm';
import ResponseDisplay from './components/ResponseDisplay';

function App() {
  const [inputText, setInputText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [animatedText, setAnimatedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = async (text: string) => {
    setIsAnimating(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      
      if (!API_URL) {
        throw new Error('API_URL is not defined');
      }

      console.log('API_URL:', API_URL); // Debugging: Check the API URL

      const response = await fetch(`${API_URL}/api/relate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, detail: ${errorData.detail}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data); // Debugging: Check the response data
      
      if (!data.message) {
        throw new Error('No message in response');
      }

      setDisplayedText(data.message);
      
      // Animate text word by word
      const words = data.message.split(' ');
      setAnimatedText('');
      
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setAnimatedText(prev => prev + (i === 0 ? '' : ' ') + words[i]);
      }
    } catch (error: any) {
      console.error('Error:', error);
      setDisplayedText('Oops! My hardware seems to be malfunctioning. Have you tried turning it off and on again? 🔧');
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 font-quicksand">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-6xl font-bold text-center text-purple-300 mb-12 animate-bounce-slow hover:scale-105 transition-transform duration-300">
          Everything is Hardware!! ⚙️
        </h1>
        <div className="bg-gray-800 rounded-3xl shadow-xl p-8 border border-purple-500 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
          <InputForm 
            onSubmit={handleSubmit} 
            value={inputText} 
            onChange={setInputText} 
          />
          <div className="flex flex-col md:flex-row items-start gap-4 mt-8">
            <div className="flex-shrink-0 w-[150px] hover:scale-105 transition-transform duration-300">
              <TalkingFace 
                isAnimating={isAnimating}
                className="w-full h-auto"
              />
            </div>
            <div className="flex-grow min-w-0">
              <ResponseDisplay response={animatedText} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;