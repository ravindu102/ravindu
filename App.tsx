
import React, { useState } from 'react';
import Header from './components/Header';
import TimetableTab from './components/TimetableTab';
import AssignmentsTab from './components/AssignmentsTab';
import NotesTab from './components/NotesTab';
import GpaCalculatorTab from './components/GpaCalculatorTab';
import AiBuddyTab from './components/AiBuddyTab';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('timetable');

  const renderContent = () => {
    switch (activeTab) {
      case 'timetable':
        return <TimetableTab />;
      case 'assignments':
        return <AssignmentsTab />;
      case 'notes':
        return <NotesTab />;
      case 'gpa':
        return <GpaCalculatorTab />;
      case 'aiBuddy':
        return <AiBuddyTab />;
      default:
        return <TimetableTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center p-4 text-xs text-slate-500">
          <p>Note: Data is not saved and will be lost on page refresh. This is a demonstration application.</p>
          <p>An API key for Gemini must be configured in the environment for AI features to work.</p>
      </footer>
    </div>
  );
};

export default App;
