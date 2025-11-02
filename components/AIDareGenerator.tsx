import React, { useState } from 'react';
import { generateDare } from '../services/geminiService';
import type { Streamer } from '../types';
import { IconZap } from '../constants';

interface AIDareGeneratorProps {
  streamer: Streamer;
  onDareGenerated: (dare: string) => void;
  onClose: () => void;
  onSpendTokens: (amount: number, description: string) => boolean;
}

const DARE_COST = 150;
const DARE_CATEGORIES = ['Funny', 'Creative', 'Challenging', 'Silly', 'Wildcard'];

const AIDareGenerator: React.FC<AIDareGeneratorProps> = ({ streamer, onDareGenerated, onClose, onSpendTokens }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateDare = async (category: string) => {
    if (isLoading) return;

    const hasSufficientTokens = onSpendTokens(DARE_COST, `AI Dare for ${streamer.name}`);
    if (!hasSufficientTokens) {
        setError(`You need ${DARE_COST} tokens to generate a dare.`);
        return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dareText = await generateDare(category, streamer.name);
      onDareGenerated(dareText);
      onClose();
    } catch (e) {
      setError("Failed to get a dare from the AI. Please try again.");
      console.error(e);
      // Note: In a real app, you'd refund tokens here.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-brand-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md animate-slide-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <IconZap className="w-6 h-6 text-brand-cyan mr-2" />
            Generate an AI Dare
          </h2>
          <button onClick={onClose} className="text-brand-gray-400 hover:text-white">&times;</button>
        </div>
        <p className="text-brand-gray-300 mb-6">
          Choose a category and spend <span className="font-bold text-brand-cyan">{DARE_COST} tokens</span> to challenge {streamer.name} with an AI-generated dare!
        </p>

        <div className="grid grid-cols-2 gap-4">
          {DARE_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => handleGenerateDare(category)}
              disabled={isLoading}
              className="bg-brand-gray-700 hover:bg-brand-purple disabled:bg-brand-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md transition-colors text-lg"
            >
              {category}
            </button>
          ))}
        </div>
        
        {isLoading && (
            <div className="mt-4 text-center text-brand-cyan">AI is thinking...</div>
        )}

        {error && (
            <div className="mt-4 text-center text-red-400">{error}</div>
        )}
      </div>
    </div>
  );
};

export default AIDareGenerator;