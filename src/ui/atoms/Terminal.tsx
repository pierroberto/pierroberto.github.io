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
      }
    }, 20); // Adjust the typing speed here

    return () => clearInterval(typingInterval);
  }, [text]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 500); // Adjust the blinking speed here

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="terminal">
      <span>{displayedText}</span>
      <span className={`cursor ${isBlinking ? 'blinking' : ''}`}>|</span>
    </div>
  );
};
