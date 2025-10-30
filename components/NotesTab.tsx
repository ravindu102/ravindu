
import React, { useState, useCallback } from 'react';
import { generateText } from '../services/geminiService';

const NotesTab: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const handleSummarize = useCallback(async () => {
    if (!notes.trim()) {
      setSummary("Please write some notes first.");
      return;
    }
    setIsLoading(true);
    setSummary('');
    const prompt = `Summarize the following university lecture notes concisely for review purposes:\n\n---\n${notes}\n---`;
    const result = await generateText(prompt);
    setSummary(result);
    setIsLoading(false);
  }, [notes]);

  const handleCopyToClipboard = (text: string, setCopiedCallback: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setCopiedCallback(true);
    setTimeout(() => setCopiedCallback(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      {/* Notes Editor */}
      <div className="bg-slate-800 rounded-xl shadow-2xl p-6">
        <h2 className="text-3xl font-bold mb-4 text-sky-400">My Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-96 bg-slate-900 border border-slate-700 rounded-md p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
          placeholder="Start typing your lecture notes here..."
        />
        <div className="mt-4 flex gap-4">
            <button
            onClick={handleSummarize}
            disabled={isLoading}
            className="flex-1 bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700 transition duration-200 shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
            {isLoading ? 'Summarizing...' : 'Summarize with AI'}
            </button>
             <button
            onClick={() => handleCopyToClipboard(notes, setShareCopied)}
            className="flex-1 bg-slate-600 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-700 transition duration-200 shadow-lg"
            >
            {shareCopied ? 'Copied Notes!' : 'Share Notes'}
            </button>
        </div>
      </div>

      {/* Summary View */}
      <div className="bg-slate-800 rounded-xl shadow-2xl p-6">
        <h2 className="text-3xl font-bold mb-4 text-sky-400">AI Summary</h2>
        <div className="w-full h-96 bg-slate-900 border border-slate-700 rounded-md p-4 text-slate-200 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
            </div>
            )}
          {!isLoading && !summary && <p className="text-slate-400">Your summary will appear here...</p>}
          {summary && <p className="whitespace-pre-wrap">{summary}</p>}
        </div>
        <div className="mt-4">
            <button
            onClick={() => handleCopyToClipboard(summary, setCopied)}
            disabled={!summary || isLoading}
            className="w-full bg-slate-600 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-700 transition duration-200 shadow-lg disabled:bg-slate-700/50 disabled:cursor-not-allowed"
            >
            {copied ? 'Copied!' : 'Copy Summary'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default NotesTab;
