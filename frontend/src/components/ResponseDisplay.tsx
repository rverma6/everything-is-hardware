import React from 'react';

interface ResponseDisplayProps {
  response: string;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response }) => {
  return (
    <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 
                    rounded-3xl p-8 border-2 border-purple-500/30 
                    shadow-lg shadow-purple-500/10 transition-all duration-300 
                    hover:shadow-xl hover:shadow-purple-500/20
                    relative overflow-hidden">
      <div className="absolute -right-4 -top-4 text-6xl opacity-10 rotate-12 animate-pulse">
        ⚙️
      </div>
      <div className="absolute -left-4 -bottom-4 text-6xl opacity-10 -rotate-12 animate-pulse">
        🔧
      </div>
      {response ? (
        <p className="text-gray-300 text-lg leading-relaxed font-quicksand relative z-10">
          {response}
        </p>
      ) : (
        <div className="text-center relative z-10">
          <p className="text-purple-300 italic text-lg font-quicksand mb-2">
            Ask me anything, and I'll explain how it's about hardware 🙄
          </p>
          <p className="text-sm text-purple-400 font-quicksand animate-bounce-slow">
            (Because everything is hardware, you just don't know it yet...)
          </p>
        </div>
      )}
    </div>
  );
};

export default ResponseDisplay; 