"use client";

import { useEffect, useState } from "react";

export default function SpeechBubble({ text, typingSpeed = 50 }) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;

    setDisplayed("");
    setIsTyping(true);

    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;

      if (i > text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed]);

  return (
    <div className="relative flex justify-center text-gray-800 text-sm font-mono">
      <div
        className={`
          relative
          max-w-[400px]
          px-3 py-2
          text-lg
          text-black
          bg-white/80
          border
          rounded-2xl
          shadow-md
          transition-all duration-200
          ${isTyping ? "animate-pulse" : "animate-[popIn_0.2s_ease-out]"}
        `}
      >
        {displayed}

        {/* bubble tail */}
        <div className="absolute left-1/2 -bottom-2 w-3 h-3 bg-white/70 border-0 border-r rotate-45"></div>
      </div>
    </div>
  );
}
