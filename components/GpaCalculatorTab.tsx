
import React, { useState, useMemo } from 'react';
import { GpaEntry } from '../types';

const gradeToPoints: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0,
};

const gradeOptions = Object.keys(gradeToPoints);

const GpaCalculatorTab: React.FC = () => {
  const [entries, setEntries] = useState<GpaEntry[]>([
    { id: 1, course: 'Advanced Algorithms', credits: 3, grade: 'A-' },
    { id: 2, course: 'Operating Systems', credits: 4, grade: 'B+' },
  ]);

  const addEntry = () => {
    setEntries([...entries, { id: Date.now(), course: '', credits: 3, grade: 'A' }]);
  };

  const updateEntry = (id: number, field: keyof GpaEntry, value: string | number) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const removeEntry = (id: number) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const gpa = useMemo(() => {
    const totalPoints = entries.reduce((acc, entry) => acc + (gradeToPoints[entry.grade] * entry.credits), 0);
    const totalCredits = entries.reduce((acc, entry) => acc + Number(entry.credits), 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  }, [entries]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
        <div className="md:col-span-2 bg-slate-800 rounded-xl shadow-2xl p-6">
            <h2 className="text-3xl font-bold mb-6 text-sky-400">GPA Calculator</h2>
            <div className="space-y-4">
            {entries.map(entry => (
                <div key={entry.id} className="grid grid-cols-1 sm:grid-cols-10 gap-3 items-center">
                <input
                    type="text"
                    placeholder="Course Name"
                    value={entry.course}
                    onChange={e => updateEntry(entry.id, 'course', e.target.value)}
                    className="sm:col-span-4 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-sky-500"
                />
                <input
                    type="number"
                    placeholder="Credits"
                    value={entry.credits}
                    min="0"
                    onChange={e => updateEntry(entry.id, 'credits', Number(e.target.value))}
                    className="sm:col-span-2 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-sky-500"
                />
                <select
                    value={entry.grade}
                    onChange={e => updateEntry(entry.id, 'grade', e.target.value)}
                    className="sm:col-span-2 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-sky-500"
                >
                    {gradeOptions.map(grade => <option key={grade} value={grade}>{grade}</option>)}
                </select>
                <button
                    onClick={() => removeEntry(entry.id)}
                    className="sm:col-span-2 bg-red-600 text-white font-bold py-2 px-3 rounded-md hover:bg-red-700 transition"
                >
                    Remove
                </button>
                </div>
            ))}
            </div>
            <button
            onClick={addEntry}
            className="mt-6 w-full bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700 transition shadow-lg"
            >
            Add Course
            </button>
        </div>
        <div className="bg-slate-800 rounded-xl shadow-2xl p-6 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-slate-400">Your GPA</h3>
            <p className="text-7xl font-extrabold text-sky-400 my-4">{gpa}</p>
        </div>
    </div>
  );
};

export default GpaCalculatorTab;
