import React, { useEffect, useState } from 'react';
import './terminal.css';

interface TerminalProps {
  text: string;
}

export const Terminal: React.FC<TerminalProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isBlinking, setIsBlinking] = useState(true);
  useEffect(() => {
    let currentText = '';
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        currentText += text[index];
        setDisplayedText(currentText);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsBlinking(false);
      }
    }, 30); // Adjust the typing speed here

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <div className="terminal">
      <span>{displayedText}</span>
      {isBlinking && <span className="cursor">|</span>}
    </div>
  );
};
