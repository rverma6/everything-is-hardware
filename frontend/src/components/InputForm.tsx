import React from 'react';

interface InputFormProps {
  onSubmit: (topic: string) => void;
  value: string;
  onChange: (value: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, value, onChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="my-6">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative group">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Oh, you want to learn about REAL hardware? Go ahead, ask... 🙄"
            className="w-full px-6 py-4 text-lg border-2 border-purple-500/30 rounded-2xl 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     bg-gradient-to-r from-gray-900 to-gray-950
                     text-purple-100 placeholder-purple-400
                     transition-all duration-300 font-quicksand
                     hover:shadow-lg hover:shadow-purple-500/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl animate-float hidden group-hover:block">
            ⚙️
          </div>
        </div>
        <button 
          type="submit" 
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 
                   text-white text-lg font-semibold rounded-2xl
                   hover:from-purple-500 hover:to-purple-600
                   transform hover:scale-105 active:scale-95
                   transition-all duration-200 shadow-md hover:shadow-lg
                   hover:shadow-purple-500/20
                   flex items-center gap-2"
        >
          <span>Ask!</span>
          <span className="text-xl">🔨</span>
        </button>
      </div>
    </form>
  );
};

export default InputForm; 