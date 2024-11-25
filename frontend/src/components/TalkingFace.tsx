import React, { useEffect, useState } from 'react';
import friendImage from '../assets/friend.png';

interface TalkingFaceProps {
  isAnimating: boolean;
  className?: string;
}

const TalkingFace: React.FC<TalkingFaceProps> = ({ isAnimating, className = '' }) => {
  const [mouthOpen, setMouthOpen] = useState(false);
  
  useEffect(() => {
    if (!isAnimating) {
      setMouthOpen(false);
      return;
    }

    const interval = setInterval(() => {
      setMouthOpen(prev => !prev);
    }, 150);

    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className={`w-[300px] h-[300px] flex-shrink-0 relative ${className}`}>
      <img 
        src={friendImage} 
        alt="Talking face" 
        className="w-full h-full object-contain"
      />
      {isAnimating && (
        <div 
          className={`absolute bottom-[62.5%] left-[51%] transform -translate-x-1/2 bg-black transition-all duration-150 ${
            mouthOpen 
              ? 'w-6 h-5 rounded-[100%]' 
              : 'w-4 h-2 rounded-[40px]'
          }`}
          style={{
            transformOrigin: 'center center',
            boxShadow: mouthOpen ? 'inset 0 4px 4px rgba(0,0,0,0.25)' : 'none'
          }}
        ></div>
      )}
    </div>
  );
};

export default TalkingFace; 