import React, { useState, KeyboardEvent } from 'react';
import { SendHorizontal } from 'lucide-react'; // Opcional: si usas lucide-react para iconos

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() !== "") {
      onSendMessage(text);
      setText("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t border-border bg-background">
      <input
        type="text"
        placeholder="Haz una pregunta sobre la capacitación..."
        className="flex-1 px-4 py-2 rounded-md bg-input-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
      >
        <span>Enviar</span>
        <SendHorizontal size={18} /> 
      </button>
    </div>
  );
};

export default ChatInput;