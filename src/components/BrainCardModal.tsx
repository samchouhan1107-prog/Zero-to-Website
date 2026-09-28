import React, { useState, useEffect } from 'react';
import { WebZoneSignatureAIIcon } from './WebZoneSignatureAIIcon';
import { BRAIN_CONCEPT_STONES } from '../data/brainLanguageStones';

interface BrainCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrainCardModal: React.FC<BrainCardModalProps> = ({ isOpen, onClose }) => {
  const [activeStone, setActiveStone] = useState(0);
  const [dailyBonusClaimed, setDailyBonusClaimed] = useState(false);
  const [userNotes, setUserNotes] = useState('');

  // Auto-claim daily bonus on first open
  useEffect(() => {
    if (isOpen && !dailyBonusClaimed) {
      const claimed = localStorage.getItem('brainCardBonusClaimed');
      const today = new Date().toDateString();
      if (claimed !== today) {
        setDailyBonusClaimed(true);
        localStorage.setItem('brainCardBonusClaimed', today);
        localStorage.setItem('brainCardNotes', userNotes);
      }
    }
  }, [isOpen, dailyBonusClaimed, userNotes]);

  const handlePrevStone = () => {
    setActiveStone((prev) => (prev > 0 ? prev - 1 : BRAIN_CONCEPT_STONES.length - 1));
  };

  const handleNextStone = () => {
    setActiveStone((prev) => (prev < BRAIN_CONCEPT_STONES.length - 1 ? prev + 1 : 0));
  };

  const handleSaveNotes = () => {
    localStorage.setItem('brainCardNotes', userNotes);
    // Show success feedback
    const originalText = userNotes;
    setUserNotes('✅ Notes saved!');
    setTimeout(() => setUserNotes(originalText), 2000);
  };

  if (!isOpen) return null;

  const stone = BRAIN_CONCEPT_STONES[activeStone];
  const streakDays = parseInt(localStorage.getItem('brainCardStreak') || '1');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-2xl border border-blue-500/30 shadow-2xl shadow-blue-950/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
          <div className="flex items-center gap-3">
            <WebZoneSignatureAIIcon size="md" variant="brain" interactive={false} />
            <div>
              <h2 className="text-xl font-bold text-blue-300">Brain Card 💡</h2>
              <p className="text-sm text-blue-400/80">Learning Stones & Daily Bonus Vault</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-blue-900/50 hover:bg-blue-800/70 text-blue-300 hover:text-white transition-colors"
            aria-label="Close Brain Card"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-120px)]">
          {/* Left Panel - Navigation & Tools */}
          <div className="w-full lg:w-80 bg-slate-800/50 border-r border-blue-500/20 p-6">
            {/* Daily Bonus */}
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-amber-300">🎁 Daily Bonus</h3>
                <span className="text-xs text-amber-400">Day {streakDays}</span>
              </div>
              <p className="text-sm text-amber-200 mb-3">Claim your XP reward!</p>
              <button 
                className="w-full py-2 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50"
                disabled={dailyBonusClaimed}
              >
                {dailyBonusClaimed ? '✅ Claimed Today' : 'Claim +50 XP'}
              </button>
            </div>

            {/* Navigation Stones */}
            <div className="mb-6">
              <h3 className="font-bold text-blue-300 mb-3">🧠 Learning Stones</h3>
              <div className="space-y-2">
                {BRAIN_CONCEPT_STONES.map((stone, index) => (
                  <button
                    key={stone.id}
                    onClick={() => setActiveStone(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      activeStone === index
                        ? 'bg-blue-600/50 border border-blue-400 text-blue-100'
                        : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{stone.stoneIcon}</span>
                      <div>
                        <div className="font-medium text-sm">Stone {stone.stoneNumber}</div>
                        <div className="text-xs text-slate-400">{stone.category}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <h3 className="font-bold text-blue-300 mb-3">📝 Personal Notes</h3>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Write your learning notes, reminders, or insights..."
                className="w-full h-24 p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-200 text-sm resize-none focus:outline-none focus:border-blue-400"
              />
              <button
                onClick={handleSaveNotes}
                className="mt-2 w-full py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
              >
                Save Notes
              </button>
            </div>
          </div>

          {/* Right Panel - Stone Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Stone Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{stone.stoneIcon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-blue-300">{stone.title}</h2>
                  <p className="text-blue-400">{stone.tagline}</p>
                </div>
              </div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                stone.stoneColor.includes('amber') ? 'bg-amber-500/20 text-amber-300' :
                stone.stoneColor.includes('blue') ? 'bg-blue-500/20 text-blue-300' :
                stone.stoneColor.includes('emerald') ? 'bg-emerald-500/20 text-emerald-300' :
                'bg-purple-500/20 text-purple-300'
              }`}>
                {stone.category}
              </div>
            </div>

            {/* Tag to Word Mappings */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-blue-300 mb-4">🧠 Brain-Friendly Translations</h3>
              <div className="space-y-4">
                {stone.tagsToWords.map((mapping, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                    <div className="mb-3">
                      <code className="text-cyan-300 font-mono text-sm bg-slate-700 px-2 py-1 rounded">
                        {mapping.tagOrKeyword}
                      </code>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-bold text-blue-300">🎯 Human Word:</span>
                        <span className="ml-2 text-slate-300">{mapping.humanWord}</span>
                      </div>
                      <div>
                        <span className="font-bold text-blue-300">🧠 Mental Model:</span>
                        <span className="ml-2 text-slate-300">{mapping.mentalModel}</span>
                      </div>
                      <div>
                        <span className="font-bold text-blue-300">🏠 Real Life:</span>
                        <span className="ml-2 text-slate-300">{mapping.realLifeAnalogy}</span>
                      </div>
                      <div>
                        <span className="font-bold text-amber-300">💡 Beginner Tip:</span>
                        <span className="ml-2 text-slate-300">{mapping.beginnerTip}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practice Example */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-blue-300 mb-4">🛠️ Interactive Practice</h3>
              <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                <h4 className="font-bold text-blue-300 mb-2">{stone.practiceExample.title}</h4>
                <p className="text-slate-300 text-sm mb-3">{stone.practiceExample.description}</p>
                <div 
                  className="mb-3 p-3 bg-slate-900 border border-slate-600 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: stone.practiceExample.html }}
                />
                <p className="text-xs text-blue-400 italic">{stone.practiceExample.interactiveActionPrompt}</p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevStone}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Previous
              </button>
              <span className="text-sm text-slate-400">
                Stone {activeStone + 1} of {BRAIN_CONCEPT_STONES.length}
              </span>
              <button
                onClick={handleNextStone}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-blue-500/20 bg-slate-800/30 text-center">
          <p className="text-sm text-slate-400">
            🎯 Learning is 10x faster with brain-friendly mental models • 
            💾 Notes auto-saved locally • 
            🎁 Claim daily XP to maintain your streak
          </p>
        </div>
      </div>
    </div>
  );
};