import React, { useState } from 'react';
import { TimeSlot } from '../types';

const sampleTimetable: TimeSlot[] = [
  { id: 1, day: 'Monday', time: '09:00 - 11:00', course: 'Advanced Algorithms', location: 'Hall A', color: 'bg-red-500/80' },
  { id: 2, day: 'Monday', time: '13:00 - 15:00', course: 'Operating Systems', location: 'Lab 3', color: 'bg-blue-500/80' },
  { id: 3, day: 'Tuesday', time: '10:00 - 12:00', course: 'Compilers', location: 'Hall B', color: 'bg-green-500/80' },
  { id: 4, day: 'Wednesday', time: '11:00 - 13:00', course: 'Advanced Algorithms', location: 'Hall A', color: 'bg-red-500/80' },
  { id: 5, day: 'Wednesday', time: '16:00 - 18:00', course: 'Linear Algebra', location: 'Room 101', color: 'bg-yellow-500/80' },
  { id: 6, day: 'Thursday', time: '09:00 - 11:00', course: 'Compilers', location: 'Hall B', color: 'bg-green-500/80' },
  { id: 7, day: 'Thursday', time: '14:00 - 16:00', course: 'Operating Systems', location: 'Lab 3', color: 'bg-blue-500/80' },
  { id: 8, day: 'Friday', time: '10:00 - 12:00', course: 'Linear Algebra', location: 'Room 101', color: 'bg-yellow-500/80' },
  { id: 9, day: 'Saturday', time: '11:00 - 14:00', course: 'Weekend Workshop', location: 'Studio C', color: 'bg-purple-500/80' },
];

const days: TimeSlot['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const colorOptions = [
    { label: 'Red', value: 'bg-red-500/80' },
    { label: 'Blue', value: 'bg-blue-500/80' },
    { label: 'Green', value: 'bg-green-500/80' },
    { label: 'Yellow', value: 'bg-yellow-500/80' },
    { label: 'Purple', value: 'bg-purple-500/80' },
    { label: 'Pink', value: 'bg-pink-500/80' },
    { label: 'Indigo', value: 'bg-indigo-500/80' },
];

const TimetableTab: React.FC = () => {
    const [timetable, setTimetable] = useState<TimeSlot[]>(sampleTimetable);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleTimetableChange = (id: number, field: keyof Omit<TimeSlot, 'id' | 'day'>, value: string) => {
        setTimetable(currentTimetable => 
            currentTimetable.map(slot => 
                slot.id === id ? { ...slot, [field]: value } : slot
            )
        );
    };

    const deleteSlot = (id: number) => {
        setTimetable(currentTimetable => currentTimetable.filter(slot => slot.id !== id));
    };

    const addSlot = (day: TimeSlot['day']) => {
        const newSlot: TimeSlot = {
            id: Date.now(),
            day: day,
            time: '',
            course: '',
            location: '',
            color: colorOptions[Math.floor(Math.random() * colorOptions.length)].value,
        };
        setTimetable(currentTimetable => [...currentTimetable, newSlot]);
    };

  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-sky-400">Weekly Timetable</h2>
            <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-md font-semibold text-white transition-colors duration-200 shadow-lg ${
                    isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-sky-600 hover:bg-sky-700'
                }`}
            >
                {isEditing ? 'Save Changes' : 'Edit Timetable'}
            </button>
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {days.map(day => (
          <div key={day} className="bg-slate-700/50 rounded-lg p-4 flex flex-col">
            <h3 className="font-bold text-lg text-center text-slate-300 mb-4">{day}</h3>
            <div className="space-y-3 flex-grow">
              {timetable
                .filter(slot => slot.day === day)
                .sort((a,b) => a.time.localeCompare(b.time))
                .map(slot => (
                  isEditing ? (
                    <div key={slot.id} className="bg-slate-600 p-3 rounded-md shadow-md space-y-2">
                        <input
                            type="text"
                            value={slot.course}
                            onChange={(e) => handleTimetableChange(slot.id, 'course', e.target.value)}
                            className="w-full bg-slate-700 border border-slate-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                            placeholder="Course Name"
                        />
                        <input
                            type="text"
                            value={slot.time}
                            onChange={(e) => handleTimetableChange(slot.id, 'time', e.target.value)}
                            className="w-full bg-slate-700 border border-slate-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                            placeholder="e.g., 09:00 - 11:00"
                        />
                        <input
                            type="text"
                            value={slot.location}
                            onChange={(e) => handleTimetableChange(slot.id, 'location', e.target.value)}
                            className="w-full bg-slate-700 border border-slate-500 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                            placeholder="Location"
                        />
                        <div className="flex justify-between items-center pt-1">
                            <select
                                value={slot.color}
                                onChange={(e) => handleTimetableChange(slot.id, 'color', e.target.value)}
                                className="bg-slate-700 border border-slate-500 rounded text-xs p-1 text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                            >
                                {colorOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                            <button onClick={() => deleteSlot(slot.id)} className="text-red-400 hover:text-red-500 text-xs font-semibold">
                                DELETE
                            </button>
                        </div>
                    </div>
                  ) : (
                    <div key={slot.id} className={`${slot.color} p-3 rounded-md shadow-md`}>
                        <p className="font-semibold text-white">{slot.course || 'No Course'}</p>
                        <p className="text-sm text-slate-100">{slot.time || 'No Time'}</p>
                        <p className="text-xs text-slate-200 mt-1">{slot.location || 'No Location'}</p>
                    </div>
                  )
                ))}
            </div>
            {isEditing && (
                <button 
                    onClick={() => addSlot(day)}
                    className="mt-4 w-full text-center py-2 text-sm bg-sky-700/70 hover:bg-sky-700 text-white rounded-md transition"
                >
                    + Add Class
                </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimetableTab;