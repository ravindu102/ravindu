import React, { useState } from 'react';
import { Assignment } from '../types';

const initialAssignments: Assignment[] = [
  { id: 1, title: 'Problem Set 1', course: 'Advanced Algorithms', dueDate: '2024-10-15', completed: true, reminderSet: false },
  { id: 2, title: 'Lab Report 3', course: 'Operating Systems', dueDate: '2024-10-18', completed: false, reminderSet: true },
  { id: 3, title: 'Parser Implementation', course: 'Compilers', dueDate: '2024-10-22', completed: false, reminderSet: false },
  { id: 4, title: 'Homework 5', course: 'Linear Algebra', dueDate: '2024-10-25', completed: false, reminderSet: false },
];

const AssignmentsTab: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [newAssignment, setNewAssignment] = useState({ title: '', course: '', dueDate: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAssignment(prev => ({ ...prev, [name]: value }));
  };

  const addAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAssignment.title && newAssignment.course && newAssignment.dueDate) {
      const newEntry: Assignment = {
        ...newAssignment,
        id: Date.now(),
        completed: false,
        reminderSet: false,
      };
      setAssignments(prev => [...prev, newEntry].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()));
      setNewAssignment({ title: '', course: '', dueDate: '' });
    }
  };
  
  const toggleComplete = (id: number) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const deleteAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const toggleReminder = (id: number) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, reminderSet: !a.reminderSet } : a));
  };
  
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-sky-400">Assignment Tracker</h2>
      
      <form onSubmit={addAssignment} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-400">Title</label>
            <input type="text" name="title" value={newAssignment.title} onChange={handleInputChange} className="w-full mt-1 bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" placeholder="e.g., Essay on Renaissance Art"/>
        </div>
        <div>
            <label htmlFor="course" className="block text-sm font-medium text-slate-400">Course</label>
            <input type="text" name="course" value={newAssignment.course} onChange={handleInputChange} className="w-full mt-1 bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" placeholder="e.g., Art History"/>
        </div>
        <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-slate-400">Due Date</label>
            <input type="date" name="dueDate" value={newAssignment.dueDate} onChange={handleInputChange} className="w-full mt-1 bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500"/>
        </div>
        <button type="submit" className="md:col-start-4 bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700 transition duration-200 shadow-lg">Add Assignment</button>
      </form>

      <div className="space-y-3">
        {assignments.map(assignment => (
          <div key={assignment.id} className={`p-4 rounded-lg flex items-center justify-between transition-all duration-300 ${assignment.completed ? 'bg-slate-700/50 opacity-60' : 'bg-slate-700'}`}>
            <div className="flex items-center gap-4">
              <input type="checkbox" checked={assignment.completed} onChange={() => toggleComplete(assignment.id)} className="h-5 w-5 rounded text-sky-500 bg-slate-600 border-slate-500 focus:ring-sky-500"/>
              <div>
                <p className={`font-semibold text-lg ${assignment.completed ? 'line-through text-slate-400' : 'text-white'}`}>{assignment.title}</p>
                <p className="text-sm text-slate-400">{assignment.course} - Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleReminder(assignment.id)}
                disabled={assignment.completed}
                className={`text-sm font-semibold transition-colors duration-200 py-1 px-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed ${
                  assignment.reminderSet
                    ? 'text-green-300 bg-green-500/10'
                    : 'text-sky-300 hover:bg-sky-500/20'
                }`}
                title={assignment.reminderSet ? "Email reminder is active" : "Set email reminder (24h before due)"}
              >
                {assignment.reminderSet ? 'Reminder Set' : 'Remind Me'}
              </button>
              <button onClick={() => deleteAssignment(assignment.id)} className="text-red-400 hover:text-red-500 font-bold transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsTab;